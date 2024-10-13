import { Container, Typography, Box, Button } from "@mui/material";
import { SiApple, SiLinux, SiWindows } from "react-icons/si";

function Validators() {
  return (
    <Box className="bg-gray-900 min-h-[650px] flex items-center justify-center">
      <Container maxWidth="md" className="text-center">
        <Typography variant="h2" className="text-gray-100 mb-8 font-bold">
          Download Centichain
        </Typography>
        <Typography variant="h5" className="text-gray-400 mb-12">
          Choose your operating system
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: SiWindows, text: "Windows", link: "#" },
            { icon: SiApple, text: "Mac", link: "#" },
            { icon: SiLinux, text: "Linux", link: "#" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="outlined"
              href={item.link}
              className="py-4 px-6 bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 rounded-lg transition duration-300 ease-in-out opacity-50"
              startIcon={<item.icon size={24} color="white"/>}
              disabled
            >
              <span className="text-gray-300">{item.text}</span>
              <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
            </Button>
          ))}
        </div>
        <Typography variant="body2" className="text-gray-500 mt-12">
          Version 0.9.2
        </Typography>
      </Container>
    </Box>
  );
}

export default Validators;
