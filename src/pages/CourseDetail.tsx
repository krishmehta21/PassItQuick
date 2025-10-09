import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getChaptersForCourse, type Chapter, type Course } from "@/integrations/firebase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, LogOut, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(courseId);
        if (!courseData) {
          toast.error("Course not found");
          navigate("/courses");
          return;
        }
        setCourse(courseData);

        const chaptersData = await getChaptersForCourse(courseId);
        setChapters(chaptersData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Button variant="ghost" className="flex items-center" onClick={() => navigate("/courses")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
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
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Hero / Course Header */}
      {course && (
        <section className="bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary-dark/20 dark:to-primary-dark/10 py-10">
          <div className="container mx-auto px-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{course.name}</h1>
            <p className="text-muted-foreground sm:text-lg">{course.description}</p>
          </div>
        </section>
      )}

      {/* Chapters Grid */}
      <main className="container mx-auto px-6 py-8 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
        {chapters.length === 0 ? (
          <p className="text-muted-foreground text-center">No chapters available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
              <Card
                key={ch.id}
                className="glass-card cursor-pointer hover:scale-105 hover:shadow-glow transition-all duration-200 flex flex-col justify-between"
                onClick={() => navigate(`/courses/${courseId}/chapters/${ch.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition">
                    {ch.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button
                    variant="hero"
                    className="w-full text-sm"
                    onClick={() => navigate(`/courses/${courseId}/chapters/${ch.id}`)}
                  >
                    See Resources Pookie ;) →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetail;
