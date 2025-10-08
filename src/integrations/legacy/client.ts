// Legacy backend client shim (deprecated)
// This file used to export the legacy hosted DB client. It is kept only as a reference
// and will raise if imported. Import from `@/integrations/firebase/client` instead.

/* eslint-disable no-console */
throw new Error(
  "Deprecated legacy backend client. Import from '@/integrations/firebase/client' and use Firebase Auth/Firestore/Storage instead."
);
