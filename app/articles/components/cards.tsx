import { Typography, Card as MuiCard, CardContent, CardMedia } from "@mui/material";
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

  const handleCardClick = () => {
    router.push(`/articles/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <MuiCard 
        className="bg-gray-800 text-white rounded-md shadow-md hover:shadow-lg transition duration-200 h-full flex flex-col cursor-pointer"
        onClick={handleCardClick}
      >
        <CardMedia className="relative h-40">
          <Image
            alt={title}
            src={pic}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#1F2937"/></svg>')}`}
          />
        </CardMedia>
        <CardContent className="flex-grow p-3">
          <Typography variant="h6" component="h3" className="font-bold mb-1 line-clamp-2 text-sm">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-gray-300 line-clamp-2 text-xs">
            {description}
          </Typography>
        </CardContent>
      </MuiCard>
    </motion.div>
  );
}
