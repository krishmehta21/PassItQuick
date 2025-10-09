import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 gradient-hero rounded-3xl shadow-glow">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
            PassItQuick
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your ultimate academic companion for quick access to study materials, important topics, and resources
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Navigate to dashboard instead of auth */}
            <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
              Explore Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-6 shadow-elegant hover:shadow-glow transition-smooth text-center animate-scale-in">
            <div className="p-3 gradient-hero rounded-xl w-fit mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Curated Materials</h3>
            <p className="text-muted-foreground">
              Access handpicked study materials, notes, and resources for your courses
            </p>
          </div>

          <div className="glass-card p-6 shadow-elegant hover:shadow-glow transition-smooth text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaborative Learning</h3>
            <p className="text-muted-foreground">
              Share and discover materials uploaded by fellow students
            </p>
          </div>

          <div className="glass-card p-6 shadow-elegant hover:shadow-glow transition-smooth text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="p-3 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Stream-Specific</h3>
            <p className="text-muted-foreground">
              Tailored content for CSE, ECE, ME, IT, and other BTech streams
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="glass-card max-w-2xl mx-auto p-8 shadow-elegant">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your exams?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of BTech students using PassItQuick to access quality study materials
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
            Start Exploring Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
