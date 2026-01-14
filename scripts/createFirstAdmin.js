import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// 1. Load Environment Variables manually
const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const envVars = {};

        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                envVars[key] = value;
            }
        });
        return envVars;
    } catch (e) {
        console.error('❌ Error reading .env file:', e.message);
        process.exit(1);
    }
};

const env = loadEnv();

// 2. Initialize Firebase
const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
    console.log('\n🚀 Create First Admin User Script');
    console.log('=================================\n');
    console.log('This script will create a user in Firebase Auth and set their role to "admin" in Firestore.\n');

    try {
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password (min 6 chars): ');

        if (password.length < 6) {
            console.error('❌ Password must be at least 6 characters.');
            process.exit(1);
        }

        console.log(`\nCreating user ${email}...`);

        let userCredential;
        try {
            // Try creating user
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('⚠️  User already exists. Trying to sign in to update role...');
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                throw error;
            }
        }

        const user = userCredential.user;
        console.log(`✅ Authentication successful for UID: ${user.uid}`);

        // Write to Firestore
        // Note: Firestore rules allow a user to write to /users/{their_own_uid}
        console.log('Setting admin role in Firestore...');

        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: 'Admin User',
            role: 'admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, { merge: true });

        console.log('✅ Admin role set successfully!');
        console.log('\n🎉 DONE! You can now log in at /login\n');

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
    } finally {
        rl.close();
        process.exit(0);
    }
};

createAdmin();
