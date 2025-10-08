import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, setProfile } from "@/integrations/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff, BookOpen, GraduationCap } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  // ---------------- Email/Password Sign-Up ----------------
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = authSchema.parse({
        ...formData,
        fullName: formData.fullName || undefined,
      });

      const userCred = await createUserWithEmailAndPassword(auth, validated.email, validated.password);

      if (formData.fullName) {
        await updateProfile(userCred.user, { displayName: formData.fullName });
      }

      await setProfile(userCred.user.uid, {
        fullName: formData.fullName || "",
        email: validated.email,
        created_at: new Date().toISOString(),
      });

      toast.success("Account created! You have been signed in.");
      navigate("/onboarding");
      setFormData({ email: "", password: "", fullName: "" });
    } catch (error: any) {
      console.error("signUp error:", error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error?.code) {
        const code: string = error.code || "";
        let msg = "Failed to sign up";
        if (code.includes("email-already-in-use")) msg = "Email already in use";
        else if (code.includes("invalid-email")) msg = "Invalid email address";
        else if (code.includes("weak-password")) msg = "Password is too weak";
        else if (code.includes("operation-not-allowed"))
          msg =
            "Email/Password sign-in is not enabled in Firebase Auth. Enable it in the Firebase Console -> Authentication -> Sign-in method.";
        else msg = error.message || msg;
        toast.error(msg);
      } else {
        toast.error(error?.message || "Failed to sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Email/Password Sign-In ----------------
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = authSchema.parse({
        email: formData.email,
        password: formData.password,
      });

      await signInWithEmailAndPassword(auth, validated.email, validated.password);

      toast.success("Welcome back!");
      navigate("/dashboard");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error: any) {
      console.error("signIn error:", error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error?.code) {
        const code: string = error.code || "";
        let msg = "Failed to sign in";
        if (code.includes("user-not-found")) msg = "No user found with that email";
        else if (code.includes("wrong-password")) msg = "Incorrect password";
        else if (code.includes("invalid-email")) msg = "Invalid email address";
        else if (code.includes("too-many-requests")) msg = "Too many attempts. Please try again later.";
        else msg = error.message || msg;
        toast.error(msg);
      } else {
        toast.error(error?.message || "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google Sign-In ----------------
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setProfile(user.uid, {
        fullName: user.displayName || "",
        email: user.email || "",
        created_at: new Date().toISOString(),
      });

      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error?.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden md:flex flex-col space-y-6 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 gradient-hero rounded-2xl shadow-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              PassItQuick
            </h1>
          </div>
          <h2 className="text-3xl font-semibold">Your Academic Companion</h2>
          <p className="text-lg text-muted-foreground">
            Quick access to study materials, important topics, and YouTube resources for BTech students across India.
          </p>
          <div className="flex flex-col space-y-3 pt-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm">Access curated study materials</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm">Collaborate with fellow students</p>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="glass-card shadow-elegant animate-scale-in">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Create an account or sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* ---------------- Sign In ---------------- */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" variant="hero" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                  {/* Google Sign-In Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 mt-2"
                    onClick={handleSignInWithGoogle}
                    disabled={loading}
                  >
                    <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                    <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
                  </Button>
                </form>
              </TabsContent>

              {/* ---------------- Sign Up ---------------- */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" variant="hero" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>

                  {/* Google Sign-Up (same as sign-in) */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 mt-2"
                    onClick={handleSignInWithGoogle}
                    disabled={loading}
                  >
                    <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                    <span>{loading ? "Signing in..." : "Sign up with Google"}</span>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
