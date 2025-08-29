import { Toaster } from "@/components/ui/sonner";
import About from "./components/About";
import Background from "./components/Background";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Skills from "./components/Skills";
import ThemeProvider from "./components/ThemeProvider";
import Languages from "./components/Languages";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <Background />
        <div className="relative z-10">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experiences />
            <Languages />
            <Certifications />
            <Contact />
          </main>
          <Toaster />

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
