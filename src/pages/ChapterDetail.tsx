import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapterById, type Chapter } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, Youtube, User, LogOut, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

const ChapterDetail = () => {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const [chapter, setChapter] = useState<Chapter & {
    importantTopics?: string[];
    pdfs?: { name: string; url: string }[];
    videos?: { title: string; url: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const ch = await getChapterById(courseId!, chapterId!);
        if (!ch) {
          toast.error("Chapter not found");
          navigate(`/courses/${courseId}`);
          return;
        }
        setChapter(ch);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load chapter");
      } finally {
        setLoading(false);
      }
    };
    loadChapter();
  }, [courseId, chapterId, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading chapter...</div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Chapter not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(`/courses/${courseId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Chapter Title */}
      <main className="container mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold mb-6">{chapter.title}</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Topics */}
          <Card className="glass-card hover:scale-105 hover:shadow-glow transition-all duration-200 cursor-pointer">
            <CardHeader>
              <CardTitle>
                <BookOpen className="inline-block mr-2" /> Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {chapter.topics && chapter.topics.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {chapter.topics.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No topics available.</p>
              )}
            </CardContent>
          </Card>

          {/* Important Topics */}
          {chapter.importantTopics && chapter.importantTopics.length > 0 && (
            <Card className="glass-card hover:scale-105 hover:shadow-glow transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle>Important Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`list-disc list-inside space-y-1 font-semibold ${theme === "dark" ? "text-accent-foreground" : "text-primary"}`}>
                  {chapter.importantTopics.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* PDFs */}
          {chapter.pdfs && chapter.pdfs.length > 0 && (
            <Card className="glass-card hover:scale-105 hover:shadow-glow transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle>PDFs & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chapter.pdfs.map((pdf, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 border rounded hover:bg-muted transition cursor-pointer"
                    onClick={() => window.open(pdf.url, "_blank")}
                  >
                    <span>{pdf.name}</span>
                    <Download className="w-5 h-5 text-accent-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Videos */}
          {chapter.videos && chapter.videos.length > 0 && (
            <Card className="glass-card hover:scale-105 hover:shadow-glow transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle>Video Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chapter.videos.map((video, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 border rounded hover:bg-muted transition cursor-pointer"
                    onClick={() => window.open(video.url, "_blank")}
                  >
                    <span>{video.title}</span>
                    <Youtube className="w-5 h-5 text-red-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChapterDetail;
