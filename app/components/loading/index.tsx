import { useEffect, useState } from "react";
import { LinearProgress, Box } from "@mui/material";

function Loading() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box className="w-full min-h-[750px] pt-[62px]">
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#f44336',
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)',
            backgroundSize: '40px 40px',
            animation: 'stripe 1s linear infinite',
          },
          '@keyframes stripe': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '40px 0' },
          },
        }}
      />
    </Box>
  );
}

export default Loading;
