import { Container, Typography, Box, Button, Tooltip } from "@mui/material";
import { SiApple, SiLinux, SiWindows } from "react-icons/si";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaServer, FaChevronDown } from "react-icons/fa";

function Validators() {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  const scrollToRelay = () => {
    const relayElement = document.getElementById('relay-section');
    if (relayElement) {
      relayElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="validator-section">
      <Box className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <Container maxWidth="lg" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <Image
                src="/images/logo.png"
                alt="Centichain Logo"
                width={150}
                height={150}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
              />
            </div>
            <Typography variant="h2" className="text-gray-100 mb-2 sm:mb-3 md:mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Download Centichain Validator
            </Typography>
            <Typography variant="h5" className="text-gray-400 mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg md:text-xl lg:text-2xl">
              Choose your operating system
            </Typography>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: SiWindows, text: "Windows", link: "#" },
              { icon: SiApple, text: "Mac", link: "#" },
              { icon: SiLinux, text: "Linux", link: "#" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="contained"
                  href={item.link}
                  className="w-full py-4 sm:py-5 md:py-6 px-2 sm:px-3 md:px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out flex flex-col items-center justify-center"
                  disabled
                  style={{ opacity: 0.7 }}
                >
                  <item.icon size={32} color="white" className="mb-2 sm:mb-3" />
                  <span className="text-gray-100 text-lg sm:text-xl font-semibold">{item.text}</span>
                  <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300 font-bold">(Coming Soon)</span>
                </Button>
              </motion.div>
            ))}
          </div>
          
          <Typography variant="body2" className="text-gray-500 mt-8 sm:mt-10 md:mt-12 mb-2 sm:mb-3">
            Version 0.9.2
          </Typography>
          <Typography variant="body2" className="text-gray-400 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
            By running a Validator Node, you help secure the network and earn rewards.
          </Typography>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-2 sm:mt-3 md:mt-4"
          >
            <Tooltip title="Click to scroll" placement="top" arrow>
              <Button
                variant="contained"
                onClick={scrollToRelay}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg text-sm sm:text-base"
                startIcon={<FaChevronDown />}
              >
                Set Up Relay Node
              </Button>
            </Tooltip>
          </motion.div>
        </Container>
      </Box>
    </div>
  );
}

export default Validators;
