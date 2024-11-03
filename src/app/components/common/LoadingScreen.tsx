import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

type LoadingScreenProps = {
  className?: string;
  text?: string | null;
};

export const LoadingScreen = ({ className, text }: LoadingScreenProps) => {
  const [loadingDots, setLoadingDots] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, translateY: 0 },
    visible: { opacity: 1, translateY: 0 },
  };

  useEffect(() => {
    if (!text) return;
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length < 3) {
          return prev + ".";
        }
        return "";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-50 bg-slate-900 text-gray-200 ${className}`}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <FiLoader size={50} className="animate-spin-slow" />
      {text && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg font-bold !w-full text-center"
        >
          {text}
          {loadingDots}
        </motion.h2>
      )}
    </motion.div>
  );
};
