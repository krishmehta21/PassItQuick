Firebase security rules for Subject Source Finder

This folder contains recommended Firestore and Storage security rules for the `userNotes` feature.

Files:
- `firestore.rules` - Firestore rules that:
  - Allow public read of `userNotes` documents when `isPublic == true`.
  - Restrict create/update/delete operations on `userNotes` to the authenticated owner (`userId`).
  - Allow read on `profiles` and make courses read-only.

- `storage.rules` - Storage rules that:
  - Allow authenticated users to write files under `userNotes/{userId}/{chapterId}/{fileName}` where `userId == request.auth.uid`.
  - Currently allow reads on those files by anyone (public). If you want stronger security, set `allow read: if false` and use Cloud Functions to generate signed URLs for public sharing.

Deploying rules
1. Install Firebase CLI (if you don't have it):
   npm install -g firebase-tools

2. Login and initialize (if needed):
   firebase login
   firebase init

3. To deploy only rules from this folder (from project root):
   firebase deploy --only firestore:rules
   firebase deploy --only storage:rules

Notes and alternatives
- Storage rules cannot directly read Firestore documents. Therefore, to gate storage reads by a Firestore `isPublic` flag you'd need a server-side component (Cloud Function) to generate time-limited signed URLs when serving a public page. This is the recommended approach for secure public sharing.
- The `storage.rules` in this repo currently sets `allow read: if true` for the `userNotes` upload path to keep things simple and let the public page open links directly. If you want security, change that to `allow read: if false` and use signed URLs.
- Remember to test rules in the Firebase Console simulator before deploying.

If you'd like, I can:
- Add a Cloud Function (Node) that, given a noteId, checks Firestore `isPublic` and returns signed URLs for each file. I can scaffold the function and integrate it with the public page.
- Tighten the Storage rules and update the client to upload to a private path and rely on the function for downloads.
