"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: el botón de mailto sigue disponible.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 text-sm font-medium transition hover:border-accent/60"
    >
      {copied ? <Check className="size-4 text-accent-bright" /> : <Copy className="size-4" />}
      {copied ? "¡Copiado!" : "Copiar email"}
    </button>
  );
}
