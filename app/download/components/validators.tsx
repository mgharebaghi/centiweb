import { Container, Typography, Box, Button, Tooltip, Card, CardContent } from "@mui/material";
import { SiApple, SiLinux, SiWindows } from "react-icons/si";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronDown, FaDownload, FaInfoCircle } from "react-icons/fa";

function Validators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const scrollToRelay = () => {
    const relayElement = document.getElementById('relay-section');
    if (relayElement) {
      relayElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadOptions = [
    {
      icon: SiWindows,
      text: "Windows",
      link: "https://centichain.org/downloads/updates/windows/x64/v0.9.0/Centichain_0.9.0_x64_en-US.msi",
      available: true,
      requirements: "Windows 10 or later, 64-bit processor required",
      size: "15 MB"
    },
    {
      icon: SiApple,
      text: "macOS",
      link: "#",
      available: false,
      requirements: "macOS 11 (Big Sur) or later versions",
      size: "Coming soon"
    },
    {
      icon: SiLinux,
      text: "Linux",
      link: "#",
      available: false,
      requirements: "Ubuntu 20.04 LTS or newer distributions",
      size: "Coming soon"
    }
  ];

  return (
    <div id="validator-section" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center">
      <Container maxWidth="lg" className="py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/images/Logo.png"
                  alt="Centichain Logo"
                  width={120}
                  height={120}
                  className="animate-pulse"
                  priority
                />
                <div className="absolute -inset-2 bg-gray-800/20 rounded-full blur-xl" />
              </div>
            </div>
            <Typography variant="h2" className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              Become a Centichain Validator
            </Typography>
            <Typography variant="h6" className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Participate in securing the future of blockchain technology. As a validator, you'll help verify transactions, maintain network integrity, and earn rewards for your contribution.
            </Typography>
          </motion.div>

          {/* Download Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {downloadOptions.map((option, index) => (
              <Card 
                key={index}
                className="bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <option.icon size={36} className="text-gray-300" />
                    <div>
                      <Typography variant="h6" className="text-gray-100 font-semibold">
                        {option.text}
                      </Typography>
                      <Typography variant="caption" className="text-gray-400 font-medium">
                        {option.size}
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="body2" className="text-gray-400 text-sm leading-relaxed">
                    {option.requirements}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!option.available}
                    href={option.available ? option.link : undefined}
                    className={`${option.available ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800'} normal-case transition-colors duration-300 font-medium`}
                    startIcon={option.available ? <FaDownload /> : <FaInfoCircle />}
                  >
                    {option.available ? 'Download Now' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Info Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <Typography variant="body1" className="text-gray-400">
              Latest Release: <span className="text-gray-300 font-semibold">Version 0.9.0</span>
            </Typography>
            
            <div className="flex justify-center">
              <Button
                onClick={scrollToRelay}
                variant="outlined"
                className="border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors duration-300 font-medium"
                endIcon={<FaChevronDown />}
              >
                Discover Relay Node Opportunities
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export default Validators;
