import { Container, Typography, Box, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function Make() {
  const technologies = [
    {
      name: "Rust",
      logo: "/images/rust-logo-512x512.png",
      url: "https://www.rust-lang.org/",
      description: "High-performance systems programming language powering our core blockchain infrastructure",
    },
    {
      name: "libp2p",
      logo: "/images/libp2p-logo.png",
      url: "https://libp2p.io/",
      description: "Modular network stack enabling peer-to-peer communication in our decentralized network",
    },
    {
      name: "Tauri",
      logo: "/images/tauri-logo.png",
      url: "https://tauri.app/",
      description: "Lightweight framework for building our secure and efficient desktop wallet application",
    },
    {
      name: "MongoDB",
      logo: "/images/mongodb_logo.png",
      url: "https://www.mongodb.com/",
      description: "Flexible document database storing blockchain metadata and user data",
    },
  ];

  return (
    <Box className="min-h-[600px] w-full bg-gradient-to-r from-slate-900 to-zinc-900 py-20">
      <Container maxWidth="lg">
        <div className="text-center mb-16">
          <Typography variant="h2" className="text-white font-bold mb-4">
            Built With Modern Stack
          </Typography>
          <Typography variant="subtitle1" className="text-gray-400">
            Leveraging industry-standard technologies for reliability and performance
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <Tooltip key={tech.name} title={tech.description} arrow placement="top">
              <Link href={tech.url} target="_blank" passHref>
                <Box className="bg-black/30 backdrop-blur rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-zinc-600">
                  <div className="p-8 bg-gradient-to-br from-zinc-900/50 to-transparent">
                    <div className="flex justify-center items-center h-[120px]">
                      <Image
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        width={90}
                        height={90}
                        className="opacity-90 hover:opacity-100"
                      />
                    </div>
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                      <Typography variant="h6" className="text-center text-zinc-300 font-medium">
                        {tech.name}
                      </Typography>
                    </div>
                  </div>
                </Box>
              </Link>
            </Tooltip>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Typography variant="body2" className="text-zinc-500">
            Each technology was carefully selected to create a robust and scalable platform
          </Typography>
        </div>
      </Container>
    </Box>
  );
}

export default Make;
