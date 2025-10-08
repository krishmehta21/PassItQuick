import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setProfile } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getIdToken } from "firebase/auth";

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

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState("");
  const [stream, setStream] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!college || !stream) {
      toast.error("Please select both college and stream");
      return;
    }

    if (!user) {
      toast.error("User not found. Please sign in again.");
      navigate("/auth");
      return;
    }

    setLoading(true);

    try {
      // Ensure we have the latest user info (especially displayName)
      await user.reload();
      const token = await getIdToken(user, true); // force refresh

      const fullName = user.displayName || "User";

      const profileData = {
        college,
        stream,
        fullName,
      };

      console.log("Saving profile data:", profileData);

      await setProfile(user.uid, profileData);

      toast.success("Profile updated successfully!");
      // Small delay ensures Firestore and AuthContext sync before dashboard load
      setTimeout(() => navigate("/dashboard"), 300);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card shadow-elegant animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 gradient-hero rounded-2xl shadow-glow w-fit">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>Tell us about your academic background</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Select value={college} onValueChange={setCollege}>
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
              <Select value={stream} onValueChange={setStream}>
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

            <Button type="submit" className="w-full" variant="hero" disabled={loading}>
              {loading ? "Saving..." : "Continue to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
