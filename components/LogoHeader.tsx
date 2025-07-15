import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const LogoHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Mouse position for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  // Parallax transforms
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, lastScrollY]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -100 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative inline-block"
          style={{ scale: logoScale, opacity: logoOpacity }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Interactive background glow */}
          <motion.div
            className="absolute -inset-8 rounded-full opacity-0"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            style={{
              background: "radial-gradient(circle, #6667AB 0%, transparent 70%)",
              filter: "blur(20px)",
              x: springX,
              y: springY
            }}
          />

          {/* Main logo composition */}
          <motion.div
            className="relative cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Geometric shapes representing code structure */}
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              className="relative z-10"
            >
              {/* Background circuit pattern */}
              <motion.g opacity="0.1">
                <path
                  d="M0,40 L20,40 M30,40 L50,40 M60,40 L80,40"
                  stroke="#6667AB"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <circle cx="25" cy="40" r="2" fill="#6667AB" />
                <circle cx="55" cy="40" r="2" fill="#6667AB" />
                <circle cx="85" cy="40" r="2" fill="#6667AB" />
              </motion.g>

              {/* Animated brackets representing code */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.text
                  x="10"
                  y="50"
                  className="font-mono text-3xl fill-[#6667AB]"
                  animate={{
                    opacity: isHovered ? [0.5, 1, 0.5] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0
                  }}
                >
                  {"{"}
                </motion.text>
                
                <motion.text
                  x="180"
                  y="50"
                  className="font-mono text-3xl fill-[#6667AB]"
                  animate={{
                    opacity: isHovered ? [0.5, 1, 0.5] : 1
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: isHovered ? Infinity : 0
                  }}
                >
                  {"}"}
                </motion.text>
              </motion.g>

              {/* Name with creative typography */}
              <motion.g>
                {/* "I" - represented as a minimalist line with dot */}
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <line
                    x1="40"
                    y1="25"
                    x2="40"
                    y2="55"
                    stroke="#322F68"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="40"
                    cy="15"
                    r="3"
                    fill="#6667AB"
                    className={isHovered ? "animate-pulse" : ""}
                  />
                </motion.g>

                {/* "M" - geometric interpretation */}
                <motion.path
                  d="M 55,55 L 55,25 L 70,40 L 85,25 L 85,55"
                  fill="none"
                  stroke="#322F68"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                />

                {/* Creative separator */}
                <motion.circle
                  cx="100"
                  cy="40"
                  r="2"
                  fill="#6667AB"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                />

                {/* "dev" in elegant script */}
                <motion.text
                  x="110"
                  y="48"
                  className="font-script text-2xl fill-[#322F68]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  dev
                </motion.text>

                {/* Design element - floating pixels */}
                {mounted && isHovered && (
                  <>
                    <motion.rect
                      x="150"
                      y="30"
                      width="4"
                      height="4"
                      fill="#E4C7D6"
                      animate={{
                        y: [30, 25, 30],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    <motion.rect
                      x="160"
                      y="45"
                      width="4"
                      height="4"
                      fill="#D9D7EC"
                      animate={{
                        y: [45, 40, 45],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity
                      }}
                    />
                    <motion.rect
                      x="170"
                      y="35"
                      width="4"
                      height="4"
                      fill="#6667AB"
                      animate={{
                        y: [35, 30, 35],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1,
                        repeat: Infinity
                      }}
                    />
                  </>
                )}
              </motion.g>

              {/* Strategic tagline on hover */}
              <motion.text
                x="100"
                y="70"
                textAnchor="middle"
                className="font-serif-display text-xs fill-[#6667AB] italic"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : -10
                }}
                transition={{ duration: 0.3 }}
              >
                código • estrategia • emoción
              </motion.text>
            </svg>

            {/* Interactive particles */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#6667AB] rounded-full"
                    initial={{ opacity: 0 }}
                    animate={isHovered ? {
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: isHovered ? Infinity : 0
                    }}
                    style={{
                      left: "50%",
                      top: "50%"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Signature detail */}
          <motion.div
            className="absolute -bottom-8 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xs text-[#322F68]/60 font-mono tracking-wider">
              STRATEGIC DIGITAL CRAFT
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default LogoHeader;