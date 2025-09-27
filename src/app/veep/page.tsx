"use client";

import { useState, useTransition } from "react";
import Image from "next/image";

import { QUESTIONS, Question } from "@/lib/veep/questions";
import type { QuizAnswer, VeepResult } from "@/lib/veep/types";
import { imagePathFor, initialsOf } from "@/lib/veep/assets";

function cn(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}
const isMC = (q: Question): q is Extract<Question, { kind: "mc" }> => q.kind === "mc";

export default function VeepPage() {
  return (
    <main className="font-sans text-zinc-200 bg-black min-h-[calc(100vh-64px)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Which <span className="italic text-zinc-100">Veep</span> character are you?
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-400">
            6 quick questions. Get a witty roast and a dead-on match.
          </p>
        </header>
        <QuizClient />
      </div>
    </main>
  );
}

function QuizClient() {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [result, setResult] = useState<VeepResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const updateChoice = (qid: string, choiceId: string) => {
    setAnswers(prev => {
      const i = prev.findIndex(a => a.qid === qid);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], choiceId };
        return copy;
      }
      return [...prev, { qid, choiceId }];
    });
  };

  const updateText = (qid: string, freeText: string) => {
    setAnswers(prev => {
      const i = prev.findIndex(a => a.qid === qid);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], freeText };
        return copy;
      }
      return [...prev, { qid, freeText }];
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const required = QUESTIONS.filter(q => q.kind === "mc").length;
    const have = answers.filter(a => a.choiceId).length;
    if (have < required) {
      setError("Answer all multiple-choice questions.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/veep-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers })
        });
        const json = (await res.json()) as VeepResult | { error?: string };
        if (!res.ok || "error" in json) {
          setError(("error" in json && json.error) || "Something went wrong.");
          return;
        }
        setResult(json as VeepResult);
      } catch {
        setError("Network error.");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* QUESTIONS */}
      <section className="space-y-6">
        {QUESTIONS.map(q => (
          <div
            key={q.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur p-4 md:p-5"
          >
            <div className="font-medium text-zinc-100">{q.text}</div>

            {isMC(q) ? (
              <div className="mt-3 grid gap-2">
                {q.options.map(opt => {
                  const checked = answers.find(a => a.qid === q.id)?.choiceId === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer transition",
                        "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900",
                        checked && "border-zinc-200"
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        disabled={isPending}
                        checked={checked || false}
                        onChange={() => updateChoice(q.id, opt.id)}
                        className="h-4 w-4 accent-zinc-100"
                      />
                      <span className="text-sm md:text-[15px] text-zinc-200">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="mt-3">
                <textarea
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  rows={3}
                  maxLength={q.maxLen ?? 200}
                  placeholder={q.placeholder}
                  disabled={isPending}
                  onChange={(e) => updateText(q.id, e.target.value)}
                />
                <div className="mt-1 text-xs text-zinc-500">Max {q.maxLen ?? 200} characters.</div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-5 py-3 font-medium text-black",
            "shadow-sm transition hover:brightness-95 disabled:opacity-60"
          )}
        >
          {isPending ? <Spinner /> : null}
          {isPending ? "Crunching your chaos…" : "Get my character"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* RESULT */}
      {isPending && !result ? <ResultSkeleton /> : null}
      {result ? <ResultCard result={result} /> : null}
    </form>
  );
}

/* ===== UI bits ===== */

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/60 border-t-black" />
  );
}

function ResultSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6">
      <div className="h-6 w-56 rounded bg-zinc-800 animate-pulse" />
      <div className="mt-2 h-4 w-40 rounded bg-zinc-800 animate-pulse" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="mb-2 h-3 w-40 rounded bg-zinc-800 animate-pulse" />
            <div className="h-2 w-full rounded bg-zinc-800 overflow-hidden">
              <div className="h-2 animate-pulse bg-zinc-700" style={{ width: `${30 + i * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: VeepResult }) {
  const { top_match, roast, quote, why_you, scores } = result;
  const imgSrc = imagePathFor(top_match);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
            {top_match}
          </h2>
          <p className="mt-1 text-sm text-zinc-400 italic">“{quote}”</p>
          <p className="mt-3 text-zinc-200">{why_you}</p>
          <p className="mt-2 text-sm text-zinc-400">
            <span className="mr-1">🧯</span>
            <span className="font-medium text-zinc-300">Roast:</span> {roast}
          </p>
        </div>

        <div className="shrink-0">
          <CharacterImage name={top_match} src={imgSrc} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {scores.map(s => (
          <Bar key={s.character} label={s.character} value={s.score} />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            const txt = `I got ${top_match} on gsym.me/veep — “${quote}”`;
            navigator.clipboard.writeText(txt);
          }}
          type="button"
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 transition"
        >
          Copy result
        </button>
        <a
          href="/veep"
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 transition"
        >
          Retake
        </a>
      </div>
    </div>
  );
}

function CharacterImage({ name, src }: { name: string; src: string }) {
  // Initials fallback sits underneath and will be covered if the image exists.
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 grid place-items-center rounded-xl bg-zinc-800 text-zinc-300 text-lg font-semibold select-none">
        {initialsOf(name)}
      </div>
      <Image
        src={src}
        alt={name}
        width={64}
        height={64}
        priority
        className="relative z-10 rounded-xl object-cover ring-1 ring-zinc-800"
      />
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between text-[13px] text-zinc-400">
        <span>{label}</span>
        <span className="tabular-nums text-zinc-400">{clamped}</span>
      </div>
      <div className="h-2 w-full rounded bg-zinc-800 overflow-hidden">
        <div
          className="h-2 rounded-r bg-zinc-100 transition-[width] duration-500 ease-out group-hover:opacity-90"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
