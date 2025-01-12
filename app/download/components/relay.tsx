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

  return (
    <div id="relay-section">
      <Box className="bg-gray-900 py-12 min-h-screen grid content-center">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="text-gray-100 mb-8 font-bold text-center text-3xl md:text-4xl lg:text-5xl"
          >
            Relay Node Setup
          </Typography>

          <Grid container spacing={4} className="mb-8">
            <Grid item xs={12} md={4}>
              <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                <CardContent className="text-center p-6">
                  <FaNetworkWired className="text-4xl text-blue-400 mx-auto mb-4" />
                  <Typography variant="h6" className="text-gray-100 mb-3">
                    Network Support
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Help maintain network stability and transaction relay efficiency
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                <CardContent className="text-center p-6">
                  <FaServer className="text-4xl text-green-400 mx-auto mb-4" />
                  <Typography variant="h6" className="text-gray-100 mb-3">
                    Easy Setup
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Single command installation for Ubuntu servers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className="bg-gray-800 h-full transform hover:scale-105 transition-transform duration-300 border border-gray-700">
                <CardContent className="text-center p-6">
                  <FaCoins className="text-4xl text-yellow-400 mx-auto mb-4" />
                  <Typography variant="h6" className="text-gray-100 mb-3">
                    Earn Rewards
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Get compensated for supporting the network
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card className="bg-gray-800 mb-8 border border-gray-700">
            <CardContent className="p-6">
              <Typography variant="h6" className="text-gray-100 mb-4 text-center">
                One-Command Installation
              </Typography>
              <Box className="bg-gray-900 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-700">
                <Tooltip title="Click to copy" placement="top" arrow>
                  <Typography
                    variant="body2"
                    className="text-gray-200 font-mono cursor-pointer hover:text-blue-300 transition-colors duration-300 break-all"
                    onClick={copyToClipboard}
                  >
                    {relayCmd}
                  </Typography>
                </Tooltip>
                <Button
                  variant="contained"
                  className="bg-gray-700 hover:bg-gray-600 whitespace-nowrap"
                  onClick={copyToClipboard}
                  startIcon={<FaCopy />}
                >
                  Copy Command
                </Button>
              </Box>
              <Typography variant="caption" className="text-gray-400 block text-center mt-4">
                Current Version: 1.0.0 | Ubuntu Compatible
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="body2" className="text-gray-400 text-center">
            Join the network of relay nodes and help build a more robust blockchain infrastructure
          </Typography>
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
