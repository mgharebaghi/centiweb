import { Typography, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  pic: string;
  title: string;
  description: string;
}

export default function Card({ id, pic, title, description }: CardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer w-full aspect-square"
      onClick={() => {
        router.push(`/articles/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <Paper elevation={3} className="bg-gray-900 rounded-lg overflow-hidden w-[100%] h-[100%] flex flex-col">
        <div className="relative flex-grow">
          <Image
            alt={title}
            src={pic}
            layout="fill"
            className="transition-all duration-300 filter brightness-75 hover:brightness-100"
          />
        </div>
        <div className="p-4">
          <Typography variant="h6" className="font-bold mb-2 text-gray-100 line-clamp-2">
            {title}
          </Typography>
          <Typography variant="body2" className="text-gray-400 line-clamp-2">
            {description}
          </Typography>
        </div>
      </Paper>
    </motion.div>
  );
}
