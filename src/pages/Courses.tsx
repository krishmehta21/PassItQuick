import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getCoursesForStream, type Course as FirebaseCourse } from "@/integrations/firebase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search, User, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { populateCoursesInFirestore } from "@/populateFirestore";

interface Course {
  id: string;
  name: string;
  description: string;
  stream: string;
  icon?: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (!user) return;

    const fetchCourses = async () => {
      try {
        const profile = await getProfile(user.uid);
        const stream = profile?.stream || "";

        if (!stream) {
          toast.warning("No stream found in your profile.");
          setLoading(false);
          return;
        }

        const data: FirebaseCourse[] = await getCoursesForStream(stream);
        if (!data || data.length === 0) {
          toast.info("No courses found for your stream. Try populating them temporarily.");
        }

        // Map to our local Course type to ensure description exists
        const mappedCourses: Course[] = (data || []).map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description || "No description available",
          stream: c.stream || "",
          icon: c.icon,
        }));

        setCourses(mappedCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, authLoading, navigate]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Courses
            </h1>
          </div>

          {/* Right */}
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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-10 space-y-8">
        {/* Intro */}
        <div className="text-center md:text-left animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground text-base">
            Browse study materials and chapters for your selected stream.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto md:mx-0 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Courses */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-pulse text-lg">Loading courses...</div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <Card className="glass-card text-center py-12 max-w-lg mx-auto">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-base">
                {searchTerm
                  ? "No courses found matching your search."
                  : "No courses available yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="glass-card shadow-elegant hover:shadow-glow transition-all duration-200 cursor-pointer group border border-border/40"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 gradient-hero rounded-xl transition-transform group-hover:scale-110">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>{course.stream}</CardDescription>
                      </div>
                    </div>
                    <div className="text-sm text-primary font-semibold mt-1">
                      View →
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Admin Button */}
        <div className="text-center mt-8">
          <Button variant="outline" onClick={populateCoursesInFirestore}>
            Populate Firestore Data (Admin)
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Courses;
