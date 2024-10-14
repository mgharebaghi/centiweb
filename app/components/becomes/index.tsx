import { Typography, Container, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FaServer, FaShieldAlt } from "react-icons/fa";
import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Becomes() {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        duration: 0.3 
      } 
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  interface CardComponentProps {
    title: string;
    description: string;
    image: string;
    icon: ReactNode;
    bgColor: string;
    targetSection: string;
  }

  const CardComponent = ({ title, description, image, icon, bgColor, targetSection }: CardComponentProps) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`flex flex-col items-center p-8 rounded-lg shadow-xl ${bgColor} transition-all duration-300`}
    >
      <motion.div
        className="mb-6 relative"
        whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
      >
        <img src={image} alt={title} className="w-64 h-64 object-contain" />
        <Box className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
          {icon}
        </Box>
      </motion.div>
      <Typography variant="h4" fontWeight="bold" className="mb-4 text-center">
        {title}
      </Typography>
      <Typography className="text-center mb-6">
        {description}
      </Typography>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/download#${targetSection}-section`)}
          className="mt-4"
        >
         Become
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <Container maxWidth="lg" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" className="text-center mb-12 font-bold text-gray-800">
          Join the Centichain Network
        </Typography>
      </motion.div>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <CardComponent
          title="Become a Relay"
          description="Contribute to a more secure, faster, and decentralized network by becoming a relay node. Earn rewards while improving the Centichain ecosystem."
          image="/images/RelayLaptop.png"
          icon={<FaServer size={32} color="#4A5568" />}
          bgColor="bg-blue-50"
          targetSection="relay"
        />
        <CardComponent
          title="Become a Validator"
          description="Play a crucial role in network security and consensus as a validator. Receive rewards for your service while supporting the Centichain ecosystem."
          image="/images/ValidatorMonitor.png"
          icon={<FaShieldAlt size={32} color="#4A5568" />}
          bgColor="bg-green-50"
          targetSection="validator"
        />
      </Box>
    </Container>
  );
}

export default Becomes;
