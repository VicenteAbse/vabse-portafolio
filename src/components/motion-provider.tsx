"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

// LazyMotion + `m.*` carga solo las features de animación que usamos,
// en vez del bundle completo de `motion.*`.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
