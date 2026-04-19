import * as React from "react";
import { motion } from "framer-motion";

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const filterVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3", // top-right
  "col-start-1 col-end-2 row-start-2 row-end-4", // left-mid
  "col-start-1 col-end-2 row-start-4 row-end-6", // bottom-left
  "col-start-2 col-end-3 row-start-3 row-end-5", // right-mid
];

export const ContainerStagger = React.forwardRef(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.15,
        delayChildren: transition?.delayChildren ?? 0.1,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  );
});
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={filterVariants}
      transition={{
        ...SPRING_TRANSITION_CONFIG,
        duration: 0.35,
        ...transition,
      }}
      {...props}
    />
  );
});
ContainerAnimated.displayName = "ContainerAnimated";

export const GalleryGrid = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={[
        "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
GalleryGrid.displayName = "GalleryGrid";

export const GalleryGridCell = React.forwardRef(({ className, transition, index, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
        ...(transition ?? {}),
      }}
      className={[
        "relative overflow-hidden shadow-lg",
        areaClasses[index],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
GalleryGridCell.displayName = "GalleryGridCell";
