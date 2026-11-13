"use client";

import React from "react";

interface MarkdownRendererProps {
  markdown: string;
}

function renderInline(text: string): React.ReactNode[] {
  // Match **bold**, *italic*, `code`, and [label](url)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-medium text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={idx} className="italic text-zinc-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, rawUrl] = linkMatch;
      const safeHref = /^https?:\/\/|^mailto:|^\//.test(rawUrl) ? rawUrl : "#";
      return (
        <a
          key={idx}
          href={safeHref}
          target={safeHref.startsWith("http") ? "_blank" : undefined}
          rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * MarkdownRenderer
 * Clean, zero-dependency editorial Markdown renderer tuned to the solid-black
 * minimalist typography system.
 */
export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push(<hr key={`hr-${i}`} className="border-white/10 my-6" />);
      i++;
      continue;
    }

    // Standalone Markdown image: ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      if (/^https?:\/\/|^\//.test(src)) {
        blocks.push(
          <figure key={`img-${i}`} className="my-5 border border-white/10 bg-black overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt || "Article visual"} className="w-full max-h-96 object-cover" />
            {alt && (
              <figcaption className="px-4 py-2 text-[10px] font-mono text-zinc-500 border-t border-white/10">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push(
        <h4
          key={`h3-${i}`}
          className="text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-white mt-6 mb-2 font-sans"
        >
          {renderInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h3
          key={`h2-${i}`}
          className="text-sm sm:text-base font-medium uppercase tracking-[0.12em] text-white mt-7 mb-2.5 pb-2 border-b border-white/10 font-sans"
        >
          {renderInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h2
          key={`h1-${i}`}
          className="text-base sm:text-lg font-medium uppercase tracking-[0.1em] text-white mt-7 mb-3 font-sans"
        >
          {renderInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="border-l border-white/40 pl-4 py-1 my-4 text-xs text-zinc-200 italic font-light leading-relaxed"
        >
          {renderInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-zinc-300 font-light leading-relaxed flex items-start gap-2.5"
            >
              <span className="text-white/40 mt-0.5">&bull;</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="space-y-2 my-4 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-zinc-300 font-light leading-relaxed flex items-start gap-2.5"
            >
              <span className="text-[10px] font-mono text-white/45 mt-0.5">
                {idx + 1}.
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (collect consecutive non-empty plain lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3} |> |[-*] |\d+\. |-{3,}$|\*{3,}$|!\[)/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    blocks.push(
      <p key={`p-${i}`} className="text-xs sm:text-[13px] text-zinc-300 font-light leading-relaxed my-3">
        {renderInline(paraLines.join(" "))}
      </p>
    );
  }

  return <div className="space-y-1">{blocks}</div>;
}
