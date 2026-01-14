import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    increment,
    arrayUnion
} from 'firebase/firestore';
import { db } from './config';

/**
 * Create a new document in a collection
 * @param {string} collectionName - Name of the collection
 * @param {object} data - Data to store
 * @param {string} docId - Optional document ID (if not provided, auto-generated)
 * @returns {Promise<object>} Created document with ID
 */
export const createDocument = async (collectionName, data, docId = null) => {
    try {
        const timestamp = new Date().toISOString();
        const dataWithTimestamps = {
            ...data,
            createdAt: data.createdAt || timestamp,
            updatedAt: timestamp
        };

        if (docId) {
            // Use specific document ID
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, dataWithTimestamps);
            return { id: docId, ...dataWithTimestamps };
        } else {
            // Auto-generate document ID
            const docRef = await addDoc(collection(db, collectionName), dataWithTimestamps);
            return { id: docRef.id, ...dataWithTimestamps };
        }
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<object|null>} Document data or null
 */
export const getDocument = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<array>} Array of documents
 */
export const getAllDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
};

/**
 * Query documents with filters
 * @param {string} collectionName - Name of the collection
 * @param {array} filters - Array of filter objects: [{ field, operator, value }]
 * @param {object} options - Optional orderBy: { field, direction }
 * @returns {Promise<array>} Array of matching documents
 */
export const queryDocuments = async (collectionName, filters = [], options = {}) => {
    try {
        let q = collection(db, collectionName);

        // Apply filters
        const constraints = filters.map(filter =>
            where(filter.field, filter.operator, filter.value)
        );

        // Apply ordering if specified
        if (options.orderBy) {
            constraints.push(orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
        }

        if (constraints.length > 0) {
            q = query(q, ...constraints);
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
};

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {object} data - Data to update
 * @returns {Promise<object>} Updated document
 */
export const updateDocument = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        await updateDoc(docRef, updateData);
        return { id: docId, ...updateData };
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

/**
 * Update analytics counters atomically
 * @param {string} dateId - Date string YYYY-MM-DD
 * @param {object} updates - Object containing specific updates (can include FieldValues)
 * @returns {Promise<void>}
 */
export const updateAnalytics = async (dateId, updates) => {
    try {
        const docRef = doc(db, 'analytics_daily', dateId);
        // We use setDoc with merge: true so it creates the doc if it doesn't exist
        await setDoc(docRef, updates, { merge: true });
    } catch (error) {
        console.error('Error updating analytics:', error);
        // Silent fail for analytics
    }
};
