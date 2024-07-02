"use client";
import React from "react";
import { delay, motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: {
    // type: "spring",
    // stiffness: 100,
  },
};

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FadeText = ({
  text,
  className,
  ...props
}: {
  text: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={textContainer}
      className={className}
      style={{ display: "flex", fontSize: "2em", fontWeight: "bold" }}
    >
      {text.split("").map((char, index) => {
        return (
          <>
            <motion.span variants={textVariants}>{char}</motion.span>
            <br />
          </>
        );
      })}
      <motion.span variants={textVariants}></motion.span>
    </motion.div>
  );
};

export default FadeText;
