import { Container, Typography, IconButton, Box } from "@mui/material";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    {
      icon: <VscGithub size={24} />,
      href: "https://github.com/mgharebaghi/CentichainV",
    },
    { icon: <BsTwitterX size={22} />, href: "https://x.com/centichain" },
    { icon: <MdEmail size={24} />, href: "/contact" },
    { icon: <FaTelegram size={24} />, href: "https://t.me/centichain" },
  ];

  return (
    <Box className="bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <Container maxWidth="lg">
        <div className="flex flex-col items-center py-12 space-y-8">
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="/scan"
              className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              Explorer
            </Link>
            <Link
              href="/download"
              className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              Download
            </Link>
            <Link
              href="/dev"
              className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              DEV
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <IconButton
                key={index}
                component={Link}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                size="large"
              >
                {link.icon}
              </IconButton>
            ))}
          </div>

          <div className="text-center space-y-2">
            <Typography variant="body2" className="text-gray-400">
              © {new Date().getFullYear()} Centichain
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              No Mining, No Staking, No Problem
            </Typography>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Footer;
