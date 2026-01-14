/**
 * Firebase Data Import Script
 * 
 * This script imports data from exported-data.json into the new Firebase project
 * 
 * Usage:
 * 1. Make sure firestore.rules are deployed
 * 2. Make sure exported-data.json exists (run exportData.js first)
 * 3. Run: node scripts/importData.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TARGET Firebase Configuration (from .env)
const targetConfig = {
    apiKey: "AIzaSyB15VWvCiFfYxMiUgPPrCXL1d86mCVDYhQ",
    authDomain: "hcfbtr-islam-for-non-muslims.firebaseapp.com",
    projectId: "hcfbtr-islam-for-non-muslims",
    storageBucket: "hcfbtr-islam-for-non-muslims.firebasestorage.app",
    messagingSenderId: "910111903788",
    appId: "1:910111903788:web:f4ee06129440aa80364189"
};

// Initialize Target Firebase
const targetApp = initializeApp(targetConfig);
const targetDb = getFirestore(targetApp);

async function importData() {
    console.log('🔄 Starting data import to new Firebase...\n');

    // Read exported data
    const dataPath = path.join(__dirname, 'exported-data.json');

    if (!fs.existsSync(dataPath)) {
        console.error('❌ Error: exported-data.json not found!');
        console.log('Please run: node scripts/exportData.js first\n');
        process.exit(1);
    }

    const exportedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    for (const [collectionName, documents] of Object.entries(exportedData)) {
        try {
            console.log(`📦 Importing collection: ${collectionName}`);

            const docCount = Object.keys(documents).length;
            let imported = 0;

            for (const [docId, docData] of Object.entries(documents)) {
                try {
                    const docRef = doc(targetDb, collectionName, docId);
                    await setDoc(docRef, docData);
                    imported++;
                } catch (docError) {
                    console.error(`  ⚠️  Failed to import ${docId}:`, docError.message);
                }
            }

            console.log(`✅ Imported ${imported}/${docCount} documents to ${collectionName}\n`);

        } catch (error) {
            console.error(`❌ Error importing ${collectionName}:`, error.message);
        }
    }

    console.log('\n✅ Import complete!');
    console.log('\nNext steps:');
    console.log('1. Go to Firebase Console and verify the data');
    console.log('2. Refresh your web app to see the imported content');

    process.exit(0);
}

importData().catch(error => {
    console.error('❌ Import failed:', error);
    process.exit(1);
});
