import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import localTeamData from '../data/team_data.json';
import './TeamOrgChart.css';

const THEMES = ['grid', 'gradient', 'mesh', 'dark', 'clean'];

export default function TeamOrgChart() {
    // Data State
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState(new Set());

    // Settings State
    const [scale, setScale] = useState(1);
    const [showPhotos, setShowPhotos] = useState(true);
    const [currentTheme, setCurrentTheme] = useState('mesh');
    const [showDeptAbove, setShowDeptAbove] = useState(true);

    // UI State
    const [showSettings, setShowSettings] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const settingsRef = doc(db, 'settings', 'orgChart');
                const settingsSnap = await getDoc(settingsRef);
                if (settingsSnap.exists()) {
                    const s = settingsSnap.data();
                    if (s.currentTheme) setCurrentTheme(s.currentTheme);
                    if (s.showDeptAbove !== undefined) setShowDeptAbove(s.showDeptAbove);
                    if (s.showPhotos !== undefined) setShowPhotos(s.showPhotos);
                    if (s.scale) setScale(s.scale);
                }

                const empCol = collection(db, 'employees');
                const empSnap = await getDocs(empCol);

                if (!empSnap.empty) {
                    const emps = empSnap.docs.map(d => d.data());
                    setEmployees(emps);
                    setExpandedIds(new Set(emps.map(e => e.id)));
                } else {
                    setEmployees([]);
                }
            } catch (err) {
                console.error("Error loading org chart:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Save Settings Debounced
    useEffect(() => {
        if (loading) return;
        const timer = setTimeout(async () => {
            try {
                await setDoc(doc(db, 'settings', 'orgChart'), {
                    currentTheme,
                    showDeptAbove,
                    showPhotos,
                    scale
                }, { merge: true });
            } catch (err) {
                console.error("Error saving settings:", err);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [currentTheme, showDeptAbove, showPhotos, scale, loading]);

    // Migration Handler
    const handleMigrate = async () => {
        try {
            setIsMigrating(true);
            const batch = writeBatch(db);
            const sourceEmployees = localTeamData.employees || [];

            const empCol = collection(db, 'employees');
            sourceEmployees.forEach(emp => {
                const ref = doc(empCol, emp.id);
                batch.set(ref, emp);
            });

            const settingsRef = doc(db, 'settings', 'orgChart');
            batch.set(settingsRef, {
                currentTheme: 'mesh',
                showDeptAbove: true,
                showPhotos: true,
                scale: 1
            }, { merge: true });

            await batch.commit();

            setEmployees(sourceEmployees);
            setExpandedIds(new Set(sourceEmployees.map(e => e.id)));
            alert("Data successfully transferred to Firebase!");
        } catch (err) {
            console.error("Migration failed:", err);
            alert("Migration failed. Please check console and ensure you are logged in.");
        } finally {
            setIsMigrating(false);
        }
    };

    // Build the tree structure
    const { root } = useMemo(() => {
        const mapping = {};
        employees.forEach(emp => {
            mapping[emp.id] = { ...emp, children: [] };
        });

        let root = null;
        employees.forEach(emp => {
            if (emp.parentId && mapping[emp.parentId]) {
                mapping[emp.parentId].children.push(mapping[emp.id]);
            } else {
                root = mapping[emp.id];
            }
        });
        return { root };
    }, [employees]);

    const expandAll = () => {
        if (employees.length > 0) {
            setExpandedIds(new Set(employees.map(e => e.id)));
        }
    };

    const collapseAll = () => {
        if (root) {
            setExpandedIds(new Set([root.id]));
        } else {
            setExpandedIds(new Set());
        }
    };

    const toggleNode = (id) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const renderNode = (node) => {
        if (!node) return null;

        const isExpanded = expandedIds.has(node.id);
        const hasChildren = node.children && node.children.length > 0;

        const deptStyles = getDeptStyles(node.department);
        const DeptBadge = node.department ? (
            <div className={`flex items-center justify-center ${showDeptAbove ? 'mb-3 absolute -top-8 left-1/2 -translate-x-1/2 z-20' : 'mt-1'}`}>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm whitespace-nowrap ${deptStyles}`}>
                    {node.department}
                </span>
            </div>
        ) : null;

        // Corrected Structure: Wrapper (LI) contains Content + Children (UL)
        return (
            <div className="team-tree-node-wrapper" key={node.id}>
                <div className="flex flex-col items-center relative">

                    <div className="relative">
                        {showDeptAbove && DeptBadge}

                        <div
                            className={`team-org-card w-64 p-4 rounded-xl relative flex flex-col gap-2 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300 group z-10 ${isExpanded ? 'ring-1 ring-blue-100' : ''}`}
                            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
                            onClick={() => toggleNode(node.id)}
                        >
                            <div className="flex items-center gap-3 pointer-events-none">
                                {showPhotos && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100 transition-all duration-300">
                                        {node.imageUrl ? (
                                            <img src={node.imageUrl} alt={node.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500 font-bold text-lg">
                                                {node.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col text-left min-w-0 flex-1">
                                    <h3 className="font-bold truncate text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{node.name}</h3>
                                    <p className="text-blue-600 text-xs font-semibold truncate leading-tight mt-0.5" style={{ color: 'var(--color-primary)' }}>{node.title}</p>

                                    {!showDeptAbove && DeptBadge}
                                </div>
                            </div>

                            {hasChildren && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleNode(node.id);
                                    }}
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center rounded-full shadow-md border transition-all z-20 cursor-pointer"
                                    style={{ padding: 0, background: 'var(--bg-card)', borderColor: 'var(--border-light)', color: 'var(--text-secondary)' }}
                                >
                                    {isExpanded ? (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    ) : (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {isExpanded && hasChildren && (
                        <div className="team-line-down h-6"></div>
                    )}
                </div>

                {/* Children Container - Sibling to Card Content, inside Wrapper */}
                {isExpanded && hasChildren && (
                    <div className="team-tree-container">
                        {node.children.map(child => renderNode(child))}
                    </div>
                )}
            </div>
        );
    };

    const getBgClass = () => `bg-theme-${currentTheme}`;

    if (loading) return <div className="p-20 text-center text-gray-500 animate-pulse">Loading Organization Data from Firebase...</div>;

    if (!root && employees.length === 0) {
        return (
            <div className={`w-full h-[600px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 gap-4 ${getBgClass()}`}>
                <div className="text-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-white">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Data Found in Firebase</h3>
                    <p className="text-gray-500 mb-6 max-w-md">The 'employees' collection is empty. Would you like to migrate the local data to Firestore?</p>
                    <button
                        onClick={handleMigrate}
                        disabled={isMigrating}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                        {isMigrating ? (
                            <>Migrating...</>
                        ) : (
                            <>Transfer Data to Firebase</>
                        )}
                    </button>
                    <p className="text-xs text-gray-400 mt-4">(Requires Auth)</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full overflow-hidden rounded-xl min-h-[600px] border border-gray-100 shadow-inner custom-scrollbar transition-colors duration-500 ${getBgClass()}`}>
            <button
                onClick={() => setShowSettings(!showSettings)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-white text-gray-600 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-all hover:scale-105"
                title="Chart Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>

            {showSettings && (
                <div className="absolute top-16 right-4 z-50 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-2xl w-72 animate-in fade-in slide-in-from-top-4 origin-top-right">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Appearance</h3>
                        <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs font-medium text-gray-700 mb-2 block">Background Theme</label>
                        <div className="grid grid-cols-5 gap-2">
                            {THEMES.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setCurrentTheme(t)}
                                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 overflow-hidden ${currentTheme === t ? 'border-blue-500 scale-110' : 'border-transparent ring-1 ring-gray-200'}`}
                                    title={t.charAt(0).toUpperCase() + t.slice(1)}
                                >
                                    <div className={`w-full h-full bg-theme-${t}`} style={{ transform: 'scale(10)' }}></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-4"></div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">Zoom: {Math.round(scale * 100)}%</label>
                            <button onClick={() => setScale(1)} className="text-[10px] text-blue-600 hover:underline">Reset</button>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={scale}
                            onChange={(e) => setScale(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">Dept. Above Card</label>
                            <button
                                onClick={() => setShowDeptAbove(!showDeptAbove)}
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ${showDeptAbove ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${showDeptAbove ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full h-full overflow-auto p-10 custom-scrollbar flex justify-center items-start min-h-[600px]">
                <div
                    style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}
                    className="min-w-fit"
                >
                    {renderNode(root)}
                </div>
            </div>
        </div>
    );
}

// Helpers
function getDeptStyles(dept) {
    if (!dept) return 'bg-gray-100 text-gray-600';
    const d = dept.toLowerCase();
    if (d.includes('eng') || d.includes('tech')) return 'bg-blue-100 text-blue-800';
    if (d.includes('prod')) return 'bg-orange-100 text-orange-800';
    if (d.includes('mark') || d.includes('sales')) return 'bg-purple-100 text-purple-800';
    if (d.includes('fin')) return 'bg-green-100 text-green-800';
    if (d.includes('hr') || d.includes('hum')) return 'bg-pink-100 text-pink-800';
    return 'bg-gray-100 text-gray-600';
}
