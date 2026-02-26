"use client";

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <span className="text-xl font-bold font-serif">
              <span className="text-violet">AGM</span>
              <span className="ml-1 text-sm font-sans font-normal text-muted-foreground">40th Anniversary</span>
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              40 Years of Knowledge. A Future Without Limits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {["Timeline", "Gallery", "Gala", "Shop"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Contact</h3>
            <p className="text-sm text-muted-foreground">1 University Avenue</p>
            <p className="text-sm text-muted-foreground">Yerevan, Armenia</p>
            <p className="text-sm text-muted-foreground mt-2">anniversary@agm.edu</p>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-1 border-t border-border pt-8 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart size={14} className="text-violet fill-violet" />
          <span>for AGM&apos;s 40th Anniversary</span>
        </div>
      </div>
    </footer>
  );
}
