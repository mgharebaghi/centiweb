"use client";
import { motion } from "framer-motion";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const RoadmapComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const roadmapItems = [
    {
      year: "2025 Q1",
      title: "Project Inception",
      description: "Launching Centichain with core infrastructure and community focus",
      items: [
        { text: "Launch of Centichain Network", completed: true },
        { text: "Documentation Preparation", completed: true },
        { text: "Public Testnet Launch", completed: true },
      ],
    },
    {
      year: "2025 Q2",
      title: "Testnet Phase",
      description: "Testing and refining the network with community participation",
      items: [
        { text: "Initial Community Building", completed: false },
        { text: "Bug Fixes and Optimization", completed: false },
        { text: "Community Feedback Integration", completed: false },
      ],
    },
    {
      year: "2025 Q3",
      title: "Mainnet Preparation",
      description: "Final preparations and security measures before mainnet launch",
      items: [
        { text: "Final Security Audits", completed: false },
        { text: "Governance Framework Implementation", completed: false },
        { text: "Mainnet Launch Preparation", completed: false },
      ],
    },
    {
      year: "2025 Q4",
      title: "Mainnet Launch",
      description: "Official network launch and ecosystem expansion",
      items: [
        { text: "Mainnet Deployment", completed: false },
        { text: "Ecosystem Partnerships", completed: false },
        { text: "Ongoing Community Engagement", completed: false },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px]" />
      </div>

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 relative z-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-block mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="px-6 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full border border-green-500/20"
              >
                <Typography className="text-green-400 font-semibold">Our Vision & Timeline</Typography>
              </motion.div>
            </div>
            <Typography
              variant="h2"
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6"
            >
              Centichain Roadmap
            </Typography>
            <Typography variant="h6" className="text-gray-400 max-w-3xl mx-auto text-lg">
              Our ambitious journey to revolutionize blockchain technology through innovation, security, and
              community-driven development
            </Typography>
          </motion.div>

          {/* Roadmap Timeline */}
          <motion.div variants={itemVariants} className="space-y-12">
            {roadmapItems.map((phase, phaseIndex) => (
              <motion.div
                key={phase.year}
                initial={{ opacity: 0, x: phaseIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: phaseIndex * 0.2 }}
                className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/4">
                    <Typography
                      variant="h5"
                      className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2"
                    >
                      {phase.year}
                    </Typography>
                    <Typography variant="h6" className="text-xl text-gray-100 font-bold mb-2">
                      {phase.title}
                    </Typography>
                    <Typography className="text-gray-400 text-sm">{phase.description}</Typography>
                  </div>
                  <div className="md:w-3/4">
                    <div className="space-y-6 relative">
                      {/* Vertical line connecting items */}
                      <motion.div
                        variants={lineVariants}
                        className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-500 origin-top"
                        style={{
                          boxShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
                          height: "100%",
                        }}
                      />

                      {phase.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center gap-4 relative p-4 rounded-xl"
                        >
                          {/* Horizontal connector line */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            className="absolute left-[15px] w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 origin-left"
                            style={{
                              boxShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
                              transform: "translateX(-50%)",
                            }}
                          />

                          {item.completed ? (
                            <FaCheckCircle className="text-green-400 text-2xl relative z-10" />
                          ) : (
                            <FaCircle className="text-gray-600 text-2xl relative z-10" />
                          )}
                          <Typography className="text-gray-300 text-lg pl-4">{item.text}</Typography>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RoadmapComponent;
