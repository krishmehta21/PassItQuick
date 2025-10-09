import { useMemo, useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff, BookOpen, GraduationCap, Loader2 } from "lucide-react";
import { z } from "zod";

/**
 * Schema
 */
const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
});

/**
 * Helper: Map Firebase Auth error codes to friendlier copy
 */
function mapAuthError(code: string, fallback: string) {
  if (!code) return fallback;
  if (code.includes("email-already-in-use")) return "Email already in use";
  if (code.includes("invalid-email")) return "Invalid email address";
  if (code.includes("weak-password")) return "Password is too weak";
  if (code.includes("operation-not-allowed"))
    return "Email/Password sign-in is not enabled in Firebase Console.";
  if (code.includes("user-not-found")) return "No user found with that email";
  if (code.includes("wrong-password")) return "Incorrect password";
  if (code.includes("too-many-requests"))
    return "Too many attempts. Please try again later.";
  return fallback;
}

/**
 * Component
 */
const Auth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  // IDs for ARIA links
  const ids = useMemo(
    () => ({
      signinEmail: "signin-email",
      signinPassword: "signin-password",
      signupName: "signup-name",
      signupEmail: "signup-email",
      signupPassword: "signup-password",
      passwordHelp: "password-help",
      errorRegion: "form-error",
    }),
    []
  );

  // ---------------- Email/Password Sign-Up ----------------
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const validated = authSchema.parse({
        ...formData,
        fullName: formData.fullName || undefined,
      });

      const userCred = await createUserWithEmailAndPassword(
        auth,
        validated.email,
        validated.password
      );

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
        const msg = error.errors[0]?.message || "Validation failed";
        setErrMsg(msg);
        toast.error(msg);
      } else if (error?.code) {
        const msg = mapAuthError(error.code, "Failed to sign up");
        setErrMsg(msg);
        toast.error(msg);
      } else {
        const msg = error?.message || "Failed to sign up";
        setErrMsg(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Email/Password Sign-In ----------------
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const validated = authSchema.pick({ email: true, password: true }).parse({
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
        const msg = error.errors[0]?.message || "Validation failed";
        setErrMsg(msg);
        toast.error(msg);
      } else if (error?.code) {
        const msg = mapAuthError(error.code, "Failed to sign in");
        setErrMsg(msg);
        toast.error(msg);
      } else {
        const msg = error?.message || "Failed to sign in";
        setErrMsg(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google Sign-In ----------------
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    setErrMsg("");
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
      const msg = error?.message || "Failed to sign in with Google";
      setErrMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Continue as Guest ----------------
  const handleContinueAsGuest = () => {
    toast("Continuing as guest. Some features require sign-in.");
    navigate("/dashboard");
  };

  const PasswordToggle = ({
    inputId,
  }: {
    inputId: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-0 top-0"
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-controls={inputId}
      aria-pressed={showPassword}
      onClick={() => setShowPassword((s) => !s)}
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Hero Section */}
        <section className="hidden lg:flex flex-col justify-center space-y-8 rounded-3xl p-10 bg-[linear-gradient(135deg,rgba(99,102,241,0.12)_0%,rgba(56,189,248,0.12)_100%)] border border-border/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary shadow-[0_0_40px_-10px_theme(colors.primary.DEFAULT)]">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              PassItQuick
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold">
            Your Academic Companion
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            Quick access to study materials, important topics, and YouTube resources tailored for BTech students across India, curated to save time before exams. 
          </p>

          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm">Access curated study materials</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm">Collaborate with fellow students</p>
            </div>
          </div>
        </section>

        {/* Auth Card */}
        <Card className="glass-card shadow-lg border-border/60">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Create an account or sign in to continue
            </CardDescription>
          </CardHeader>

          {/* Inline error region (mirrors toast) */}
          {errMsg ? (
            <div
              id={ids.errorRegion}
              role="alert"
              aria-live="polite"
              className="mx-6 mb-2 rounded-md border border-destructive/30 bg-destructive/5 text-destructive px-3 py-2 text-sm"
            >
              {errMsg}
            </div>
          ) : null}

          <CardContent>
            <Tabs
              defaultValue="signin"
              value={tab}
              onValueChange={(v) => setTab(v as typeof tab)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={ids.signinEmail}>Email</Label>
                    <Input
                      id={ids.signinEmail}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={ids.signinPassword}>Password</Label>
                      <span
                        id={ids.passwordHelp}
                        className="text-xs text-muted-foreground"
                      >
                        6+ characters recommended
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        id={ids.signinPassword}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        aria-describedby={ids.passwordHelp}
                        spellCheck={false}
                        autoComplete="current-password"
                        required
                      />
                      <PasswordToggle inputId={ids.signinPassword} />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="default"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 mt-2"
                    onClick={handleSignInWithGoogle}
                    disabled={loading}
                  >
                    <img
                      src="/icons/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>
                      {loading ? "Signing in..." : "Sign in with Google"}
                    </span>
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={ids.signupName}>Full Name</Label>
                    <Input
                      id={ids.signupName}
                      type="text"
                      autoComplete="name"
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={ids.signupEmail}>Email</Label>
                    <Input
                      id={ids.signupEmail}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="your.email@college.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={ids.signupPassword}>Password</Label>
                      <span
                        id={ids.passwordHelp}
                        className="text-xs text-muted-foreground"
                      >
                        Use at least 6 characters
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        id={ids.signupPassword}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        aria-describedby={ids.passwordHelp}
                        spellCheck={false}
                        autoComplete="new-password"
                        required
                      />
                      <PasswordToggle inputId={ids.signupPassword} />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="default"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 mt-2"
                    onClick={handleSignInWithGoogle}
                    disabled={loading}
                  >
                    <img
                      src="/icons/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>
                      {loading ? "Signing in..." : "Sign up with Google"}
                    </span>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Continue as Guest */}
            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={handleContinueAsGuest}
                disabled={loading}
              >
                Continue without signing in
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 items-center justify-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
