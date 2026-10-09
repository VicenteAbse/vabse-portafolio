"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { TerminalLine } from "@/content/site";

const TYPE_MS = 55;
const OUTPUT_DELAY_MS = 250;
const NEXT_LINE_MS = 650;
const START_DELAY_MS = 600;

type Step = { line: number; chars: number; showOutput: boolean };

function Prompt() {
  return (
    <span className="select-none">
      <span className="text-accent-bright">vicente@vicenteabse</span>
      <span className="text-muted">:~$ </span>
    </span>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-[0.2em] animate-blink bg-accent-bright" />;
}

export function Terminal({ script }: { script: TerminalLine[] }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>({ line: 0, chars: 0, showOutput: false });

  useEffect(() => {
    if (reduceMotion || step.line >= script.length) return;
    const command = script[step.line].command;

    let delay: number;
    let next: Step;
    if (step.chars < command.length) {
      delay = step.line === 0 && step.chars === 0 ? START_DELAY_MS : TYPE_MS;
      next = { ...step, chars: step.chars + 1 };
    } else if (!step.showOutput) {
      delay = OUTPUT_DELAY_MS;
      next = { ...step, showOutput: true };
    } else {
      delay = NEXT_LINE_MS;
      next = { line: step.line + 1, chars: 0, showOutput: false };
    }

    const id = setTimeout(() => setStep(next), delay);
    return () => clearTimeout(id);
  }, [step, script, reduceMotion]);

  // Con movimiento reducido se muestra todo de una vez.
  const current = reduceMotion ? { line: script.length, chars: 0, showOutput: false } : step;
  const done = current.line >= script.length;

  return (
    <div className="beam-border rounded-2xl shadow-[0_0_80px_-20px] shadow-accent/40">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted">zsh — vicenteabse.cl</span>
        </div>

        {/* Texto completo para lectores de pantalla; la animación es decorativa. */}
        <p className="sr-only">
          {script.map((l) => `${l.command}: ${l.output.join(", ")}`).join(". ")}
        </p>

        {/* Altura mínima fija para que el tipeo no mueva el layout. */}
        <div aria-hidden className="min-h-[19rem] p-4 font-mono text-[13px] leading-relaxed sm:min-h-[17rem] sm:p-5 sm:text-sm">
          {script.map((l, i) => {
            if (i > current.line) return null;
            const isCurrent = i === current.line;
            const command = isCurrent ? l.command.slice(0, current.chars) : l.command;
            const showOutput = !isCurrent || current.showOutput;
            return (
              <div key={i} className="mb-2">
                <div className="break-all">
                  <Prompt />
                  <span className="text-foreground">{command}</span>
                  {isCurrent && !current.showOutput && <Cursor />}
                </div>
                {showOutput &&
                  l.output.map((out, j) => (
                    <div key={j} className="break-words text-muted">
                      {out}
                    </div>
                  ))}
              </div>
            );
          })}
          {done && (
            <div>
              <Prompt />
              <Cursor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
