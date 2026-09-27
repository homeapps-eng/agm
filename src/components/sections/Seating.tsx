"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { galaInfo } from "@/data/gala";
import { galaTables, type GalaTable } from "@/data/seating";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MapPin, Users, Search, SearchX, X } from "lucide-react";

// Case- and accent-insensitive, so "jose" finds "José"
function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

interface TableResult {
  table: GalaTable;
  matchedGuests: Set<number>;
  tableMatched: boolean;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const folded = fold(text);
  const start = folded.indexOf(query);
  // Folding can change string length for some scripts; skip highlighting rather than mis-slice
  if (!query || start === -1 || folded.length !== text.length) return <>{text}</>;
  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-sm bg-gold/30 px-0.5 text-white">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

function TableCard({ table, matchedGuests, tableMatched, query }: TableResult & { query: string }) {
  const searching = query.length > 0;

  return (
    <article className="group bg-gala-table h-full rounded-2xl p-1.5 text-white shadow-lg shadow-violet-dark/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-dark/30">
      {/* Inset gold frame, like a printed place card (ring, since globals.css pins border-color) */}
      <div className="flex h-full flex-col rounded-xl px-5 pb-6 pt-7 text-center ring-1 ring-inset ring-gold/35 transition-shadow duration-500 group-hover:ring-gold/75">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-light/80">Table</p>
        <h3 className="text-gold-foil mt-1 text-6xl leading-none">
          <span className="sr-only">Table </span>
          {table.number}
        </h3>
        {table.label && (
          <p className="mt-3 truncate text-[11px] font-medium uppercase tracking-[0.25em] text-white/70" title={table.label}>
            <Highlight text={table.label} query={query} />
          </p>
        )}

        <div aria-hidden className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 transition-all duration-500 group-hover:w-16" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 transition-all duration-500 group-hover:w-16" />
        </div>

        <ul className="flex-1 space-y-0.5">
          {table.guests.map((guest, i) => {
            const isMatch = matchedGuests.has(i);
            return (
              <li
                key={`${guest}-${i}`}
                className={cn(
                  "break-words rounded-md px-2 py-1 font-serif text-lg leading-snug text-white/90 transition-colors duration-200 hover:text-gold-light",
                  isMatch && "bg-gold/15 text-gold-light",
                  searching && !tableMatched && !isMatch && "text-white/35"
                )}
              >
                <Highlight text={guest} query={query} />
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-white/40">
          {plural(table.guests.length, "guest")}
        </p>
      </div>
    </article>
  );
}

export function Seating() {
  const [search, setSearch] = useState("");
  const query = fold(search).trim().replace(/\s+/g, " ");

  const totalGuests = galaTables.reduce((sum, t) => sum + t.guests.length, 0);

  const results = useMemo<TableResult[]>(() => {
    if (!query) {
      return galaTables.map((table) => ({ table, matchedGuests: new Set(), tableMatched: false }));
    }
    // "7" or "table 7" jumps straight to that table
    const tableNumber = query.replace(/^table\s*/, "");
    return galaTables.flatMap((table) => {
      const tableMatched =
        String(table.number) === tableNumber || (!!table.label && fold(table.label).includes(query));
      const matchedGuests = new Set(
        table.guests.flatMap((guest, i) => (fold(guest).includes(query) ? [i] : []))
      );
      return tableMatched || matchedGuests.size > 0 ? [{ table, matchedGuests, tableMatched }] : [];
    });
  }, [query]);

  const guestMatches = results.reduce((sum, r) => sum + r.matchedGuests.size, 0);
  const directAnswers =
    guestMatches > 0 && guestMatches <= 6
      ? results.flatMap((r) => [...r.matchedGuests].map((i) => ({ guest: r.table.guests[i], table: r.table.number })))
      : [];

  let summary = "Search by name to find your table";
  if (query && results.length === 0) {
    summary = "No matches found";
  } else if (query) {
    summary =
      guestMatches > 0
        ? `${plural(guestMatches, "guest")} found at ${plural(results.length, "table")}`
        : `Showing ${plural(results.length, "table")}`;
  }

  return (
    <div className="relative bg-gradient-hero">
      {/* Decorative orbs — clipped here so the sticky search bar still works */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-24 h-72 w-72 rounded-full bg-violet/10 blur-3xl animate-float" />
        <div
          className="absolute right-1/4 top-64 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <SectionWrapper id="seating" className="pt-32 md:pt-40">
        <SectionHeading
          as="h1"
          badge={galaInfo.date}
          title="Table Seating & Guest List"
          subtitle="Welcome to the 40th Anniversary Gala. Find your name below to discover your table for the evening."
          className="mb-8"
        />

        <motion.div
          variants={fadeInUp}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="flex-shrink-0 text-violet" />
            {galaInfo.venue}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users size={16} className="flex-shrink-0 text-violet" />
            {plural(totalGuests, "guest")} across {plural(galaTables.length, "table")}
          </span>
        </motion.div>

        {/* Search */}
        <motion.div variants={fadeInUp} className="sticky top-20 z-30 mx-auto max-w-xl">
          <label htmlFor="guest-search" className="sr-only">
            Search guests or tables
          </label>
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="guest-search"
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Search your name or table number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setSearch("")}
              className="w-full rounded-full border border-border bg-card py-4 pl-12 pr-12 text-base shadow-lg shadow-violet/5 transition-shadow placeholder:text-muted-foreground focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet [&::-webkit-search-cancel-button]:appearance-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        <div className="mt-4 mb-10 text-center" aria-live="polite">
          <p className="text-sm text-muted-foreground">{summary}</p>
          {directAnswers.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {directAnswers.map(({ guest, table }) => (
                <span
                  key={`${table}-${guest}`}
                  className="rounded-full border border-border bg-card px-5 py-2 text-sm"
                >
                  <span className="font-medium">{guest}</span>
                  <span className="mx-2 text-muted-foreground">&mdash;</span>
                  <span className="font-medium text-violet">Table {table}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tables */}
        {results.length === 0 ? (
          <GlassCard hover={false} className="mx-auto flex max-w-md flex-col items-center gap-3 py-12 text-center">
            <SearchX size={28} className="text-violet" />
            <p className="font-medium">No guests match &ldquo;{search.trim()}&rdquo;</p>
            <p className="text-sm text-muted-foreground">Check the spelling or try searching by last name.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setSearch("")}>
              Clear search
            </Button>
          </GlassCard>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((result) => (
                <motion.div
                  key={result.table.number}
                  layout="position"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                >
                  <TableCard {...result} query={query} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="mt-16 text-center text-sm text-muted-foreground">
          Can&apos;t find your name? Contact us at{" "}
          <a href="mailto:contact@agmschool.org" className="font-medium text-violet hover:underline">
            contact@agmschool.org
          </a>
          .
        </p>
      </SectionWrapper>
    </div>
  );
}
