const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
const teamData = require("../data/team_data.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function migrateData() {
    console.log("Starting migration...");
    const employees = teamData.employees || [];

    if (employees.length === 0) {
        console.log("No employees found in team_data.json");
        return;
    }

    // Batch write for efficiency
    const batch = db.batch();

    // Save employees
    // Collection: 'team_members' or 'employees'
    // I will use 'employees' to match general convention or 'team'
    const collectionRef = db.collection('employees');

    employees.forEach(emp => {
        const docRef = collectionRef.doc(emp.id);
        batch.set(docRef, emp);
    });

    // Save settings (defaults)
    const settingsRef = db.collection('settings').doc('orgChart');
    batch.set(settingsRef, {
        currentTheme: 'mesh',
        showDeptAbove: false,
        showPhotos: true,
        scale: 1,
        expandedIds: [] // Can't easily save Set, so array
    }, { merge: true });

    await batch.commit();
    console.log(`Successfully migrated ${employees.length} employees and default settings to Firestore.`);
}

migrateData().catch(console.error);
