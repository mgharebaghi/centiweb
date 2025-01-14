import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Tooltip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { FaCopy, FaServer, FaNetworkWired, FaCoins } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

function Relay() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const relayCmd =
    "wget -N https://centichain.org/downloads/relay-service && chmod 777 relay-service && ./relay-service";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(relayCmd);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

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
        duration: 0.5,
      },
    },
  };

  return (
    <div id="relay-section">
      <Box className="bg-gray-900 py-8 md:py-12 lg:py-16 pt-20 min-h-screen grid content-center">
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8 lg:space-y-12"
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                className="text-gray-100 mb-6 md:mb-8 font-bold text-center text-2xl md:text-4xl lg:text-5xl"
              >
                Relay Node Setup
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Grid container spacing={3} className="mb-6 md:mb-8">
                <Grid item xs={12} sm={6} md={4}>
                  <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                    <CardContent className="text-center p-4 md:p-6">
                      <FaNetworkWired className="text-3xl md:text-4xl text-blue-400 mx-auto mb-3 md:mb-4" />
                      <Typography
                        variant="h6"
                        className="text-gray-100 mb-2 md:mb-3 text-base md:text-lg"
                      >
                        Network Support
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-400 text-sm md:text-base"
                      >
                        Help maintain network stability and transaction relay
                        efficiency
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                    <CardContent className="text-center p-4 md:p-6">
                      <FaServer className="text-3xl md:text-4xl text-green-400 mx-auto mb-3 md:mb-4" />
                      <Typography
                        variant="h6"
                        className="text-gray-100 mb-2 md:mb-3 text-base md:text-lg"
                      >
                        Easy Setup
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-400 text-sm md:text-base"
                      >
                        Single command installation for Ubuntu servers
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                    <CardContent className="text-center p-4 md:p-6">
                      <FaCoins className="text-3xl md:text-4xl text-yellow-400 mx-auto mb-3 md:mb-4" />
                      <Typography
                        variant="h6"
                        className="text-gray-100 mb-2 md:mb-3 text-base md:text-lg"
                      >
                        Earn Rewards
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-400 text-sm md:text-base"
                      >
                        Get compensated for supporting the network
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800 mb-6 md:mb-8 border border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <Typography
                    variant="h6"
                    className="text-gray-100 mb-3 md:mb-4 text-center text-base md:text-lg"
                  >
                    One-Command Installation
                  </Typography>
                  <Box className="bg-gray-900 p-3 md:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 border border-gray-700">
                    <Tooltip title="Click to copy" placement="top" arrow>
                      <Typography
                        variant="body2"
                        className="text-gray-200 font-mono cursor-pointer hover:text-blue-300 transition-colors duration-300 break-all text-sm md:text-base"
                        onClick={copyToClipboard}
                      >
                        {relayCmd}
                      </Typography>
                    </Tooltip>
                    <Button
                      variant="contained"
                      className="bg-gray-700 hover:bg-gray-600 whitespace-nowrap text-sm md:text-base py-1.5 md:py-2"
                      onClick={copyToClipboard}
                      startIcon={<FaCopy />}
                    >
                      Copy Command
                    </Button>
                  </Box>
                  <Typography
                    variant="caption"
                    className="text-gray-400 block text-center mt-3 md:mt-4 text-xs md:text-sm"
                  >
                    Current Version: 1.0.0 | Ubuntu Compatible
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="body2"
                className="text-gray-400 text-center text-sm md:text-base"
              >
                Join the network of relay nodes and help build a more robust
                blockchain infrastructure
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Command copied to clipboard!"
        ContentProps={{
          className: "bg-gray-800 text-white",
        }}
      />
    </div>
  );
}

export default Relay;
