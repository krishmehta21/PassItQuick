import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getPublicSpaces } from "@/integrations/firebase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Library, LogOut, Moon, Sun, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface Profile {
  fullName: string;
  college: string | null;
  stream: string | null;
}

interface PublishedSpace {
  id: string;
  title: string;
  ownerUid: string;
  ownerDisplayName: string;
  isPublic: boolean;
  viewCount: number;
  publishedAt: string;
  blocks: string;
  thumbnailUrl?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [publicSpaces, setPublicSpaces] = useState<PublishedSpace[]>([]);

  // Load profile if authenticated
  useEffect(() => {
    if (!authLoading && user) {
      setLoadingProfile(true);
      getProfile(user.uid)
        .then((data) => {
          if (data) setProfile(data as Profile);
        })
        .catch(() => {
          console.log("Profile load failed");
        })
        .finally(() => {
          setLoadingProfile(false);
        });
    }
  }, [user, authLoading]);

  // Load public spaces
  useEffect(() => {
    getPublicSpaces(8)
      .then((data) => {
        setPublicSpaces(data || []);
      })
      .catch(() => {
        console.log("Public spaces load failed");
      });
  }, []);

  const handleProtectedAction = (path: string) => {
    if (!user) {
      toast.error("Please sign in to access this feature");
      navigate("/auth");
      return;
    }
    if (user && (!profile?.college || !profile?.stream)) {
      navigate("/onboarding");
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen gradient-subtle flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 gradient-hero rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              PassItQuick
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        {user ? (
          <>
            <h2 className="text-4xl font-bold mb-2">
              Welcome back,{" "}
              {profile?.fullName?.split(" ")[0] ||
                "Student"}
              👋
            </h2>
            <p className="text-muted-foreground mb-6">
              {profile?.stream && profile?.college
                ? `${profile.stream} • ${profile.college}`
                : "Complete your profile to get personalized content"}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-2">
              Welcome to PassItQuick 🚀
            </h2>
            <p className="text-muted-foreground mb-6">
              Discover study materials and resources from students across India
            </p>
          </>
        )}

        <div className="flex justify-center gap-4">
          {/* Explore Courses is always public */}
          <Button variant="hero" onClick={() => navigate("/courses")}>
            Explore Courses
          </Button>

          {user ? (
            <Button
              variant="outline"
              onClick={() => handleProtectedAction("/my-space")}
            >
              Go to My Space
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In for My Space
            </Button>
          )}
        </div>
      </section>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 pb-12 grid md:grid-cols-3 gap-8 flex-grow">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold mb-2">Available Tools</h3>

          {/* Courses Card */}
          <Card
            className="glass-card shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group"
            onClick={() => navigate("/courses")}
          >
            <CardHeader>
              <div className="p-3 gradient-hero rounded-xl w-fit mb-2 group-hover:scale-110 transition-smooth">
                <Library className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Explore Courses</CardTitle>
              <CardDescription>
                Browse study materials tailored for different streams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full">
                View Courses →
              </Button>
            </CardContent>
          </Card>

          {/* My Space Card */}
          <Card
            className={`glass-card shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group ${
              !user ? "opacity-75" : ""
            }`}
            onClick={() => handleProtectedAction("/my-space")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-2 group-hover:scale-110 transition-smooth">
                  <Library className="w-6 h-6 text-primary" />
                </div>
                {!user && <Lock className="w-5 h-5 text-muted-foreground" />}
              </div>
              <CardTitle>My Space</CardTitle>
              <CardDescription>
                {user
                  ? "Upload and organize your own content"
                  : "Sign in to upload and organize your content"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full">
                {user ? "Go to My Space →" : "Sign In Required →"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Profile or Sign Up */}
          {user ? (
            <Card
              className="glass-card shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group"
              onClick={() => navigate("/profile")}
            >
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-xl w-fit mb-2 group-hover:scale-110 transition-smooth">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Profile & Settings</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  View Profile →
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card
              className="glass-card shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group"
              onClick={() => navigate("/auth")}
            >
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-xl w-fit mb-2 group-hover:scale-110 transition-smooth">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to unlock all features</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Sign Up →
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Start */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Jump into action right away</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-4 text-sm">
                {user && profile?.stream
                  ? `Start exploring courses for ${profile.stream} or upload your notes.`
                  : "Start exploring courses for your stream or sign up to upload notes."}
              </p>
              <Button
                variant="hero"
                className="w-full"
                onClick={() => navigate("/courses")}
              >
                {user && profile?.stream
                  ? `Browse ${profile.stream} Courses`
                  : "Browse All Courses"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Discover Section */}
      <section className="border-t bg-white/30 dark:bg-card/20 backdrop-blur-md py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Discover Top Spaces</h3>
            <Button variant="ghost" onClick={() => navigate("/discover")}>
              See All →
            </Button>
          </div>

          {publicSpaces.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No public spaces available yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {publicSpaces.map((space) => (
                <Card
                  key={space.id}
                  className="glass-card hover:shadow-glow transition-smooth cursor-pointer"
                  onClick={() => navigate(`/view/${space.id}`)}
                >
                  {space.thumbnailUrl && (
                    <img
                      src={space.thumbnailUrl}
                      alt={space.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">
                      {space.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {space.ownerDisplayName} • {space.viewCount} views
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
