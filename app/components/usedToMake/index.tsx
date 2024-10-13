import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function Make() {
  const technologies = [
    { name: "Rust", logo: "/images/rust-logo-512x512.png", url: "https://www.rust-lang.org/" },
    { name: "libp2p", logo: "/images/libp2p-logo.png", url: "https://libp2p.io/" },
    { name: "Tauri", logo: "/images/tauri-logo.png", url: "https://tauri.app/" },
    { name: "MongoDB", logo: "/images/mongodb_logo.png", url: "https://www.mongodb.com/" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Box className="min-h-[600px] w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16">
      <Container maxWidth="lg">
        <Typography variant="h2" className="text-center mb-12 text-white font-bold">
          Built With Cutting-Edge Technologies
        </Typography>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={itemVariants}>
              <Link href={tech.url} target="_blank" passHref>
                <Box
                  className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center h-full"
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    width={120}
                    height={120}
                    className="mb-4"
                  />
                  <Typography variant="h6" className="text-center text-white mt-4">
                    {tech.name}
                  </Typography>
                </Box>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
}

export default Make;
