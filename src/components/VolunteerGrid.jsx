import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import './VolunteerGrid.css';

export default function VolunteerGrid() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const empCol = collection(db, 'employees');
                const q = query(empCol);
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    setVolunteers(data);
                } else {
                    setVolunteers([]);
                }
            } catch (err) {
                console.error("Error fetching volunteers:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers();
    }, []);

    // Minimal Department Color Logic for Text (Optional, currently using grey badges for clean look)
    // CSS handles basic styling, but we can dynamic color if needed.
    const getDeptStyle = (dept) => {
        if (!dept) return {};
        const d = dept.toLowerCase();
        if (d.includes('eng') || d.includes('tech')) return { color: '#2563eb', bg: '#eff6ff' };
        if (d.includes('prod')) return { color: '#c2410c', bg: '#ffedd5' };
        if (d.includes('mark') || d.includes('sales')) return { color: '#7e22ce', bg: '#f3e8ff' };
        if (d.includes('fin')) return { color: '#15803d', bg: '#dcfce7' };
        return { color: '#64748b', bg: '#f1f5f9' };
    };

    return (
        <section className="volunteer-grid-section">
            <div className="volunteer-grid-container">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>Meet Our Volunteers</h2>
                    <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>Kenali Sukarelawan Kami</p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full opacity-60"></div>
                </div>

                {/* Grid */}
                <div className="v-grid">
                    {loading ? (
                        Array(10).fill(0).map((_, i) => (
                            <div key={i} className="skeleton-item animate-pulse">
                                <div className="skeleton-avatar"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text-sm"></div>
                            </div>
                        ))
                    ) : volunteers.length > 0 ? (
                        volunteers.map((vol) => {
                            const style = getDeptStyle(vol.department);
                            return (
                                <div key={vol.id} className="v-item group">
                                    <div className="v-img-wrapper">
                                        {vol.imageUrl ? (
                                            <img
                                                src={vol.imageUrl}
                                                alt={vol.name}
                                                className="v-img"
                                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                            />
                                        ) : null}
                                        <div className="v-initial" style={{ display: vol.imageUrl ? 'none' : 'flex' }}>
                                            {vol.name.charAt(0)}
                                        </div>
                                    </div>

                                    <h3 className="v-name">{vol.name}</h3>
                                    <p className="v-title">{vol.title}</p>

                                    {vol.department && (
                                        <span
                                            className="v-dept"
                                            style={{ color: style.color, backgroundColor: style.bg }}
                                        >
                                            {vol.department}
                                        </span>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-10 text-slate-400">
                            <p>No volunteers found.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
