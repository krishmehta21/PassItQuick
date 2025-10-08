import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, setProfile } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const STREAMS = ["CSE", "ECE", "ME", "IT", "EEE", "CE", "Chemical", "Biotech"];
const COLLEGES = [
  "IIT Delhi",
  "IIT Bombay",
  "IIT Madras",
  "NIT Trichy",
  "NIT Warangal",
  "BITS Pilani",
  "VIT Vellore",
  "SRM Chennai",
  "Manipal Institute",
  "Other",
];

interface ProfileData {
  full_name: string;
  email: string;
  college: string;
  stream: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfileState] = useState<ProfileData>({
    full_name: "",
    email: "",
    college: "",
    stream: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.uid);
        if (data) {
          // Firestore profile exists → use it
          setProfileState(data as ProfileData);
        } else {
          // Prefill with Firebase Auth info
          setProfileState({
            full_name: user.displayName || "",
            email: user.email || "",
            college: "",
            stream: "",
          });

          // Optional: auto-save first-time profile to Firestore
          await setProfile(user.uid, {
            full_name: user.displayName || "",
            email: user.email || "",
            college: "",
            stream: "",
          });
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await setProfile(user!.uid, {
        full_name: profile.full_name,
        college: profile.college,
        stream: profile.stream,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle">
      <header className="border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="glass-card shadow-elegant animate-scale-in">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.full_name}
                  onChange={(e) => setProfileState({ ...profile, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Select
                  value={profile.college}
                  onValueChange={(value) => setProfileState({ ...profile, college: value })}
                >
                  <SelectTrigger id="college">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLLEGES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stream">Stream</Label>
                <Select
                  value={profile.stream}
                  onValueChange={(value) => setProfileState({ ...profile, stream: value })}
                >
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Select your stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {STREAMS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="hero" disabled={loading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="destructive" onClick={signOut}>
                  Logout
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
