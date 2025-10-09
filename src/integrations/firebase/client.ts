// src/integrations/firebase/client.ts
// Firebase client initialization with updated course/chapter helpers

import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  setLogLevel,
  type DocumentData,
  documentId,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

/* -------------------------------------------------------------------------- */
/*                                ENV HANDLING                                */
/* -------------------------------------------------------------------------- */

function sanitizeEnv(value: any) {
  if (typeof value !== "string") return value;
  return value.replace(/^\s*["']|["']\s*$/g, "").trim();
}

const firebaseConfig = {
  apiKey:
    sanitizeEnv(import.meta.env.VITE_FIREBASE_API_KEY) ||
    (import.meta.env.DEV
      ? sanitizeEnv(import.meta.env.VITE_FIREBASE_API_KEY_FALLBACK)
      : undefined),
  authDomain: sanitizeEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: sanitizeEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: sanitizeEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: sanitizeEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: sanitizeEnv(import.meta.env.VITE_FIREBASE_APP_ID),
};

if (!firebaseConfig.apiKey || String(firebaseConfig.apiKey).length < 20) {
  throw new Error(
    "Missing or invalid Firebase API key. Check your .env for VITE_FIREBASE_API_KEY."
  );
}

/* -------------------------------------------------------------------------- */
/*                             FIREBASE INITIALIZATION                        */
/* -------------------------------------------------------------------------- */

let app: FirebaseApp;
try {
  app = initializeApp(firebaseConfig);
  console.info("[firebase] Initialized:", app.name);
} catch (err: any) {
  console.error("[firebase] Initialization failed:", err.message || err);
  throw err;
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

if (import.meta.env.DEV) {
  try {
    setLogLevel("debug");
    console.info("[firebase] Firestore logging enabled (debug)");
  } catch {
    console.warn("[firebase] setLogLevel not supported in this SDK version.");
  }
}

/* -------------------------------------------------------------------------- */
/*                               TYPE INTERFACES                              */
/* -------------------------------------------------------------------------- */

export interface Chapter {
  id: string;
  title: string;
  topics: string[];
  order: number;
  importantTopics?: string[];
  pdfs?: { name: string; url: string }[];
  videos?: { title: string; url: string }[];
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  stream: string;
  icon?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

export async function getProfile(uid: string) {
  const profilesCol = collection(firestore, "profiles");
  const q = query(profilesCol, where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.empty ? null : (snap.docs[0].data() as DocumentData);
}

export async function setProfile(uid: string, data: Record<string, any>) {
  const profilesCol = collection(firestore, "profiles");
  const q = query(profilesCol, where("uid", "==", uid));
  const snap = await getDocs(q);

  const docRef = snap.empty ? doc(profilesCol) : snap.docs[0].ref;
  await setDoc(
    docRef,
    { ...data, uid, updated_at: new Date().toISOString() },
    { merge: true }
  );
}

/**
 * ✅ Updated:
 * If `stream` is empty → return ALL courses
 * Otherwise → return only courses matching that stream.
 */
export async function getCoursesForStream(stream: string): Promise<Course[]> {
  const coursesCol = collection(firestore, "courses");
  try {
    let q;
    if (!stream) {
      q = query(coursesCol, orderBy("name"));
    } else {
      q = query(coursesCol, where("stream", "==", stream), orderBy("name"));
    }

    const snaps = await getDocs(q);
    return snaps.docs.map((d) => {
      const data = d.data() as DocumentData;
      return { id: d.id, ...data } as Course;
    });
  } catch (err: any) {
    const msg = err?.message || "";
    if (msg.includes("requires an index") || msg.toLowerCase().includes("index")) {
      console.warn(
        "[firebase] Missing Firestore index for getCoursesForStream(). Fallback to client sort."
      );
      let snaps2;
      if (!stream) {
        snaps2 = await getDocs(collection(firestore, "courses"));
      } else {
        const q2 = query(coursesCol, where("stream", "==", stream));
        snaps2 = await getDocs(q2);
      }
      const arr = snaps2.docs.map((d) => {
        const data = d.data() as DocumentData;
        return { id: d.id, ...data } as Course;
      });
      arr.sort((a, b) => a.name.localeCompare(b.name));
      return arr;
    }
    throw err;
  }
}

/* -------------------------------------------------------------------------- */
/*                              SINGLE COURSE/CHAPTER FETCH                   */
/* -------------------------------------------------------------------------- */

export async function getCourseById(courseId: string): Promise<Course | null> {
  if (!courseId) return null;
  const snap = await getDoc(doc(firestore, "courses", courseId));
  if (!snap.exists()) return null;
  const data = snap.data() as DocumentData;
  return { id: snap.id, ...data } as Course;
}

export async function getChapterById(
  courseId: string,
  chapterId: string
): Promise<Chapter | null> {
  if (!courseId || !chapterId) return null;
  try {
    const snap = await getDoc(doc(firestore, "courses", courseId, "chapters", chapterId));
    if (!snap.exists()) return null;
    const data = snap.data() as DocumentData;

    return {
      id: snap.id,
      title: data.title ?? "Untitled Chapter",
      topics: Array.isArray(data.topics) ? data.topics.map((t: any) => t) : [],
      order: typeof data.order === "number" ? data.order : 0,
      importantTopics: Array.isArray(data.importantTopics)
        ? data.importantTopics.map((t: any) => t)
        : [],
      pdfs: Array.isArray(data.pdfs)
        ? data.pdfs.map((p: any) => ({
            name: p?.name ?? "Untitled PDF",
            url: p?.url ?? "#",
          }))
        : [],
      videos: Array.isArray(data.videos)
        ? data.videos.map((v: any) => ({
            title: v?.title ?? "Untitled Video",
            url: v?.url ?? "#",
          }))
        : [],
    };
  } catch (err) {
    console.error(`[firebase] Failed to get chapter ${chapterId} for ${courseId}:`, err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              CHAPTERS HANDLING                             */
/* -------------------------------------------------------------------------- */

export async function getChaptersForCourse(courseId: string): Promise<Chapter[]> {
  if (!courseId) return [];
  try {
    const chaptersCol = collection(firestore, "courses", courseId, "chapters");
    const q = query(chaptersCol, orderBy(documentId(), "asc"));
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => {
      const data = d.data() as DocumentData;
      return {
        id: d.id,
        title: data.title ?? "Untitled Chapter",
        topics: Array.isArray(data.topics) ? data.topics : [],
        order: typeof data.order === "number" ? data.order : 0,
      } as Chapter;
    });
  } catch (err) {
    console.error(`[firebase] Failed to get chapters for ${courseId}:`, err);
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                              STORAGE UTILITIES                             */
/* -------------------------------------------------------------------------- */

export async function uploadFile(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
): Promise<string> {
  const r = storageRef(storage, path);
  const snap = await uploadBytes(r, file as any);
  return getDownloadURL(snap.ref);
}

/* -------------------------------------------------------------------------- */
/*                                   AUTH                                     */
/* -------------------------------------------------------------------------- */

export async function signOut() {
  await firebaseSignOut(auth);
}

/* -------------------------------------------------------------------------- */
/*                                 DEBUG UTILS                                */
/* -------------------------------------------------------------------------- */

export async function debugFirebase() {
  console.info("[firebase:debug] currentUser:", auth.currentUser);
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    console.info("[firebase:debug] token length:", token?.length);
  }
}

export async function debugFirestore() {
  console.info("[firebase:firestore-debug] options:", (app as any).options || {});
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    console.info(
      "[firebase:firestore-debug] uid:",
      auth.currentUser.uid,
      "token len:",
      token.length
    );
  } else {
    console.info("[firebase:firestore-debug] no user");
  }
}

/* -------------------------------------------------------------------------- */
/*                             DISCOVER PAGE HELPERS                          */
/* -------------------------------------------------------------------------- */

export interface PublishedSpace {
  id: string;
  title: string;
  ownerUid: string;
  ownerDisplayName: string;
  isPublic: boolean;
  viewCount: number;
  publishedAt: string;
  blocks: string;
}

export async function getPublicSpaces(limitCount: number = 20): Promise<PublishedSpace[]> {
  const spacesCol = collection(firestore, "published_spaces");
  try {
    const q = query(
      spacesCol,
      where("isPublic", "==", true),
      orderBy("publishedAt", "desc")
    );
    const snap = await getDocs(q);
    const results = snap.docs.map((d) => {
      const data = d.data() as DocumentData;
      return { id: d.id, ...data } as PublishedSpace;
    });
    return results.slice(0, limitCount);
  } catch (err: any) {
    const msg = err?.message || "";
    if (msg.includes("requires an index")) {
      console.warn("[firebase] Missing index for getPublicSpaces(). Falling back.");
      const q2 = query(spacesCol, where("isPublic", "==", true));
      const snap2 = await getDocs(q2);
      const arr = snap2.docs.map((d) => {
        const data = d.data() as DocumentData;
        return { id: d.id, ...data } as PublishedSpace;
      });
      arr.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
      return arr.slice(0, limitCount);
    }
    console.error("[firebase] Failed to fetch public spaces:", err);
    return [];
  }
}

export async function getSpaceById(spaceId: string): Promise<PublishedSpace | null> {
  if (!spaceId) return null;
  try {
    const snap = await getDoc(doc(firestore, "published_spaces", spaceId));
    if (!snap.exists()) return null;
    const data = snap.data() as DocumentData;
    return { id: snap.id, ...data } as PublishedSpace;
  } catch (err) {
    console.error(`[firebase] Failed to fetch published space ${spaceId}:`, err);
    return null;
  }
}

export async function incrementSpaceViewCount(spaceId: string): Promise<void> {
  if (!spaceId) return;
  try {
    const spaceRef = doc(firestore, "published_spaces", spaceId);
    const snap = await getDoc(spaceRef);
    if (!snap.exists()) return;
    const currentCount = (snap.data() as DocumentData)?.viewCount || 0;
    await setDoc(spaceRef, { viewCount: currentCount + 1 }, { merge: true });
  } catch (err) {
    console.warn(`[firebase] Failed to increment view count for ${spaceId}:`, err);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 RE-EXPORTS                                 */
/* -------------------------------------------------------------------------- */

export { onAuthStateChanged };
export type FirebaseUser = User;
