# Firebase Authentication Setup Guide

This guide will walk you through setting up Firebase Authentication for the admin dashboard.

## Step 1: Enable Authentication in Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **hcfbtr-islam-for-non-muslims**
3. In the left sidebar, click on **"Authentication"**
4. Click the **"Get Started"** button (if you haven't enabled Authentication yet)

## Step 2: Enable Email/Password Sign-in Method

1. Click on the **"Sign-in method"** tab
2. Find **"Email/Password"** in the list of providers
3. Click on it to open the configuration
4. Toggle **"Enable"** to ON
5. **Do NOT** enable "Email link (passwordless sign-in)" unless you want that feature
6. Click **"Save"**

## Step 3: Create Your First Admin User

### Option A: Using Firebase Console (Recommended for first user)

1. Still in the **Authentication** section, click on the **"Users"** tab
2. Click **"Add user"** button
3. Enter your admin email (e.g., `admin@hcfbtr.org`)
4. Enter a secure password (at least 6 characters)
5. Click **"Add user"**
6. **Important**: Copy the User UID that appears (you'll need this in Step 4)

### Option B: Using the Setup Script (Easiest)

I have created a script that handles everything for you (User creation + Firestore role assignment).

1. Open your terminal in the project folder
2. Run the script:
   ```bash
   node scripts/createFirstAdmin.js
   ```
3. Follow the prompts to enter your email and password
4. The script will create the user and assign the admin role automatically.

*Note: This works because our security rules allow any authenticated user to write to their own user profile.*

## Step 5: Test the Login

1. Go to your application: `http://localhost:5173/login`
2. Enter the email and password you created in Step 3
3. Click **"Sign In"**
4. You should be redirected to `/admin` and see the Admin Dashboard

## Troubleshooting

### "Invalid credentials" error
- Double-check the email and password
- Make sure the user exists in Authentication > Users tab

### "You don't have permission" error
- Verify the user document exists in Firestore `users` collection
- Check that the `role` field is set to `"admin"`
- Verify the document ID matches the User UID from Authentication

### "Cannot read property 'role'" error
- The user document in Firestore is missing
- Follow Step 4 again to create the user document

## Security Notes

1. **Never commit** your admin credentials to Git
2. Use strong passwords for admin accounts
3. Keep the number of admin users minimal
4. Regularly review the users in Authentication > Users tab
5. The Firestore security rules only allow authenticated admin users to access admin data

## Next Steps

After setting up authentication:
1. ✅ Test login with your admin account
2. ✅ Access the Admin Dashboard
3. ✅ Create additional admin users through the dashboard if needed
4. ✅ Review and update Firestore security rules if necessary

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
