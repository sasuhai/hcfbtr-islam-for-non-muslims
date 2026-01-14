import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useOrganization } from "../context/OrganizationContext";
import { translations } from "../translations";

export default function ClassesForNonMuslims() {
    const { orgData } = useOrganization();
    const location = useLocation();
    const isBM = location.pathname.startsWith('/bm');
    const t = translations[isBM ? 'bm' : 'en'];
    const cl = t.classes;
    const common = t.common;

    const getLink = (path) => isBM ? `/bm${path}` : path;
    return (
        <main className="animate-fade-in bg-stone-50 dark:bg-black text-stone-900 dark:text-stone-300 select-none">
            <Helmet>
                <title>
                    Islam Classes for Non-Muslims in Malaysia | Learn About Islam – Hidayah Centre Foundation
                </title>

                <meta
                    name="description"
                    content="Hidayah Centre Foundation offers free Islam classes for non-Muslims in Malaysia. Learn about Islamic beliefs, practices, and values in a respectful environment."
                />

                <link
                    rel="canonical"
                    href="https://hcfbtr-brocure-resource.web.app/classes-for-non-muslims"
                />
            </Helmet>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in order-2 md:order-1 mt-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 text-xs font-medium tracking-wide mb-6 border border-emerald-100 dark:border-emerald-800">
                            {cl.heroSubtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-stone-900 dark:text-white leading-[1.1] mb-8">
                            {cl.title}
                        </h1>
                        <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
                            {cl.heroDesc}
                        </p>

                    </div>
                    {/* Hero Image */}
                    <div className="order-1 md:order-2 animate-fade-in relative">
                        <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-800 rounded-sm overflow-hidden shadow-xl border border-stone-100 dark:border-stone-800 relative">
                            <img
                                src="/class_discussion_circle.png"
                                alt="Diverse Malaysians in a discussion circle"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 md:grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is this for Section */}
            <section className="py-24 bg-stone-50 dark:bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white mb-4">{cl.whoTitle}</h2>
                        <p className="text-stone-600 dark:text-stone-400 font-light text-lg">
                            {cl.whoDesc}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { text: isBM ? "Bukan Islam yang berminat untuk belajar tentang Islam" : "Non-Muslims interested in learning about Islam", icon: "lucide:search" },
                            { text: isBM ? "Mereka yang mempertimbangkan untuk memeluk Islam" : "Those considering reverting to Islam", icon: "lucide:compass" },
                            { text: isBM ? "Individu yang mencari maklumat tepat tentang kepercayaan Islam" : "Individuals seeking accurate information about Islamic beliefs", icon: "lucide:book-open" },
                            { text: isBM ? "Rakan atau ahli keluarga Muslim" : "Friends or family members of Muslims", icon: "lucide:users" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-stone-900 p-8 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-shadow group">
                                <div className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/40 transition-colors">
                                    <span className="iconify text-stone-500 dark:text-stone-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400" data-icon={item.icon}></span>
                                </div>
                                <p className="text-stone-700 dark:text-stone-300 font-light text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section - Split View */}
            <section className="py-24 bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[3/4] md:aspect-square bg-stone-200 rounded-sm overflow-hidden shadow-lg relative">
                                <img
                                    src="/mentor_teaching.png"
                                    alt="Mentorship Session"
                                    className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-stone-900/80 to-transparent text-white">
                                    <p className="font-mono text-xs tracking-widest uppercase mb-2">{isBM ? 'Bimbingan Peribadi' : 'Personal Guidance'}</p>
                                    <p className="font-light">{isBM ? 'Sesi satu-ke-satu yang disesuaikan mengikut kelajuan anda.' : 'One-on-one sessions specifically tailored to your pace.'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white mb-8">{cl.learnTitle}</h2>
                            <p className="text-stone-600 dark:text-stone-400 font-light text-lg mb-8">
                                {isBM ? 'Kelas memperkenalkan Islam dengan cara yang ringkas dan mudah difahami, merangkumi topik penting seperti:' : 'The classes introduce Islam in a simple and easy-to-understand way, covering essential topics such as:'}
                            </p>
                            <div className="space-y-6">
                                {
                                    [
                                        isBM ? "Kepercayaan asas Islam" : "Basic beliefs of Islam",
                                        isBM ? "Konsep Tuhan dalam Islam" : "The concept of God in Islam",
                                        isBM ? "Peranan Nabi Muhammad (selawat dan salam ke atasnya)" : "The role of Prophet Muhammad (peace be upon him)",
                                        isBM ? "Tujuan hidup mengikut Islam" : "Purpose of life according to Islam",
                                        isBM ? "Amalan dan nilai Islam biasa" : "Common Islamic practices and values"
                                    ].map((topic, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-xs text-stone-400 dark:text-stone-500 mt-1 font-mono">
                                                {idx + 1}
                                            </span>
                                            <div>
                                                <p className="text-stone-700 dark:text-stone-300 font-light leading-relaxed">{topic}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comprehensive Programs Section */}
            <section className="py-24 bg-stone-50 dark:bg-black border-b border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white">{cl.programsTitle}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-sky-50 dark:bg-sky-900/10 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-sky-900/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/40 transition-colors">
                                <span className="iconify text-sky-600 dark:text-sky-400 group-hover:text-sky-800 dark:group-hover:text-sky-300" data-icon="lucide:clipboard-check" data-width="24" data-height="24"></span>
                            </div>
                            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-4">{isBM ? 'Pendaftaran Pelukan Islam' : 'Registration of Revert to Islam'}</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                {isBM ? 'Kami menyediakan bimbingan peribadi melalui proses pendaftaran rasmi, memastikan pengalaman yang lancar dan menyokong bagi individu yang memeluk Islam secara rasmi.' : 'We provide personal guidance through the official registration process, ensuring a smooth and supportive experience for individuals formally embracing Islam.'}
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-emerald-900/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                                <span className="iconify text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300" data-icon="lucide:graduation-cap" data-width="24" data-height="24"></span>
                            </div>
                            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-4">{isBM ? 'Kelas Bimbingan Mualaf' : 'Mualaf Guidance Classes'}</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                {isBM ? 'Kami menawarkan kelas asas mengenai asas Islam untuk Mualaf. Sesi ini direka untuk menyediakan pengetahuan penting dan membina persekitaran pembelajaran yang menyokong.' : 'We offer foundational classes on the basics of Islam for Mualaf. These sessions are designed to provide essential knowledge and build a supportive learning environment.'}
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-amber-900/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors">
                                <span className="iconify text-amber-600 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300" data-icon="lucide:book-heart" data-width="24" data-height="24"></span>
                            </div>
                            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-4">{isBM ? 'Fardhu Ain (Pengajian Asas Islam)' : 'Fardhu Ain (Islamic Essential Studies)'}</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                {isBM ? 'Mempelajari ilmu fardhu ain adalah kewajipan bagi setiap Muslim, kerana ia merangkumi asas-asas penting iman, ibadah, dan akhlak yang diperlukan untuk hidup mengikut ajaran Islam.' : 'Learning fardhu ain knowledge is an obligation for every Muslim, as it covers the essential foundations of faith, worship, and moral conduct needed to live according to Islamic teachings.'}
                            </p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-rose-50 dark:bg-rose-900/10 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-rose-900/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40 transition-colors">
                                <span className="iconify text-rose-600 dark:text-rose-400 group-hover:text-rose-800 dark:group-hover:text-rose-300" data-icon="lucide:trending-up" data-width="24" data-height="24"></span>
                            </div>
                            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-4">{isBM ? 'Pemerkasaan Mualaf' : 'Mualaf Empowerment'}</h3>
                            <p className="text-stone-600 font-light leading-relaxed">
                                {isBM ? 'Inisiatif ini memberi tumpuan kepada pembangunan peribadi dan profesional jangka panjang mualaf, membantu mereka membina keyakinan dan kemahiran untuk masa depan yang berjaya.' : 'These initiatives focus on the long-term personal and professional development of converts, helping them build confidence and skills for a successful future.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Class Schedule Section */}
            <section className="py-24 bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/5 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-400 text-xs font-medium tracking-wide mb-6">{isBM ? 'Jadual Kelas' : 'Class Schedule'}</span>
                        <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-white">{cl.scheduleTitle}</h2>
                    </div>

                    <div className="space-y-24">
                        {/* NMNR Class */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-700 bg-stone-100 dark:bg-stone-800">
                                <img src="/nmnr_class.png" alt="Interactive Class for Non-Muslims" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-stone-900 dark:text-white mb-6">Kelas Interaktif Non-Muslim & Newly Reverted (NMNR)</h3>
                                <div className="space-y-4 text-stone-600 dark:text-stone-400 font-light">
                                    <div className="flex items-start">
                                        <span className="iconify text-emerald-600 mt-1 mr-3 flex-shrink-0" data-icon="lucide:calendar-clock"></span>
                                        <div>
                                            <p className="font-medium text-stone-900 dark:text-stone-200">Sabtu (Saturday)</p>
                                            <p>9:30 AM - 11:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="iconify text-emerald-600 mt-1 mr-3 flex-shrink-0" data-icon="lucide:calendar-clock"></span>
                                        <div>
                                            <p className="font-medium text-stone-900 dark:text-stone-200">Rabu (Wednesday)</p>
                                            <p>8:30 PM - 10:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* KBM Class */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-2xl font-medium text-stone-900 dark:text-white mb-6">Kelas Bimbingan Mualaf (KBM)</h3>
                                <p className="text-stone-600 dark:text-stone-400 font-light mb-6">
                                    Solat & Mengaji (Prayer & Quran Recitation)<br />
                                    <span className="text-sm text-stone-500 dark:text-stone-500">Modules: Asas (Basic), Pertengahan (Intermediate), Lanjutan (Advanced)</span>
                                </p>
                                <div className="space-y-4 text-stone-600 dark:text-stone-400 font-light">
                                    <div className="flex items-start">
                                        <span className="iconify text-emerald-600 mt-1 mr-3 flex-shrink-0" data-icon="lucide:calendar-clock"></span>
                                        <div>
                                            <p className="font-medium text-stone-900 dark:text-stone-200">Sabtu (Saturday)</p>
                                            <p>10:00 AM - 1:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="order-1 md:order-2 aspect-[4/3] rounded-sm overflow-hidden shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-700 bg-stone-100 dark:bg-stone-800">
                                <img src="/kbm_class.png" alt="Mualaf Guidance Class" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 text-center border-t border-stone-100 dark:border-stone-800 pt-16">
                        <div className="mb-8">
                            <Link to={getLink("/")} className="inline-flex justify-center items-center px-10 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 font-medium tracking-wide">
                                {cl.registerNow}
                            </Link>
                        </div>
                        <p className="text-stone-600 dark:text-stone-400 font-light">
                            {common.contactUs} <a href={`mailto:${orgData.email}`} className="text-emerald-700 dark:text-emerald-400 hover:underline">{orgData.email}</a> {common.and} <a href={`tel:${orgData.phone && orgData.phone[0]}`} className="text-emerald-700 dark:text-emerald-400 hover:underline">{orgData.phone && orgData.phone[0]}</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Light Grid for Format & Privacy */}
            < section className="py-24 bg-stone-50 dark:bg-black" >
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white dark:bg-stone-900 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800">
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white mb-6">{common.classFormat}</h2>
                            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-6">
                                {isBM ? 'Kelas boleh dijalankan dalam Bahasa Inggeris atau Bahasa Melayu, bergantung kepada ketersediaan. Sesi berpandukan pendidik terlatih yang memahami keperluan dan kebimbangan bukan Islam.' : 'Classes may be conducted in English or Bahasa Melayu, depending on availability. Sessions are guided by trained educators who understand the needs and concerns of non-Muslims.'}
                            </p>
                            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                                {isBM ? 'Kelas tersedia melalui cawangan Hidayah Centre di seluruh Malaysia dan boleh dijalankan secara berkumpulan atau sesi satu-ke-satu.' : 'Classes are available through Hidayah Centre branches across Malaysia and may be conducted in group or one-to-one sessions.'}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-stone-900 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800">
                            <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white mb-6">{common.respectfulEnv}</h2>
                            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                                {isBM ? 'Hidayah Centre Foundation memastikan semua sesi pembelajaran dijalankan dengan penuh hormat dan sulit. Tiada tekanan atau kewajipan untuk memeluk Islam, dan peserta digalakkan untuk mengambil masa mereka.' : 'Hidayah Centre Foundation ensures that all learning sessions are conducted respectfully and confidentially. There is no pressure or obligation to convert, and participants are encouraged to take their time.'}
                            </p>
                        </div>
                    </div>

                    {/* Classes for Conversion */}
                    <div className="mt-12 bg-white dark:bg-stone-900 p-10 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800">
                        <h2 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-white mb-6">{isBM ? 'Kelas untuk Mereka yang Mempertimbangkan Pembasuhan Islam' : 'Classes for Those Considering Reversion to Islam'}</h2>
                        <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-6">
                            {isBM ? 'Ramai peserta menghadiri kelas ini sebagai sebahagian daripada perjalanan mereka untuk memeluk Islam. Jika anda mempertimbangkan untuk memeluk Islam, anda juga boleh merujuk kepada panduan kami tentang cara memeluk Islam di Malaysia.' : 'Many participants attend these classes as part of their journey towards reverting to Islam. If you are considering reversion, you may also refer to our guide on how to revert to Islam in Malaysia.'}
                        </p>
                        <Link to={getLink("/convert-to-islam-malaysia")} className="inline-flex items-center text-stone-900 dark:text-white border-b border-stone-900 dark:border-white pb-1 hover:text-stone-600 dark:hover:text-stone-300 hover:border-stone-400 transition-all duration-300">
                            {isBM ? 'Cara Memeluk Islam' : 'How to Revert to Islam'}
                            <span className="iconify ml-2" data-icon="lucide:arrow-right"></span>
                        </Link>
                    </div>
                </div>
            </section >




        </main >
    );
}
