/**
 * Firebase Data Migration Script
 * 
 * This script helps export data from the source Firebase project
 * and import it into the new project.
 * 
 * Usage:
 * 1. First, update the source Firebase config below
 * 2. Run: node scripts/exportData.js
 * 3. Data will be saved to scripts/exported-data.json
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SOURCE Firebase Configuration (HCFBTR-Brocure-Resource)
const sourceConfig = {
    apiKey: "AIzaSyDRwhuZiJPSbcvckkphm1CTyMrxZHIG30c",
    authDomain: "hcfbtr-brocure-resource.firebaseapp.com",
    projectId: "hcfbtr-brocure-resource",
    storageBucket: "hcfbtr-brocure-resource.firebasestorage.app",
    messagingSenderId: "541292067142",
    appId: "1:541292067142:web:e9d9a80870f47c607bcd47",
    measurementId: "G-FD1QVBZ3SR"
};

// Initialize Source Firebase
const sourceApp = initializeApp(sourceConfig, 'source');
const sourceDb = getFirestore(sourceApp);

// Collections to export
const COLLECTIONS_TO_EXPORT = [
    'pages',
    'blog-posts',
    'settings',
    'users',
    'analytics',
    'classes'
];

async function exportData() {
    console.log('🔄 Starting data export from source Firebase...\n');

    const exportedData = {};

    for (const collectionName of COLLECTIONS_TO_EXPORT) {
        try {
            console.log(`📦 Exporting collection: ${collectionName}`);

            const collectionRef = collection(sourceDb, collectionName);
            const snapshot = await getDocs(collectionRef);

            const documents = {};
            snapshot.forEach((doc) => {
                documents[doc.id] = doc.data();
            });

            exportedData[collectionName] = documents;
            console.log(`✅ Exported ${snapshot.size} documents from ${collectionName}\n`);

        } catch (error) {
            console.error(`❌ Error exporting ${collectionName}:`, error.message);
            exportedData[collectionName] = {};
        }
    }

    // Save to file
    const outputPath = path.join(__dirname, 'exported-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(exportedData, null, 2));

    console.log(`\n✅ Export complete! Data saved to: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Review the exported-data.json file');
    console.log('2. Run: node scripts/importData.js to import into new Firebase');

    process.exit(0);
}

exportData().catch(error => {
    console.error('❌ Export failed:', error);
    process.exit(1);
});
