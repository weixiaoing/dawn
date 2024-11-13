"use client";
import { motion } from "framer-motion";
export default function MotionToUp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ y: [200, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
    >
      {children}
    </motion.div>
  );
}
