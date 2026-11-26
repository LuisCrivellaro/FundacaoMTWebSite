"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

/**
 * Número que conta a partir de zero quando entra na tela ("200+", "26").
 * O HTML do servidor já traz o valor final; leitores de tela leem só o valor final.
 * Se o número já está visível ao carregar, ou com movimento reduzido, não anima.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const count = useMotionValue(target);
  const text = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    count.set(0);
    let controls: ReturnType<typeof animate> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        controls = animate(count, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controls?.stop();
      count.set(target);
    };
    // `match` é derivado de `value`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target, reduce, count]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      <motion.span ref={ref} aria-hidden="true">
        {text}
      </motion.span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
