/**
 * Copy "home" document to "about" in Firestore
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const targetConfig = {
    apiKey: "AIzaSyB15VWvCiFfYxMiUgPPrCXL1d86mCVDYhQ",
    authDomain: "hcfbtr-islam-for-non-muslims.firebaseapp.com",
    projectId: "hcfbtr-islam-for-non-muslims",
    storageBucket: "hcfbtr-islam-for-non-muslims.firebasestorage.app",
    messagingSenderId: "910111903788",
    appId: "1:910111903788:web:f4ee06129440aa80364189"
};

const app = initializeApp(targetConfig);
const db = getFirestore(app);

async function copyHomeToAbout() {
    try {
        console.log('📋 Copying pages/home to pages/about...\n');

        // Get the home document
        const homeRef = doc(db, 'pages', 'home');
        const homeSnap = await getDoc(homeRef);

        if (!homeSnap.exists()) {
            console.error('❌ Error: pages/home document not found!');
            process.exit(1);
        }

        const homeData = homeSnap.data();
        console.log('✅ Found home document');

        // Create about document with the same data
        const aboutRef = doc(db, 'pages', 'about');
        await setDoc(aboutRef, {
            ...homeData,
            id: 'about',
            updatedAt: new Date().toISOString()
        });

        console.log('✅ Successfully copied to pages/about\n');
        console.log('Next step: Refresh your browser to see the About page content!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

copyHomeToAbout();
