import React, { useMemo, useState } from 'react';
import { useOrganization } from '../context/OrganizationContext';
import teamData from '../data/team_data.json';

const employees = teamData.employees || [];

export default function TeamShowcase() {
    const { orgData } = useOrganization();

    // Settings equivalent to D01 defaults, but adapted for this theme
    const settings = {
        fontSize: 12, // vw
        fillOpacity: 20,
        isGlass: true, // Liquid Glass effect
        textColor: '#ffffff',
        companyName: orgData?.shortName || 'HCF BTR'
    };

    const [manualResume, setManualResume] = useState(false);

    // Prepare cards from real data
    const cards = useMemo(() => {
        // Filter valid employees or pick top ones if too many
        // For simplicity, take first 15 or specific logic
        let list = employees.filter(e => e.imageUrl && !e.imageUrl.startsWith('data:image'));
        // If list is small, maybe duplicate or use as is. 
        // If list has base64 images (big strings), prioritize URLs if possible, or limit count.
        // The original logic sliced to 15.
        if (list.length < 5) {
            list = employees; // Fallback to all including base64 if needed
        }
        return list.slice(0, 15).map(emp => ({
            id: emp.id,
            name: emp.name,
            title: emp.title || 'Team Member',
            department: emp.department || 'Volunteer',
            imageUrl: emp.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`,
        }));
    }, []);

    const count = cards.length;
    // Radius calculation based on card width and count
    const cardWidth = 224;
    const gap = 1.2; // space between cards
    const radius = Math.max(800, (cardWidth * count * gap) / (2 * Math.PI));

    // Helper to convert hex to rgba
    const getRgba = (hex, opacity) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };

    return (
        <div className="w-full h-[600px] bg-slate-900 overflow-hidden relative font-sans flex items-center justify-center">

            {/* 3D Scene Container */}
            <div
                className="relative w-full h-[500px] perspective-container z-10 flex items-center justify-center"
                style={{ perspective: '2000px' }}
            >
                {/* Global Scene Wrapper to share 3D space */}
                <div className="relative w-full h-full transform-style-3d flex items-center justify-center">

                    {/* Centered Text - Now in the 3D space */}
                    <h1
                        className={`absolute top-1/2 left-1/2 font-black whitespace-nowrap select-none pointer-events-none 
                            ${settings.isGlass ? 'glass-text' : 'stroke-text'}`}
                        style={{
                            transform: 'translate(-50%, -50%) translateZ(0px)',
                            fontSize: `${settings.fontSize}vw`,
                            color: settings.isGlass ? 'transparent' : getRgba(settings.textColor, settings.fillOpacity),
                        }}
                    >
                        {settings.companyName.toUpperCase()}
                    </h1>

                    {/* Rotating Ring */}
                    <div
                        className={`absolute top-1/2 left-1/2 w-0 h-0 transform-style-3d ${(!manualResume) ? 'animate-spin-cylinder' : ''}`}
                        style={{ transform: (!manualResume) ? undefined : 'rotateY(0deg)' }}
                        onClick={() => setManualResume(true)}
                    >
                        {cards.map((emp, i) => {
                            const angle = (360 / count) * i;
                            return (
                                <div
                                    key={emp.id}
                                    className="absolute top-0 left-0 w-[224px] h-[320px] bg-black text-white p-5 rounded-md shadow-2xl backface-visible border border-white/10"
                                    style={{
                                        // 3D placement
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                        // Center the card on its origin (half width/height)
                                        marginLeft: '-112px',
                                        marginTop: '-160px'
                                    }}
                                >
                                    {/* Card Content Construction */}
                                    <div className="flex flex-col h-full relative">
                                        {/* Top Section */}
                                        <div className="z-10">
                                            <h3 className="text-xl font-bold leading-tight mb-1.5 tracking-tight">{emp.name}</h3>
                                            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest">{emp.title}</p>
                                            <p className="text-[10px] text-gray-500 mt-1">{emp.department}</p>
                                        </div>

                                        {/* Bottom Image Section */}
                                        <div className="absolute -bottom-5 -right-5 w-32 h-32 overflow-hidden rounded-tl-3xl border-t border-l border-white/10">
                                            <img
                                                src={emp.imageUrl}
                                                alt={emp.name}
                                                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        .perspective-container {
            perspective: 2000px;
        }
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .stroke-text {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
        }
        @keyframes spin-cylinder {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(-360deg); }
        }
        .animate-spin-cylinder {
            animation: spin-cylinder 50s linear infinite;
        }
        .animate-spin-cylinder:hover {
            animation-play-state: paused;
        }
        .glass-text {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.4) 0%,
                rgba(255, 255, 255, 0.1) 20%,
                rgba(255, 255, 255, 0.7) 50%,
                rgba(255, 255, 255, 0.1) 80%,
                rgba(255, 255, 255, 0.4) 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            animation: shine 5s linear infinite;
        }
        @keyframes shine {
            to {
                background-position: 200% center;
            }
        }
      `}</style>
        </div>
    );
}
