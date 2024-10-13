import { Button, Typography, Card as MuiCard, CardContent, CardMedia, CardActions } from "@mui/material";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <MuiCard 
        className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col cursor-pointer"
        onClick={handleCardClick}
      >
        <CardMedia className="relative h-56">
          <Image
            alt={title}
            src={pic}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#1F2937"/></svg>')}`}
          />
        </CardMedia>
        <CardContent className="flex-grow">
          <Typography variant="h5" component="h2" className="font-bold mb-2 line-clamp-2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-gray-300 line-clamp-3">
            {description}
          </Typography>
        </CardContent>
        <CardActions className="p-4">
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out"
          >
            Read More
          </Button>
        </CardActions>
      </MuiCard>
    </motion.div>
  );
}
