import { ArrowUp, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-xl">Arkar Phyo</h3>
            <p className="text-primary-foreground/80">
              AI Engineer & Software Developer
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <p className="flex items-center text-primary-foreground/80 ">
              Made with{" "}
              <Heart className="h-4 w-4 mx-1 text-red-400 fill-current animate-spin-horizontal" />{" "}
              in Thailand
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors animate-bounce-slow"
              title="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {currentYear} Arkar Phyo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
