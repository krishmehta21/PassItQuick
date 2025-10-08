// populateFirestore.ts

import { firestore } from "@/integrations/firebase/client"; // Adjust this import to your firebase config file
import { doc, writeBatch } from "firebase/firestore";
import { coursesData } from "./curriculumData";
import { toast } from "sonner";

/**
 * Creates a URL-friendly slug from a chapter title.
 * E.g., "Chapter 1: Introduction" -> "ch01-introduction"
 */
const slugifyChapter = (title: string): string => {
  const chapterMatch = title.match(/Chapter (\d+)/i);
  const chapterNumber = chapterMatch ? chapterMatch[1].padStart(2, '0') : '00';
  
  const cleanTitle = title
    .toLowerCase()
    .replace(/chapter \d+:/, '') // remove "chapter x:"
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-') // collapse spaces
    .replace(/^-+|-+$/g, ''); // trim hyphens

  return `ch${chapterNumber}-${cleanTitle}`;
};


/**
 * Populates the Firestore database with courses and their chapters.
 */
export const populateCoursesInFirestore = async () => {
  const batch = writeBatch(firestore);
  let operationCount = 0;

  console.log("Starting Firestore population...");
  toast.info("Starting data upload...");

  for (const course of coursesData) {
    // 1. Create a reference for the new course document.
    // The document ID will be the course code (e.g., "CS101-DSA").
    const courseRef = doc(firestore, "courses", course.courseCode);
    
    // 2. Add the course data to the batch.
    batch.set(courseRef, {
      name: course.name,
      stream: "CSE", // As seen in your screenshot
    });
    operationCount++;
    console.log(`Preparing to add course: ${course.name}`);

    // 3. Loop through the chapters for the current course.
    for (const chapter of course.chapters) {
      const chapterId = slugifyChapter(chapter.title);
      
      // 4. Create a reference for the new chapter document in the subcollection.
      const chapterRef = doc(firestore, `courses/${course.courseCode}/chapters`, chapterId);
      
      // 5. Add the chapter data to the batch, including new fields
      batch.set(chapterRef, {
        title: chapter.title,
        topics: chapter.topics,
        ...(chapter.importantTopics && { importantTopics: chapter.importantTopics }), // Add if exists
        ...(chapter.pdfs && { pdfs: chapter.pdfs }),                               // Add if exists
        ...(chapter.videos && { videos: chapter.videos }),                           // Add if exists
      });
      operationCount++;
      console.log(`   - Preparing chapter: ${chapter.title}`);
    }
  }

  try {
    // 6. Commit the batch to Firestore.
    // This performs all the writes as a single atomic operation.
    await batch.commit();
    console.log(`Successfully committed ${operationCount} operations.`);
    toast.success("All course data has been successfully added to Firestore!");
  } catch (error) {
    console.error("Error writing batch to Firestore:", error);
    toast.error("An error occurred while uploading the data.");
  }
};