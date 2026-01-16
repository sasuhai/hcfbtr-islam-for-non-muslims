import { createContext, useContext, useState, useEffect } from 'react';
import { getDocument, createDocument } from '../firebase/firestoreService';

const OrganizationContext = createContext();

export function useOrganization() {
    return useContext(OrganizationContext);
}

const defaultOrgData = {
    fullName: '',
    shortName: '',
    address: '',
    email: '',
    phone: [],
    facebook: '',
    instagram: '',
    hqUrl: '',
    operatingHours: [
        { day: 'Monday - Friday', time: '09:00 - 17:00' },
        { day: 'Saturday', time: '09:00 - 13:00' },
        { day: 'Sunday', time: 'Closed' }
    ],
    bank: {
        bankName: '',
        accountName: '',
        accountNumber: ''
    },
    qrCodeUrl: ''
};

export function OrganizationProvider({ children }) {
    const [orgData, setOrgData] = useState(defaultOrgData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrgData();
    }, []);

    const loadOrgData = async () => {
        try {
            setLoading(true);

            // 1. Load main organization data (branding, etc)
            const data = await getDocument('settings', 'organization');

            // 2. Potentially load dedicated operating hours document if user requested it
            // the phrase "db org operating hours" might refer to a specific document
            const hoursData = await getDocument('settings', 'org_operating_hours');

            if (data || hoursData) {
                // Determine operating hours from either document, checking for both camelCase and snake_case
                let operatingHours = data?.operatingHours || data?.operating_hours;

                if (hoursData) {
                    operatingHours = hoursData.operatingHours || hoursData.operating_hours || hoursData.hours || operatingHours;
                }

                setOrgData({
                    ...defaultOrgData,
                    ...data,
                    // If we found specific hours, override
                    ...(operatingHours ? { operatingHours: Array.isArray(operatingHours) ? operatingHours : defaultOrgData.operatingHours } : {})
                });
            } else {
                setOrgData(defaultOrgData);
            }
            setError(null);
        } catch (err) {
            console.warn('Could not load organization data, using defaults:', err.message);
            setOrgData(defaultOrgData);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    const updateOrgData = async (newData) => {
        try {
            // Use createDocument with specific ID 'organization' to ensure it's created or overwritten (upsert)
            // This fixes the issue where updateDocument failed if the document didn't exist yet
            await createDocument('settings', newData, 'organization');
            setOrgData(newData);
            return { success: true };
        } catch (err) {
            console.error('Error updating organization data:', err);
            return { success: false, error: err.message };
        }
    };

    const value = {
        orgData,
        loading,
        error,
        updateOrgData,
        refreshOrgData: loadOrgData
    };

    return (
        <OrganizationContext.Provider value={value}>
            {children}
        </OrganizationContext.Provider>
    );
}
