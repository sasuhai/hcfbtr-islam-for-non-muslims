import { useNavigate } from "react-router-dom";
import { useOrganization } from "../context/OrganizationContext";
import "./Contact.css";
import { useEffect, useState } from "react";

const Contact = ({ isModal = false, onClose }) => {
    const { orgData } = useOrganization();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const charLimit = 15; // for typewriter effect or similar

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const shortName = orgData?.shortName || "HCF BTR";
    const fullName = orgData?.fullName || "Hidayah Centre Foundation";
    const email = orgData?.email || "contact@hcfbtr.com";
    const phones = orgData?.phone || [];
    const facebook = orgData?.facebook || "";
    const instagram = orgData?.instagram || "";
    const hqUrl = orgData?.hqUrl || "";
    const operatingHours = orgData?.operatingHours || [];
    const address = orgData?.address || "No. 1, Jalan Tun Razak, Kuala Lumpur";

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onClose) onClose();
            else navigate(-1);
        }, 500);
    };

    return (
        <div className={`contact-newspaper-overlay ${isVisible ? 'active' : ''}`} onClick={handleClose}>
            <div className="contact-newspaper-container bg-paper" onClick={(e) => e.stopPropagation()}>
                <button className="close-paper-btn" onClick={handleClose}>×</button>

                {/* Vintage Header */}
                <header className="contact-header px-4 py-4 border-b-2 border-stone-800 text-center">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-600 mb-1">Special Correspondence Edition</div>
                    <h1 className="font-masthead text-4xl md:text-5xl font-black text-stone-900 leading-none">
                        THE {shortName} CONTACT
                    </h1>
                    <div className="flex justify-between items-center mt-2 border-t border-stone-400 pt-1 text-[9px] font-bold uppercase tracking-widest text-stone-700">
                        <span>VOL. I No. 01</span>
                        <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        <span>PRICE: FREE</span>
                    </div>
                </header>

                <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {/* Left Column: Socials & Main Story */}
                    <div className="md:col-span-2 border-r-0 md:border-r border-stone-300 pr-0 md:pr-6">
                        <section className="mb-6">
                            <h2 className="font-headline text-2xl font-bold text-stone-900 mb-2 leading-tight">
                                Reach Our Bureau: A Global Initiative for Connection
                            </h2>
                            <div className="w-12 h-0.5 bg-stone-800 mb-3"></div>
                            <div className="flex gap-4 mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                                    alt="Communication"
                                    className="w-1/3 h-24 object-cover img-vintage border border-stone-800"
                                />
                                <p className="text-xs text-justify-newspaper text-stone-800 leading-relaxed font-body flex-1">
                                    <span className="float-left text-3xl font-masthead mr-1 leading-[0.8]">I</span>n an age of rapid digital expansion, <b>{fullName}</b> remains dedicated to the timeless art of meaningful dialogue. Whether you are an inquirer, a supporter, or a fellow traveler on the path of knowledge, our doors and lines remain open to your call.
                                </p>
                            </div>
                        </section>

                        <section className="bg-stone-200/50 p-4 border border-stone-400">
                            <h3 className="font-masthead text-sm font-bold uppercase mb-3 border-b border-stone-400 pb-1">Our Digital Presence</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {facebook && (
                                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 flex items-center justify-center border border-stone-800 rounded-full group-hover:bg-stone-800 group-hover:text-stone-50 transition-all duration-300">
                                            <span className="iconify" data-icon="lucide:facebook" data-width="16"></span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase text-stone-500">Facebook</div>
                                            <div className="text-xs font-typewriter break-all">/{shortName.toLowerCase().replace(/\s/g, '')}</div>
                                        </div>
                                    </a>
                                )}
                                {instagram && (
                                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 flex items-center justify-center border border-stone-800 rounded-full group-hover:bg-stone-800 group-hover:text-stone-50 transition-all duration-300">
                                            <span className="iconify" data-icon="lucide:instagram" data-width="16"></span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase text-stone-500">Instagram</div>
                                            <div className="text-xs font-typewriter break-all">@{shortName.toLowerCase().replace(/\s/g, '')}</div>
                                        </div>
                                    </a>
                                )}
                                {hqUrl && (
                                    <a href={hqUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 flex items-center justify-center border border-stone-800 rounded-full group-hover:bg-stone-800 group-hover:text-stone-50 transition-all duration-300">
                                            <span className="iconify" data-icon="lucide:globe" data-width="16"></span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase text-stone-500">Official HQ Portal</div>
                                            <div className="text-xs font-typewriter break-all">hcf.org.my/portal</div>
                                        </div>
                                    </a>
                                )}
                                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')}>
                                    <div className="w-8 h-8 flex items-center justify-center border border-stone-800 rounded-full group-hover:bg-stone-800 group-hover:text-stone-50 transition-all duration-300">
                                        <span className="iconify" data-icon="lucide:map-pin" data-width="16"></span>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase text-stone-500">{shortName} Address</div>
                                        <div className="text-[9px] font-typewriter uppercase leading-tight">{address}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mt-6 border-t border-stone-300 pt-4">
                            <div className="bg-stone-100 p-4 border border-stone-300 relative shadow-inner">
                                <span className="absolute top-2 right-2 border-2 border-stone-400 px-2 py-1 text-[8px] font-bold text-stone-400 rotate-12">PLACE STAMP HERE</span>
                                <h4 className="font-headline font-bold text-lg mb-2">Write to the Bureau</h4>
                                <p className="text-xs font-body italic text-stone-600 mb-2">"Dear {shortName} Editors, I am reaching out regarding..."</p>
                                <a href={`mailto:${email}`} className="inline-block border-b-2 border-stone-800 text-xs font-bold uppercase hover:text-stone-500 transition-colors">Compose an Electronic Dispatch</a>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Classifieds/Phones & Extras */}
                    <div className="flex flex-col gap-6">
                        <div className="border-2 border-stone-800 p-4 relative bg-paper shadow-sm animate-stamp">
                            <div className="absolute -top-3 left-4 bg-stone-800 text-stone-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Hotline Directory</div>
                            <ul className="space-y-3 mt-2">
                                {phones.length > 0 ? phones.map((p, idx) => (
                                    <li key={idx} className="border-b border-stone-300 pb-2 last:border-0">
                                        <div className="text-[9px] font-bold uppercase text-stone-500">Inquiry Line {idx + 1}</div>
                                        <a href={`tel:${p}`} className="text-lg font-typewriter text-stone-900 hover:text-stone-600 transition-colors">{p}</a>
                                    </li>
                                )) : (
                                    <li className="border-b border-stone-300 pb-2 last:border-0 text-center italic text-stone-400 text-xs">
                                        No active lines registered.
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Recommend 1: Business Hours */}
                        <div className="bg-stone-800 text-stone-100 p-4 rounded-sm rotate-1 transform shadow-lg">
                            <h4 className="font-masthead text-xs font-bold uppercase text-center border-b border-stone-600 pb-1 mb-2 tracking-widest text-stone-200">Office Hours</h4>
                            <div className="space-y-1 font-typewriter text-[10px]">
                                {operatingHours.length > 0 ? operatingHours.map((record, idx) => (
                                    <div key={idx} className={`flex justify-between ${record.time.toLowerCase().includes('closed') ? 'text-stone-400' : ''}`}>
                                        <span>{record.day}</span> <span>{record.time}</span>
                                    </div>
                                )) : (
                                    <div className="text-center italic text-stone-500">Contact for appointment</div>
                                )}
                            </div>
                        </div>

                        {/* Recommend 2: QR Scan */}
                        <div className="border border-dotted border-stone-500 p-4 text-center">
                            <p className="font-typewriter text-[9px] mb-2 uppercase text-stone-600">Scan to Save Contact</p>
                            <div className="w-24 h-24 mx-auto bg-white p-2 border border-stone-300 flex items-center justify-center">
                                {/* Use an actual QR generator service or a placeholder */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`BEGIN:VCARD\nFN:${fullName}\nTEL:${phones[0] || ''}\nEMAIL:${email}\nURL:https://hcf.org.my\nEND:VCARD`)}`} alt="QR Code" className="w-full h-full grayscale opacity-80" />
                            </div>
                            <p className="text-[8px] font-serif italic text-stone-500 mt-2">vCard Format v3.0</p>
                        </div>
                    </div>
                </div>

                <footer className="px-4 py-3 border-t-4 border-double border-stone-800 flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-stone-600">
                    <div>Address: {address}</div>
                    <div className="text-stone-900">Est. 2005 • HCF MALAYSIA</div>
                </footer>
            </div >
        </div >
    );
};

export default Contact;
