import { HTMLAttributes, memo } from "react";
import { motion } from "framer-motion";

type HTMLMotionDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
>;

interface Props extends HTMLMotionDivProps {
  children: React.ReactNode;
  reverse?: boolean;
  justY?: boolean;
}
function MotionDiv({ children, reverse, justY, ...props }: Props) {
  const base = {
    opacity: 0,
  };

  const variants = justY
    ? {
        initial: { ...base, y: reverse ? -20 : 20 },
        animate: { y: 0, opacity: 1 },
        exit: { ...base, y: reverse ? 20 : -20 },
      }
    : {
        initial: { ...base, x: reverse ? "-100%" : "100%" },
        animate: { x: 0, opacity: 1 },
        exit: { ...base, x: reverse ? "100%" : "-100%" },
      };
  return (
    <motion.div
      animate="animate"
      initial="initial"
      exit="exit"
      variants={variants}
      transition={{ type: "just" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default memo(MotionDiv);
