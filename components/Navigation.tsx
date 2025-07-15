"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show navigation based on scroll direction
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Track active section
      const sections = ["about", "projects", "contact-final"];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { 
      href: "#about", 
      label: "Sobre mí", 
      number: "01",
      description: "Historia personal"
    },
    { 
      href: "#projects", 
      label: "Proyectos", 
      number: "02",
      description: "Portfolio digital"
    },
    { 
      href: "#contact-final", 
      label: "Contacto", 
      number: "03",
      description: "Conversemos"
    },
    { 
      href: "/blog", 
      label: "Blog", 
      number: "04",
      description: "Artículos técnicos",
      isExternal: true
    }
  ];

  return (
    <motion.nav
      className="fixed top-1/2 right-8 -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 100 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Vertical line indicator */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B4A7D6] to-transparent transform -translate-x-1/2" />
      
      {/* Navigation items */}
      <div className="relative space-y-8">
        {navItems.map((item, index) => {
          const isActive = item.isExternal 
            ? currentPath.startsWith(item.href)
            : activeSection === item.href.substring(1);
          const isHovered = hoveredItem === item.href;
          
          return (
            <motion.div
              key={item.href}
              className="relative flex items-center justify-end group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Label que aparece en hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute right-16 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-[#B4A7D6]/20">
                      <div className="text-right">
                        <p className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-1">
                          {item.label}
                        </p>
                        <p className="font-script text-sm text-[#322F68] italic">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Arrow pointer */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/90 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation dot */}
              {item.isExternal ? (
                <Link href={item.href} passHref legacyBehavior>
                  <motion.a
                    className="nav-link-fade relative w-6 h-6 rounded-full border-2 border-[#6667AB] bg-[#F6F4F9] cursor-pointer overflow-hidden group shadow-cinematic"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: isActive ? "#6667AB" : "#F6F4F9"
                    }}
                  >
                {/* Active state indicator */}
                <motion.div
                  className="absolute inset-0 bg-[#6667AB] rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0 }}
                  transition={{ type: "spring", damping: 20 }}
                />
                
                {/* Number indicator */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                  style={{ 
                    color: isActive ? "white" : "#6667AB" 
                  }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "#ffffff" : "#6667AB"
                  }}
                >
                  {item.number}
                </motion.span>

                {/* Hover ripple effect */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-[#E4C7D6] rounded-full"
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
                  </motion.a>
                </Link>
              ) : (
                <motion.a
                  href={item.href}
                  className="nav-link-fade relative w-6 h-6 rounded-full border-2 border-[#6667AB] bg-[#F6F4F9] cursor-pointer overflow-hidden group shadow-cinematic"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    backgroundColor: isActive ? "#6667AB" : "#F6F4F9"
                  }}
                >
                  {/* Active state indicator */}
                  <motion.div
                    className="absolute inset-0 bg-[#6667AB] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ type: "spring", damping: 20 }}
                  />
                  
                  {/* Number indicator */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                    style={{ 
                      color: isActive ? "white" : "#6667AB" 
                    }}
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? "#ffffff" : "#6667AB"
                    }}
                  >
                    {item.number}
                  </motion.span>

                  {/* Hover ripple effect */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#E4C7D6] rounded-full"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.a>
              )}

              {/* Progress indicator line */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-[#6667AB]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar at bottom */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-16 h-1 bg-[#D9D7EC] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6667AB] to-[#E4C7D6]"
            initial={{ width: "0%" }}
            animate={{ 
              width: activeSection === "about" ? "25%" : 
                     activeSection === "projects" ? "50%" : 
                     activeSection === "contact-final" ? "75%" : 
                     currentPath.startsWith("/blog") ? "100%" : "0%"
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Floating design elements */}
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              className="absolute -left-8 top-4 w-2 h-2 bg-[#E4C7D6] rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 1.2 }}
            />
            <motion.div
              className="absolute -left-6 bottom-8 w-1 h-1 bg-[#B4A7D6] rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 1.4 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;