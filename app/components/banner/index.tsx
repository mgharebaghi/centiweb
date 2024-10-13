import { Typography, Container, Button } from "@mui/material";
import { Col, Row } from "antd";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaDownload, FaBookOpen } from "react-icons/fa";

export default function Banner() {
  const btn_class =
    "w-full py-3 px-6 rounded-md transition duration-300 text-slate-300 bg-transparent hover:bg-slate-700 hover:text-slate-100 border border-slate-300 hover:border-slate-300 flex items-center justify-center font-light tracking-wide";

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const particleVariants = {
    animate: (i: number) => ({
      x: Math.sin(i * 0.5) * 20,
      y: Math.cos(i * 0.5) * 20,
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const blockPatternVariants = {
    animate: (i: number) => ({
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: Math.random() * 15 + 15,
        repeat: Infinity,
        ease: "linear",
      },
    }),
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-slate-300 flex items-center relative overflow-hidden font-sans pt-16">
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-slate-600 rounded-md"
            style={{
              width: Math.random() * 30 + 20,
              height: Math.random() * 30 + 20,
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
            }}
            variants={blockPatternVariants}
            animate="animate"
            custom={i}
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>
      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.div variants={blockVariants}>
            <Typography
              variant="h2"
              fontWeight="light"
              className="text-center mb-8 text-slate-100 tracking-wide"
            >
              Revolutionizing Decentralization
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants} className="mb-5">
            <TypeAnimation
              sequence={[
                "Simplicity for All",
                2800,
                "Affordable Participation",
                2800,
                "Eco-Friendly Operation",
                2800,
                "Equitable and Ethical",
                2800,
                "Innovative Consensus",
                2800,
              ]}
              wrapper="div"
              speed={50}
              repeat={Infinity}
              className="text-3xl text-center h-20 tracking-wide text-green-300 font-bold"
            />
          </motion.div>

          <motion.div variants={blockVariants} className="mb-12">
            <Typography variant="h6" className="text-center text-slate-300 font-light tracking-wide">
              Empowering everyone with accessible, efficient, and sustainable blockchain technology
            </Typography>
          </motion.div>

          <motion.div variants={blockVariants}>
            <Row gutter={[24, 24]} justify="center">
              <Col xs={20} sm={12} md={10} lg={8}>
                <Link href="/download" passHref>
                  <Button variant="outlined" className={btn_class} fullWidth>
                    <FaDownload className="mr-2" /> Get Started
                  </Button>
                </Link>
              </Col>
              <Col xs={20} sm={12} md={10} lg={8}>
                <Link href="/articles/66901aa0261897ff8bf5d199" passHref>
                  <Button variant="outlined" className={btn_class} fullWidth>
                    <FaBookOpen className="mr-2" /> Explore More
                  </Button>
                </Link>
              </Col>
            </Row>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
