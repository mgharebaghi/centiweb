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

  const btn_class =
    "w-full py-3 px-6 rounded-md transition duration-300 text-slate-300 bg-transparent hover:bg-slate-700 hover:text-slate-100 border border-slate-300 hover:border-slate-300 flex items-center justify-center font-light tracking-wide";

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const particleVariants = {
    animate: (i: number) => ({
      x: Math.sin(i * 0.5) * 20,
      y: Math.cos(i * 0.5) * 20,
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const blockPatternVariants = {
    animate: (i: number) => ({
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: Math.random() * 15 + 15,
        repeat: Infinity,
        ease: "linear",
      },
    }),
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-slate-300 flex items-center relative overflow-hidden font-sans pt-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-slate-600 rounded-md"
            style={{
              width: Math.random() * 30 + 20,
              height: Math.random() * 30 + 20,
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
            }}
            variants={blockPatternVariants}
            animate="animate"
            custom={i}
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>
      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.div variants={blockVariants} className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Centichain Logo"
              width={300}
              height={300}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            />
          </motion.div>

          <motion.div variants={blockVariants}>
            <Typography
              variant="h2"
              fontWeight="light"
              className="text-center mb-8 text-slate-100 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Revolutionizing Decentralization
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants} className="">
            <TypeAnimation
              sequence={[
                "Simplicity for All",
                2800,
                "Affordable Participation",
                2800,
                "Eco-Friendly Operation",
                2800,
                "Equitable and Ethical",
                2800,
                "Innovative Consensus",
                2800,
              ]}
              wrapper="div"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl md:text-3xl text-center h-20 tracking-wide text-green-300 font-bold"
            />
          </motion.div>

          <motion.div variants={blockVariants} className="mb-12">
            <Typography variant="h6" className="text-center text-slate-300 font-light tracking-wide text-sm sm:text-base md:text-lg">
              Empowering everyone with accessible, efficient, and sustainable blockchain technology
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/download" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={btn_class}>
                  <FaDownload className="mr-2" /> Get Started
                </Button>
              </Link>
              <Link href="/articles/670cee159914a8bf6e60fb18" passHref className="w-full sm:w-auto">
                <Button variant="outlined" className={btn_class}>
                  <FaBookOpen className="mr-2" /> Explore More
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
