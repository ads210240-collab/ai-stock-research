import { useState } from "react";

export default function TermChip({ term, explain }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="rounded border border-line bg-paper px-3 py-2 text-left text-sm hover:border-accent">
      <span className="font-semibold">{term}</span>
      {open && <span className="mt-2 block leading-6 text-muted">{explain}</span>}
    </button>
  );
}
