import { Typography, Container, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FaServer, FaShieldAlt, FaNetworkWired, FaLock } from "react-icons/fa";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

function Becomes() {
  const router = useRouter();

  const features = [
    {
      title: "Relay Node",
      description: "Power the network's communication layer",
      benefits: [
        "Earn rewards through transaction fees",
        "Support network decentralization",
        "Low hardware requirements",
      ],
      icon: <FaServer className="text-blue-500" size={24} />,
      color: "from-blue-500 to-blue-600",
      section: "relay",
    },
    {
      title: "Validator Node",
      description: "Secure and validate network transactions",
      benefits: ["Earn staking rewards", "Participate in governance", "Help maintain consensus"],
      icon: <FaShieldAlt className="text-emerald-500" size={24} />,
      color: "from-emerald-500 to-emerald-600",
      section: "validator",
    },
  ];

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
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 grid items-center">
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Typography
            variant="h2"
            className="font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
          >
            Participate in the Network
          </Typography>
          <Typography variant="h6" color="textSecondary" className="mt-4">
            Choose your role in strengthening the Centichain ecosystem
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gray-100 rounded-lg">{feature.icon}</div>
                  <div className="ml-4">
                    <Typography variant="h4" className="font-bold">
                      {feature.title}
                    </Typography>
                    <Typography color="textSecondary">{feature.description}</Typography>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-3" />
                      <Typography>{benefit}</Typography>
                    </div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push(`/download#${feature.section}-section`)}
                    className={`bg-gradient-to-r ${feature.color} hover:opacity-90 text-white py-3`}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Typography variant="body1" color="textSecondary">
            Join our growing community of blockchain enthusiasts
          </Typography>
        </motion.div>
      </Container>
    </div>
  );
}

export default Becomes;
