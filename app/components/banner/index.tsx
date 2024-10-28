import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaDownload, FaBookOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Banner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClass = 
    "w-full py-3 px-6 rounded-lg transition-all duration-300 text-slate-200 bg-transparent hover:bg-slate-700/80 hover:text-white border border-slate-300 hover:border-slate-200 flex items-center justify-center font-medium tracking-wide shadow-sm hover:shadow-lg";

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-300 flex items-center relative overflow-hidden font-sans pt-16 px-4 sm:px-6 lg:px-8">
      {/* Enhanced animated network background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30">
          <defs>
            <pattern id="network-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Main nodes */}
              <circle cx="10" cy="10" r="2.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="10" r="2.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="40" cy="40" r="2.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="70" r="2.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
              </circle>

              {/* Secondary nodes */}
              <circle cx="40" cy="10" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="40" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="40" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="25" cy="25" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="55" cy="25" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="25" cy="55" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="55" cy="55" r="1.5" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.6s" repeatCount="indefinite" />
              </circle>
              
              {/* Enhanced connecting lines with faster animations */}
              <line x1="10" y1="10" x2="70" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-dasharray" values="0,60;60,0" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="70" y1="10" x2="40" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="40" y1="40" x2="10" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="10" y1="70" x2="70" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-dasharray" values="0,60;60,0" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.6s" repeatCount="indefinite" />
              </line>
              <line x1="70" y1="70" x2="40" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
                <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.7s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.7s" repeatCount="indefinite" />
              </line>
              
              {/* Additional diagonal connections */}
              <line x1="10" y1="10" x2="70" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5">
                <animate attributeName="stroke-dasharray" values="0,85;85,0" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.2s" repeatCount="indefinite" />
              </line>
              <line x1="70" y1="10" x2="10" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5">
                <animate attributeName="stroke-dasharray" values="0,85;85,0" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.4s" repeatCount="indefinite" />
              </line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-pattern)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container" style={{position: 'relative', width: '100%', height: '100%'}}>
          {Array.from({length: 50}).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-30"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 8 + 6}s linear infinite`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(${Math.random() * 150}px, ${Math.random() * 150}px) rotate(120deg);
          }
          66% {
            transform: translate(${Math.random() * -150}px, ${Math.random() * 150}px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.4, delayChildren: 0.2 } },
          }}
        >
          <motion.div variants={blockVariants} className="flex justify-center">
            <Image
              src="/images/Logo.png"
              alt="Centichain Logo"
              width={300}
              height={300}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
              priority
            />
          </motion.div>

          <motion.div variants={blockVariants}>
            <Typography
              variant="h2"
              fontWeight="bold"
              className="text-center mb-8 text-slate-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
            >
              Revolutionizing Decentralization
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <TypeAnimation
              sequence={[
                "Simplicity for All",
                3000,
                "Affordable Participation",
                3000,
                "Eco-Friendly Operation",
                3000,
                "Equitable and Ethical",
                3000,
                "Innovative Consensus",
                3000,
              ]}
              wrapper="div"
              speed={40}
              repeat={Infinity}
              className="text-2xl sm:text-3xl md:text-4xl text-center h-24 tracking-wide text-green-300 font-bold"
            />
          </motion.div>

          <motion.div variants={blockVariants} className="mb-16">
            <Typography variant="h6" className="text-center text-slate-300 font-light leading-relaxed tracking-wide text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Empowering everyone with accessible, efficient, and sustainable blockchain technology that shapes the future of decentralized systems
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 max-w-2xl mx-auto">
              <Link href="/download" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={buttonClass}>
                  <FaDownload className="mr-3 text-lg" /> Get Started
                </Button>
              </Link>
              <Link href="/articles/671fcec5d136b9550a238077" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={buttonClass}>
                  <FaBookOpen className="mr-3 text-lg" /> Explore More
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
