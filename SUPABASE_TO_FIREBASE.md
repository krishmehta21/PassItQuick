Migration notes: Supabase -> Firebase

Overview

This project was migrated from Supabase to Firebase (Auth + Firestore + Storage). The goal was to
preserve existing UI and data shapes while replacing backend calls with Firebase SDK equivalents.

Files changed

- `.env` - replaced Supabase env vars with Firebase config variables (update with your Firebase project values).
- `src/integrations/firebase/client.ts` - new Firebase client and small helper functions (auth, firestore, storage).
- `src/integrations/supabase/client.ts` - deprecated shim that throws to prevent accidental usage.
- `src/contexts/AuthContext.tsx` - refactored to use Firebase Auth onAuthStateChanged.
- Pages: `src/pages/Auth.tsx`, `Profile.tsx`, `Onboarding.tsx`, `Dashboard.tsx`, `Courses.tsx` updated to use Firestore/Auth helpers.
- `README.md`, `index.html`, `vite.config.ts` - removed references to 3rd-party tooling and Lovable plugin.

Firestore structure suggestion

The app expects the following collections / document layout (adapt as needed):

- `profiles` collection: doc id = user uid, fields: full_name, email, college, stream, created_at, updated_at
- `courses` collection: doc id = course id, fields: name, description, stream, icon, created_at
- `chapters` collection: doc id = chapter id, fields: course_id (ref), name, description, order_index, created_at
- `materials` collection: doc id = material id, fields: chapter_id, title, type, url, uploaded_by, is_public, created_at

Cloud Functions

- Any server-side business logic (row-level security, triggers, or functions) should be migrated to
  Firebase Cloud Functions.
- Suggested steps:
  1. Create a `functions/` directory and initialize a Firebase Functions project.
  2. Port SQL-based business logic to JS/TS functions. Use Firestore triggers (onCreate/onUpdate) as needed.
  3. Deploy functions with `firebase deploy --only functions`.

Developer notes and TODOs

- Update `.env` with your Firebase project details.
- Run `npm i` to install `firebase` and regenerate lockfile. Remove `package-lock.json` entries are expected to remain until `npm i`.
- Search for any remaining references to `supabase` or `lovable` if you add new files.

Contact

If you need help migrating complex SQL queries or Supabase-specific features (realtime, Postgres-only features), reach out and we can create Cloud Functions or adjust Firestore data shapes.
