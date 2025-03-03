"use client";

import React, { useState, useEffect } from "react";

interface TypeAnimationProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
  switchDelay?: number;
}

const TypeAnimation: React.FC<TypeAnimationProps> = ({
  text,
  speed = 50,
  delay = 0,
  loop = false,
  cursor = true,
  repeat = false,
  repeatDelay = 3000,
  switchDelay = 2000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  // Convert single text to array for consistent handling
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex];

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted || isPaused) return;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
      }, speed / 2);
    } else if (displayText.length === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentIndex(0);

      // Move to next text in the array if there are multiple texts
      if (Array.isArray(text) && text.length > 1) {
        setTextArrayIndex((prev) => (prev + 1) % textArray.length);
      }

      setIsPaused(true);
      // Pause before restarting
      timeout = setTimeout(() => {
        setIsPaused(false);
      }, switchDelay);
    } else if (currentIndex === currentText.length && !isDeleting) {
      // Pause at the end before deleting
      setIsPaused(true);
      timeout = setTimeout(
        () => {
          setIsPaused(false);
          setIsDeleting(true);
        },
        repeat ? repeatDelay : switchDelay
      );
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    displayText,
    isDeleting,
    isStarted,
    isPaused,
    loop,
    repeat,
    repeatDelay,
    speed,
    currentText,
    textArray,
    textArrayIndex,
    switchDelay,
    text,
  ]);

  return (
    <>
      {displayText}
      {cursor &&
        !isPaused &&
        (currentIndex < currentText.length || isDeleting) && (
          <span
            className="cursor"
            style={{ opacity: 1, animation: "blink 1s step-end infinite" }}
          >
            |
          </span>
        )}
      <style jsx global>{`
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default TypeAnimation;
