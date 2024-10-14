import { Typography, Card as MuiCard, CardContent, CardMedia, Button } from "@mui/material";
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/articles/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer w-full"
      onClick={() => {
        router.push(`/articles/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <MuiCard className="bg-gray-800 rounded-xl overflow-hidden shadow-lg" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <CardMedia className="relative" style={{ height: '200px' }}>
            <Image
              alt={title}
              src={pic}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-200 hover:opacity-90"
            />
          </CardMedia>
        </motion.div>
        <CardContent className="flex-grow p-4 overflow-hidden flex flex-col justify-between">
          <div>
            <Typography variant="h6" className="font-bold mb-2 text-gray-200" style={{ height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {truncateText(title, 60)}
            </Typography>
            <Typography variant="body2" className="text-gray-400" style={{ height: '4.5em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {truncateText(description, 120)}
            </Typography>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleReadMore}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
            >
              Read More →
            </Button>
          </motion.div>
        </CardContent>
      </MuiCard>
    </motion.div>
  );
}
