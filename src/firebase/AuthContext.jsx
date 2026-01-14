import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from './config';
import { getDocument, updateDocument, createDocument } from './firestoreService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check user role from Firestore
    const checkUserRole = async (uid) => {
        try {
            const userDoc = await getDocument('users', uid);
            if (userDoc) {
                setUserRole(userDoc.role || 'user');
                return userDoc.role;
            }
            return 'user';
        } catch (error) {
            console.error('❌ Error checking user role:', error);
            return 'user';
        }
    };

    useEffect(() => {
        // If auth is not configured, just set loading to false
        if (!auth) {
            console.warn('Firebase auth not configured');
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                await checkUserRole(user.uid);
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Login
    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const role = await checkUserRole(result.user.uid);
            return { success: true, role };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUserRole(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    };

    // Create admin user
    const createAdminUser = async (email, password, displayName = '') => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document with admin role
            await createDocument('users', {
                email,
                displayName,
                role: 'admin',
                createdAt: new Date().toISOString(),
                createdBy: user?.uid || 'system'
            }, result.user.uid);

            return { success: true, uid: result.user.uid };
        } catch (error) {
            console.error('Create admin error:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        userRole,
        isAdmin: userRole === 'admin',
        loading,
        login,
        logout,
        createAdminUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
