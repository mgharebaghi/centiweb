import { Container, Typography, Box, Button, Tooltip, Card, CardContent } from "@mui/material";
import { SiApple, SiLinux, SiWindows } from "react-icons/si";
import { motion } from "framer-motion";
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
      link: "https://centichain.org/downloads/updates/windows/x64/v0.12.0/Centichain_0.12.0_x64_en-US.msi",
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
    <div id="validator-section" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center py-6 pt-20 md:py-12 lg:py-16">
      <Container maxWidth="lg" className="px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 lg:space-y-12"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center">
            <Typography variant="h2" className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-100 mb-3 md:mb-4">
              Become a Centichain Validator
            </Typography>
            <Typography variant="h6" className="text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Participate in securing the future of blockchain technology. As a validator, you'll help verify transactions, maintain network integrity, and earn rewards for your contribution.
            </Typography>
          </motion.div>

          {/* Download Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {downloadOptions.map((option, index) => (
              <Card 
                key={index}
                className="bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <option.icon size={28} className="text-gray-300 md:text-[32px] lg:text-[36px]" />
                    <div>
                      <Typography variant="h6" className="text-base md:text-lg lg:text-xl text-gray-100 font-semibold">
                        {option.text}
                      </Typography>
                      <Typography variant="caption" className="text-xs md:text-sm text-gray-400 font-medium">
                        {option.size}
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="body2" className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {option.requirements}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!option.available}
                    href={option.available ? option.link : undefined}
                    className={`${option.available ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800'} normal-case transition-colors duration-300 font-medium text-sm md:text-base py-2 md:py-2.5`}
                    startIcon={option.available ? <FaDownload /> : <FaInfoCircle />}
                  >
                    {option.available ? 'Download Now' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Info Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4 md:space-y-6">
            <Typography variant="body1" className="text-sm md:text-base text-gray-400">
              Latest Release: <span className="text-gray-300 font-semibold">Version 0.12.0</span>
            </Typography>
            
            <div className="flex justify-center">
              <Button
                onClick={scrollToRelay}
                variant="outlined"
                className="border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors duration-300 font-medium text-sm md:text-base py-2 md:py-2.5"
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
