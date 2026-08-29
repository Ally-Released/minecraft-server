"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
}

export default function WordFadeIn({
  words,
  className,
  delay = 0.15,
}: WordFadeInProps) {
  const _words = words.split(" ");

  return (
    <motion.h1
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: delay } },
      }}
    >
      {_words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
