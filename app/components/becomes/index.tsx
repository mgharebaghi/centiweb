import { Button, Typography, Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaServer, FaShieldAlt } from "react-icons/fa";
import { ReactNode } from "react";

function Becomes() {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  interface CardComponentProps {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    onClick: () => void;
    icon: ReactNode;
    bgColor: string;
  }

  const CardComponent = ({ title, description, image, buttonText, onClick, icon, bgColor }: CardComponentProps) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center p-8 rounded-lg shadow-xl ${bgColor} transition-all duration-300 hover:shadow-2xl`}
    >
      <Box className="mb-6 relative">
        <img src={image} alt={title} className="w-64 h-64 object-contain" />
        <Box className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" fontWeight="bold" className="mb-4 text-center">
        {title}
      </Typography>
      <Typography className="text-center mb-6">
        {description}
      </Typography>
      <motion.div variants={buttonVariants} whileHover="hover">
        <Button
          variant="contained"
          onClick={onClick}
          className="py-2 px-6 text-lg font-light"
          style={{ backgroundColor: '#2D3748', color: '#E2E8F0' }}
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h2" className="text-center mb-12 font-bold text-gray-800">
        Join the Centichain Network
      </Typography>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <CardComponent
          title="Become a Relay"
          description="Contribute to a more secure, faster, and decentralized network by becoming a relay node. Earn rewards while improving the Centichain ecosystem."
          image="/images/RelayLaptop.png"
          buttonText="Learn How"
          onClick={() => router.push('/articles/6690198b261897ff8bf5d198')}
          icon={<FaServer size={32} color="#4A5568" />}
          bgColor="bg-blue-50"
        />
        <CardComponent
          title="Become a Validator"
          description="Play a crucial role in network security and consensus as a validator. Receive rewards for your service while supporting the Centichain ecosystem."
          image="/images/ValidatorMonitor.png"
          buttonText="Get Started"
          onClick={() => router.push("/articles/669017ee261897ff8bf5d197")}
          icon={<FaShieldAlt size={32} color="#4A5568" />}
          bgColor="bg-green-50"
        />
      </Box>
    </Container>
  );
}

export default Becomes;
