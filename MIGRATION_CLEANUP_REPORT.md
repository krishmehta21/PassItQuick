Migration cleanup report

Summary: automated replacement of Supabase/Lovable references with Firebase equivalents completed for runtime code.

Remaining literal occurrences (needs manual review):

- `package-lock.json` contains historical references to `@supabase/*` packages and `lovable-tagger`. This file is generated and must be updated by running `npm install` locally to regenerate the lockfile.
- `supabase/` directory at project root contains migration SQL and config files. Keep for historical data migration; review/translate to Firestore rules or Cloud Functions if needed.
- `src/integrations/supabase/types.ts` kept as a DEPRECATED schema reference for migrating SQL schema to Firestore collection fields.

Action items for developer:

1. Run `npm install` locally to remove old packages from the lockfile and install `firebase`.
2. Review `supabase/migrations/*.sql` if you need to migrate relational schema to Firestore data shapes or port server-side logic to Cloud Functions.
3. Remove `package-lock.json` from version control if you prefer to regenerate it; otherwise commit the regenerated lockfile after `npm install`.

Note: All source imports of the Supabase client were removed and replaced with `@/integrations/firebase/client`.
