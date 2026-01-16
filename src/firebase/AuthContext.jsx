import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updatePassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './config';
import { getDocument, updateDocument, createDocument } from './firestoreService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [requirePasswordChange, setRequirePasswordChange] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check user role from Firestore
    const checkUserRole = async (uid) => {
        try {
            const userDoc = await getDocument('users', uid);
            if (userDoc) {
                setUserRole(userDoc.role || 'user');
                setRequirePasswordChange(!!userDoc.requirePasswordChange);
                return { role: userDoc.role, requirePasswordChange: !!userDoc.requirePasswordChange };
            }
            return { role: 'user', requirePasswordChange: false };
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
                const { role, requirePasswordChange: reqChange } = await checkUserRole(user.uid);
            } else {
                setUserRole(null);
                setRequirePasswordChange(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Login
    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { role, requirePasswordChange: reqChange } = await checkUserRole(result.user.uid);
            return { success: true, role, requirePasswordChange: reqChange };
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
            setRequirePasswordChange(false);
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
                requirePasswordChange: true,
                createdAt: new Date().toISOString(),
                createdBy: user?.uid || 'system'
            }, result.user.uid);

            return { success: true, uid: result.user.uid };
        } catch (error) {
            console.error('Create admin error:', error);
            if (error.code === 'auth/email-already-in-use') {
                return {
                    success: false,
                    error: 'This account already exists in Firebase. If you previously deleted their permissions, you must manually delete the account from the Firebase Console before you can re-add them here.',
                    code: 'email-already-in-use'
                };
            }
            return { success: false, error: error.message };
        }
    };

    // Change Password
    const changePassword = async (newPassword) => {
        try {
            if (!auth.currentUser) throw new Error('No user logged in');

            await updatePassword(auth.currentUser, newPassword);

            // Update Firestore to remove the requirement flag
            await updateDocument('users', auth.currentUser.uid, {
                requirePasswordChange: false,
                passwordChangedAt: new Date().toISOString()
            });

            setRequirePasswordChange(false);
            return { success: true };
        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, error: error.message };
        }
    };

    // Reset Password (Forgot Password)
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            console.error('Reset password error:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        userRole,
        isAdmin: userRole === 'admin',
        requirePasswordChange,
        loading,
        login,
        logout,
        createAdminUser,
        changePassword,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
