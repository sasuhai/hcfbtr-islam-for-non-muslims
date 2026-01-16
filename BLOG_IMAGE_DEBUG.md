# Blog Image Upload Debug Guide

## Issue
Uploaded photos for blog posts are not being loaded when editing and/or not being saved to Firestore.

## Debugging Steps Added

I've added comprehensive console logging to help diagnose the issue. Here's what to check:

### 1. Check Browser Console When Uploading an Image

When you upload an image, you should see:
```
📤 Uploading blog image: {name: "...", size: ..., type: "image/..."}
✅ Image converted to data URL, length: ...
📝 Updated blogForm with image```

**If you don't see these logs**: The upload handler isn't being triggered.
**If the length is 0**: The file reading failed.

### 2. Check Console When Submitting the Form

When you submit the blog post (create or update), you should see:
```
🖼️ Blog image before save: {hasImage: true, imageType: "data:image/...", imageLength: ...}
📦 Document size: X.XX MB
📝 Creating new blog post (or Updating blog post: ...)
✅ Blog post created/updated successfully with image: true
```

**If hasImage is false**: The image wasn't in the form state when submitted.
**If Document size > 0.90 MB**: You'll get a warning - Firestore has a 1MB limit!
**If you see an error**: Check the error details logged below.

### 3. Check Console When Editing an Existing Post

When you click "Edit" on a blog post, you should see:
```
✏️ Editing blog post: ...
📸 Post image data: {hasImage: true/false, imageType: "...", imageLength: ...}
```

**If hasImage is false**: The image wasn't saved to Firestore in the first place.
**If hasImage is true but the preview doesn't show**: There's a UI rendering issue.

## Common Issues and Solutions

### Issue 1: Document Too Large (Most Likely)
**Symptoms**: 
- Console shows document size > 0.90 MB
- Error message about "maximum size" or "invalid-argument"

**Solution**:
1. Use smaller images (compress to under 400KB before uploading)
2. Use external image URLs instead of base64 uploads
   - Upload to an image host
   - Use the "Direct Image Path / Base64" input field to paste the URL

### Issue 2: Image Not Persisting to Firestore
**Symptoms**:
- Upload works (you see the preview)
- No errors when saving
- But when editing, image is missing (hasImage: false)

**Solution**: Check Firestore Rules - ensure the image field is allowed:
```javascript
// In Firestore Rules
allow write: if request.auth != null && request.resource.data.size() < 1000000; // 1MB limit
```

### Issue 3: UI Not Showing Uploaded Image
**Symptoms**:
- hasImage: true in console
- imageLength is reasonable
- But preview div shows 🖼️ emoji instead of image

**Solution**: Check the preview logic in the JSX (lines 1288-1292 in AdminDashboard.jsx)

## Testing Procedure

1. **Test Creating a New Post with Image**:
   - Click "Add Blog Post"
   - Fill in required fields
   - Upload a small image (< 200KB)
   - Check console for upload logs
   - Submit form
   - Check console for save logs
   - Verify success message

2. **Test Editing the Post**:
   - Click "Edit" on the post you just created
   - Check console for edit logs
   - Verify image appears in preview
   - Make a small change
   - Submit
   - Check console for update logs

3. **Test with Large Image**:
   - Try uploading an image > 700KB
   - You should see a warning about document size
   - Check if save succeeds or fails
   - Note any error messages

## Next Steps

After testing, share:
1. All console logs from the upload/save/edit process
2. Any error messages
3. The document size shown (in MB)
4. Whether the image field exists in Firestore (check Firebase Console)

This will help identify the exact cause of the issue.
