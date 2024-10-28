import { Container, Typography, IconButton, Box } from "@mui/material";
import { Grid } from "@mui/material";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";

function Footer() {
  const itemClass =
    "text-slate-300 hover:text-white transition duration-300 cursor-pointer";

  const iconButtonStyle = {
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  const footerLinks = [
    { text: "Home", href: "/" },
    { text: "Explorer", href: "/scan" },
    { text: "Whitepaper", href: "/articles/671fcec5d136b9550a238077" },
    { text: "Download", href: "/download" },
    { text: "DEV", href: "/dev" },
  ];

  const socialLinks = [
    { icon: <VscGithub />, href: "https://github.com/mgharebaghi/CentichainV" },
    { icon: <BsTwitterX />, href: "https://x.com/centichain" },
    { icon: <MdEmail />, href: "/contact" },
    { icon: <FaTelegram />, href: "https://t.me/centichain" },
  ];

  return (
    <Box className="w-full bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300">
      <Container maxWidth="lg" className="py-12">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="mb-4 font-bold text-white">
              Navigation
            </Typography>
            <Grid container spacing={2}>
              {footerLinks.map((link, index) => (
                <Grid item xs={6} key={index}>
                  <Link href={link.href} className={itemClass}>
                    <Typography>{link.text}</Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="mb-4 font-bold text-white">
              Connect With Us
            </Typography>
            <Box className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  component={Link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                  sx={iconButtonStyle}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box className="mt-8 pt-8 border-t border-slate-700">
          <Typography variant="body2" align="center" className="text-slate-400">
            Copyright © {new Date().getFullYear()} Centichain - No Mining, No Staking, No Problem. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
