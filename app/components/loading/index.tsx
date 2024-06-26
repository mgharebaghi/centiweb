import { useEffect, useState } from "react";

function Loading() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 0.5
      );
    }, 1);
  }, []);

  return (
    <div className="pt-[75px] w-full min-h-[750px]">
      <div
        className="h-[4px] bg-red-500"
        style={{ width: `${progress}%`, transition: "1s" }}
      />
    </div>
  );
}

export default Loading;
