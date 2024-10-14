import { Container, Typography, Box, Button, Snackbar, Tooltip } from "@mui/material";
import { FaCopy, FaServer, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import Link from 'next/link';

function Relay() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const relayCmd =
    "wget -N https://centichain.org/downloads/relay-service && chmod 777 relay-service && ./relay-service";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(relayCmd);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const scrollToValidator = () => {
    const validatorSection = document.getElementById('validator-section');
    if (validatorSection) {
      validatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="relay-section" className="h-screen flex flex-col justify-center">
      <Box className="bg-gradient-to-b from-gray-900 to-gray-800 h-full flex items-center">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h2" className="text-gray-100 mb-4 sm:mb-6 md:mb-8 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Run a Centichain Relay Node
          </Typography>
          <Typography variant="h5" className="text-gray-300 mb-6 sm:mb-8 md:mb-12 text-base sm:text-lg md:text-xl lg:text-2xl">
            Maximize Your Earnings and Support the Network
          </Typography>
          <Box className="flex justify-center mb-6 sm:mb-8 md:mb-12">
            <FaServer className="text-4xl sm:text-5xl md:text-6xl text-blue-400 animate-pulse" />
          </Box>
          <Typography variant="body1" className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
            To set up your Relay Node, run this command on your Ubuntu server:
          </Typography>
          <Box className="bg-gray-700 p-2 sm:p-3 md:p-4 rounded-lg mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between overflow-x-auto shadow-lg">
            <Tooltip title="Click to copy" placement="top" arrow>
              <Typography 
                variant="body2" 
                className="text-gray-200 font-mono mb-2 sm:mb-0 sm:mr-4 cursor-pointer hover:text-blue-300 transition-colors duration-300 text-xs sm:text-sm md:text-base break-all"
                onClick={copyToClipboard}
              >
                {relayCmd}
              </Typography>
            </Tooltip>
            <Button
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 min-w-[100px] mt-2 sm:mt-0"
              onClick={copyToClipboard}
              startIcon={<FaCopy />}
            >
              Copy
            </Button>
          </Box>
          <Typography variant="body2" className="text-gray-400 mt-6 sm:mt-8 md:mt-12 text-xs sm:text-sm">
            Relay Node Version: 1.0.0
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-2 sm:mt-4 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
            By running a Relay Node, you contribute to the network's stability and earn rewards.
          </Typography>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg text-sm sm:text-base"
            onClick={scrollToValidator}
            startIcon={<FaChevronUp />}
          >
            Set Up Validator Node
          </Button>
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Command copied to clipboard!"
        ContentProps={{
          className: 'bg-blue-600 text-white'
        }}
      />
    </div>
  );
}

export default Relay;
