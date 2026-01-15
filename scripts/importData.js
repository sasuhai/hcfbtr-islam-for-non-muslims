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
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TARGET Firebase Configuration (from .env)
const targetConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
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
