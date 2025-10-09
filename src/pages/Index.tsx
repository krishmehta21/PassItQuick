import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24">
        <div className="max-w-3xl">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-primary to-primary-dark shadow-lg inline-block mb-8">
            <GraduationCap className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PassItQuick
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
            Your ultimate academic companion. Access study materials, important topics, and resources quickly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              Explore Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
            >
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16 w-full">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition">
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Materials</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Handpicked study materials, notes, and resources for your courses.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition">
            <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-full mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Learning</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Share and discover materials uploaded by fellow students.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition">
            <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-full mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stream-Specific</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Tailored content for CSE, ECE, ME, IT, and other BTech streams.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 flex justify-center">
        <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your exams?</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Join thousands of BTech students using PassItQuick to access quality study materials.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Start Exploring
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
