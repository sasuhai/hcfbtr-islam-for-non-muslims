# Firebase Data Migration Guide

## ✅ Firebase Configuration Complete!

Your Firebase is now connected:
- **Project**: hcfbtr-islam-for-non-muslims  
- **Status**: ✅ Firebase initialized successfully
- **Security**: `.env` file is gitignored (safe from GitHub)

---

## 📋 Next Steps: Data Migration

### Option 1: Using Firebase Console (Easiest)

1. **Export from Source Project:**
   - Open source Firebase Console
   - Go to Firestore Database
   - Use Firebase CLI to export:
     ```bash
     firebase firestore:export gs://YOUR_SOURCE_BUCKET/firestore-export
     ```

2. **Import to New Project:**
   - Use Firebase CLI to import:
     ```bash
     firebase firestore:import gs://YOUR_SOURCE_BUCKET/firestore-export --project hcfbtr-islam-for-non-muslims
     ```

### Option 2: Manual Copy via Console

**For each collection** (`pages`, `blog-posts`, `settings`):

1. Open source Firebase Console → Firestore
2. Click on collection → Click on document
3. Copy the JSON data
4. Open new Firebase Console → Firestore  
5. Create collection → Add document → Paste data

### Option 3: Using Migration Scripts

1. **Update `scripts/exportData.js`** with source Firebase credentials
2. **Run export:**
   ```bash
   cd scripts
   npm install firebase
   node exportData.js
   ```
3. **Deploy Firestore rules first:**
   - Copy rules from `firestore.rules`
   - Paste in Firebase Console → Firestore → Rules → Publish
4. **Run import:**
   ```bash
   node importData.js
   ```

---

## 🔐 Deploy Firestore Security Rules

**IMPORTANT:** Deploy these rules before importing data!

1. Go to: https://console.firebase.google.com/project/hcfbtr-islam-for-non-muslims/firestore/rules
2. Copy the rules from `firestore.rules`
3. Paste and click **"Publish"**

---

## 🎯 What You Need from Source Project

To complete migration, you need from the HCFBTR-Brocure-Resource project:

1. **Firebase credentials** (from `/Users/sasuhai/Documents/GitHub/HCFBTR-Brocure-Resource/.env`)
2. **Firestore data** from these collections:
   - `pages/home` - Homepage content
   - `pages/about` - About page content  
   - `blog-posts/*` - All blog posts
   - `settings/organization` - Organization info
   - Any other collections you need

---

## ✅ Current Status

- ✅ Firebase initialized
- ✅ `.env` configured and gitignored
- ⏳ Firestore rules - **needs deployment**
- ⏳ Data migration - **pending**

Once you deploy rules and migrate data, your app will be fully functional!
