"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Momento de leitura guiada: as palavras ganham cor conforme a rolagem
 * (referência Solarify). Sob movimento reduzido, o texto aparece inteiro.
 */
export function Statement({ text, id }: { text: string; id?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} id={id} className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-[1.18] font-[380] tracking-[-0.018em] text-ink">
      {reduce
        ? text
        : words.map((w, i) => (
            <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
