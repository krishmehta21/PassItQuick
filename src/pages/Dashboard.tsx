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
  rating: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [publicSpaces, setPublicSpaces] = useState<PublishedSpace[]>([]);

  useEffect(() => {
    if (!authLoading && user) {
      getProfile(user.uid)
        .then((data) => data && setProfile(data as Profile))
        .catch(() => console.log("Profile load failed"));
    }
  }, [user, authLoading]);

  useEffect(() => {
    getPublicSpaces(4, true)
      .then((data) => setPublicSpaces(data || []))
      .catch(() => console.log("Top-rated public spaces load failed"));
  }, []);

  const handleProtectedAction = (path: string) => {
    if (!user) {
      toast.error("Sign in required");
      navigate("/auth");
      return;
    }
    if (!profile?.college || !profile?.stream) {
      navigate("/onboarding");
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen gradient-subtle flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 gradient-hero rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              PassItQuick
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-1" />
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
      <section className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1">
          {user ? `Welcome back, ${profile?.fullName?.split(" ")[0] || "Student"} 👋` : "Welcome to PassItQuick 🚀"}
        </h2>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
          {user
            ? profile?.stream && profile?.college
              ? `${profile.stream} • ${profile.college}`
              : "Complete your profile for personalized content"
            : "Discover study materials from students across India"}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Button variant="hero" onClick={() => navigate("/courses")}>Explore Courses</Button>
          <Button variant="outline" onClick={() => user ? handleProtectedAction("/my-space") : navigate("/auth")}>
            {user ? "Go to My Space" : "Sign In for My Space"}
          </Button>
        </div>
      </section>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 pb-12 grid md:grid-cols-3 gap-6 flex-grow">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold mb-2 text-center md:text-left">Available Tools</h3>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible py-2">
            {/* Courses Card */}
            <Card
              className="glass-card shadow-elegant hover:shadow-glow cursor-pointer w-full flex-shrink-0"
              onClick={() => navigate("/courses")}
            >
              <CardHeader>
                <div className="p-3 gradient-hero rounded-xl w-fit mb-1">
                  <Library className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Explore Courses</CardTitle>
                <CardDescription className="text-sm">Browse study materials by stream</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">View Courses →</Button>
              </CardContent>
            </Card>

            {/* My Space Card */}
            <Card
              className={`glass-card shadow-elegant hover:shadow-glow cursor-pointer w-full flex-shrink-0 ${!user ? "opacity-75" : ""}`}
              onClick={() => handleProtectedAction("/my-space")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-1">
                    <Library className="w-5 h-5 text-primary" />
                  </div>
                  {!user && <Lock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <CardTitle>My Space</CardTitle>
                <CardDescription className="text-sm">{user ? "Upload & organize content" : "Sign in to use"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">{user ? "Go to My Space →" : "Sign In →"}</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 flex flex-col items-center sm:items-stretch">
          <Card className="glass-card shadow-elegant hover:shadow-glow w-full cursor-pointer" onClick={() => navigate(user ? "/profile" : "/auth")}>
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-xl w-fit mb-1">
                <User className="w-5 h-5 text-accent" />
              </div>
              <CardTitle>{user ? "Profile & Settings" : "Create Account"}</CardTitle>
              <CardDescription className="text-sm">{user ? "Manage your account" : "Sign up to unlock features"}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full">{user ? "View Profile →" : "Sign Up →"}</Button>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="glass-card w-full">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription className="text-sm">Jump into action</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-muted-foreground mb-2 text-sm text-center sm:text-left">
                {user && profile?.stream
                  ? `Explore courses for ${profile.stream} or upload notes.`
                  : "Explore courses or sign up to upload notes."}
              </p>
              <Button variant="hero" className="w-full" onClick={() => navigate("/courses")}>
                {user && profile?.stream ? `Browse ${profile.stream}` : "Browse All"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Discover Section */}
      <section className="border-t bg-white/30 dark:bg-card/20 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
            <h3 className="text-xl font-semibold">Discover Top Spaces</h3>
            <Button variant="ghost" onClick={() => handleProtectedAction("/discover")}>See All →</Button>
          </div>
          {publicSpaces.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">No top-rated spaces yet.</p>
          ) : (
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible py-2">
              {publicSpaces.map((space) => (
                <Card
                  key={space.id}
                  className="glass-card hover:shadow-glow cursor-pointer flex-shrink-0 w-full min-w-[180px] sm:min-w-0 relative"
                  onClick={() => user ? navigate(`/view/${space.id}`) : (toast.error("Sign in required"), navigate("/auth"))}
                >
                  {space.thumbnailUrl && (
                    <img src={space.thumbnailUrl} alt={space.title} className="w-full h-24 object-cover rounded-t-lg" />
                  )}
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm line-clamp-1">{space.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {space.ownerDisplayName} • {space.viewCount} views
                    </CardDescription>
                  </CardHeader>
                  {!user && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  )}
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
