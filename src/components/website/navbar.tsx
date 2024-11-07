import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Home, Box, Building, X } from "lucide-react";
import { useState, useEffect } from "react";

// Tooltip Component
const Tooltip = ({ children, label }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded shadow-lg z-50">
          {label}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const navigationItems = [
    { title: "Home", href: "/", icon: <Home /> },
    { title: "Product", icon: <Box /> },
    { title: "Company", icon: <Building /> },
  ];

  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // For hiding/showing the navbar

  let lastScrollY = 0; // Keeps track of the last scroll position

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollY = window.scrollY; // Update last scroll position
  };

  const handleMouseMove = (e: { clientY: number; }) => {
    if (e.clientY < 50) {
      // Mouse is at the top of the screen
      setIsVisible(true);
    }
  };

  // Attach event listeners on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent shadow-lg hidden lg:block transition-all ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="relative mx-auto flex items-center justify-center py-4 ">
        <div
          className="flex items-center justify-center gap-6 p-2 rounded-lg bg-white/20 shadow-2xl backdrop-blur-sm"
          style={{ zIndex: 100, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
        >
          <NavigationMenu className="flex items-center justify-center">
            <NavigationMenuList className="flex gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink href={item.href} className="flex">
                    <Tooltip label={item.title}>
                      <Button variant="ghost" size="icon" aria-label={item.title}>
                        {item.icon}
                      </Button>
                    </Tooltip>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)} aria-label="Toggle menu" className="lg:hidden">
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-full bg-background shadow-lg rounded-lg lg:hidden">
            <div className="flex flex-col gap-6 p-4">
              {navigationItems.map((item) => (
                <a key={item.title} href={item.href || "#"} className="flex items-center gap-4">
                  <span className="text-lg text-muted-foreground">{item.icon}</span>
                  <span className="text-lg">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
