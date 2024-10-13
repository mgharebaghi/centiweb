import { Container, Typography, Box, Button, Snackbar, Tooltip } from "@mui/material";
import { FaCopy } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

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

  return (
    <Box className="bg-gray-800 min-h-[500px] flex items-center justify-center py-12">
      <Container maxWidth="md" className="text-center">
        <Typography variant="h2" className="text-gray-100 mb-8 font-bold">
          Run a Centichain Relay Node
        </Typography>
        <Typography variant="h5" className="text-gray-400 mb-12">
          Maximize Your Earnings with Centichain&apos;s Relay Node
        </Typography>
        <Box className="flex justify-center mb-8">
          <Image
            src="/images/ubuntu.png"
            alt="centichain relay ubuntu"
            width={100}
            height={100}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Box>
        <Typography variant="body1" className="text-gray-300 mb-6">
          Copy this command into your Ubuntu server:
        </Typography>
        <Box className="bg-gray-700 p-4 rounded-lg mb-6 flex items-center justify-between overflow-x-auto">
          <Tooltip title="Click to copy" placement="top" arrow>
            <Typography 
              variant="body2" 
              className="text-gray-200 font-mono mr-4 cursor-pointer"
              onClick={copyToClipboard}
            >
              {relayCmd}
            </Typography>
          </Tooltip>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 min-w-[100px]"
            onClick={copyToClipboard}
            startIcon={<FaCopy />}
          >
            Copy
          </Button>
        </Box>
        <Typography variant="body2" className="text-gray-500 mt-12">
          Version 1.0.0
        </Typography>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Command copied to clipboard!"
      />
    </Box>
  );
}

export default Relay;
