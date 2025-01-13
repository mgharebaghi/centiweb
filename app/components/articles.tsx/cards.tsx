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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="w-full"
    >
      <MuiCard className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col" style={{ height: '450px' }}>
        <div className="relative h-[200px]">
          <Image
            alt={title}
            src={pic}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          <Typography 
            variant="h5" 
            className="font-bold mb-4 text-gray-800 dark:text-gray-100 line-clamp-2 tracking-tight"
          >
            {truncateText(title, 60)}
          </Typography>
          
          <Typography 
            variant="body1" 
            className="text-gray-600 dark:text-gray-300 line-clamp-4 mb-4"
          >
            {truncateText(description, 160)}
          </Typography>

          <div className="mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReadMore}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
            >
              <span>Read More</span>
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </CardContent>
      </MuiCard>
    </motion.div>
  );
}
