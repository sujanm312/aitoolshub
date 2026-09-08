import React from 'react';
import { ExternalLink } from 'lucide-react';

interface RichContentProps {
  content: string;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const RichContent: React.FC<RichContentProps> = ({
  content,
  onNavigate,
  className = '',
}) => {
  // Helper to parse inline styles: bold, italic, hyperlinks
  const renderInlineFormatted = (text: string): React.ReactNode => {
    // Regex matches:
    // 1. Markdown link: [text](url)
    // 2. Bold: **text**
    // 3. Italic: *text*
    // 4. Inline code: `text`
    // 5. HTML bold: <b>text</b> or <strong>text</strong>
    // 6. HTML link: <a href="url">text</a>
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // 1. Markdown link: [link text](url)
      const mdLinkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (mdLinkMatch) {
        const linkText = mdLinkMatch[1];
        const linkUrl = mdLinkMatch[2];
        const isInternal =
          linkUrl.startsWith('/') ||
          linkUrl.startsWith('https://aitoolshub.co.in') ||
          linkUrl.startsWith('http://aitoolshub.co.in');
        const internalPath = linkUrl.replace(/^https?:\/\/aitoolshub\.co\.in/, '') || '/';

        parts.push(
          isInternal && onNavigate ? (
            <button
              key={`link-${keyIdx++}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(internalPath);
              }}
              className="text-[#06038D] hover:text-[#FF671F] font-bold underline decoration-blue-300 hover:decoration-[#FF671F] transition cursor-pointer inline-flex items-center gap-0.5"
            >
              <span>{linkText}</span>
            </button>
          ) : (
            <a
              key={`link-${keyIdx++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-bold underline decoration-blue-300 transition inline-flex items-center gap-0.5"
            >
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3 inline-block opacity-70" />
            </a>
          )
        );
        remaining = remaining.slice(mdLinkMatch[0].length);
        continue;
      }

      // 2. HTML Link: <a href="url">text</a>
      const htmlLinkMatch = remaining.match(/^<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i);
      if (htmlLinkMatch) {
        const linkUrl = htmlLinkMatch[1];
        const linkText = htmlLinkMatch[2];
        const isInternal = linkUrl.startsWith('/');

        parts.push(
          isInternal && onNavigate ? (
            <button
              key={`hlink-${keyIdx++}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(linkUrl);
              }}
              className="text-[#06038D] hover:text-[#FF671F] font-bold underline decoration-blue-300 transition cursor-pointer inline-flex items-center gap-0.5"
            >
              <span>{linkText}</span>
            </button>
          ) : (
            <a
              key={`hlink-${keyIdx++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-bold underline decoration-blue-300 transition inline-flex items-center gap-0.5"
            >
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3 inline-block opacity-70" />
            </a>
          )
        );
        remaining = remaining.slice(htmlLinkMatch[0].length);
        continue;
      }

      // 3. Bold: **text**
      const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        parts.push(
          <strong key={`bold-${keyIdx++}`} className="font-bold text-slate-900">
            {renderInlineFormatted(boldMatch[1])}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // 4. HTML bold: <b>text</b> or <strong>text</strong>
      const htmlBoldMatch = remaining.match(/^<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/i);
      if (htmlBoldMatch) {
        parts.push(
          <strong key={`hbold-${keyIdx++}`} className="font-bold text-slate-900">
            {renderInlineFormatted(htmlBoldMatch[1])}
          </strong>
        );
        remaining = remaining.slice(htmlBoldMatch[0].length);
        continue;
      }

      // 5. Italic: *text*
      const italicMatch = remaining.match(/^\*([^*]+)\*/);
      if (italicMatch) {
        parts.push(
          <em key={`italic-${keyIdx++}`} className="italic text-slate-800">
            {renderInlineFormatted(italicMatch[1])}
          </em>
        );
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // 6. Inline code: `text`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        parts.push(
          <code
            key={`code-${keyIdx++}`}
            className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-rose-600 font-semibold border border-slate-200"
          >
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Normal text until the next special character
      const nextSpecial = remaining.search(/(\[|<a|\*\*|<b|<strong|\*|`)/i);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Character looked special but didn't match full pattern
        parts.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return parts;
  };

  // Split content into blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 text-slate-700 leading-relaxed text-sm md:text-base ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Horizontal divider (--- or *** or ___)
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return <hr key={bIdx} className="my-8 border-t border-slate-200" />;
        }

        // Markdown image: ![alt](url)
        const mdImgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (mdImgMatch) {
          const imgAlt = mdImgMatch[1];
          const imgUrl = mdImgMatch[2];
          return (
            <figure key={bIdx} className="my-8 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-sm">
              <img
                src={imgUrl}
                alt={imgAlt || 'Article illustration'}
                className="w-full h-auto object-cover max-h-[460px]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {imgAlt ? (
                <figcaption className="text-xs text-slate-500 text-center py-2.5 px-4 bg-slate-100/90 font-medium italic border-t border-slate-200/60">
                  {imgAlt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        // Heading 1 (# Heading)
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={bIdx} className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-6 mb-3 pt-2">
              {renderInlineFormatted(trimmed.replace(/^#\s+/, ''))}
            </h1>
          );
        }

        // Heading 2 (## Heading)
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={bIdx} className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-8 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#FF671F] rounded-full inline-block" />
              <span>{renderInlineFormatted(trimmed.replace(/^##\s+/, ''))}</span>
            </h2>
          );
        }

        // Heading 3 (### Heading)
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={bIdx} className="text-base md:text-lg font-bold text-slate-900 tracking-tight mt-6 mb-2">
              {renderInlineFormatted(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }

        // Blockquote (> Quote)
        if (trimmed.startsWith('> ')) {
          return (
            <div
              key={bIdx}
              className="p-4 md:p-5 rounded-2xl bg-orange-50/80 border-l-4 border-[#FF671F] text-slate-800 text-sm md:text-base my-4 shadow-2xs"
            >
              {renderInlineFormatted(trimmed.replace(/^>\s*/gm, ''))}
            </div>
          );
        }

        // Code block (``` code ```)
        if (trimmed.startsWith('```')) {
          const codeContent = trimmed.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '');
          return (
            <pre
              key={bIdx}
              className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs md:text-sm overflow-x-auto my-4 shadow-inner"
            >
              <code>{codeContent}</code>
            </pre>
          );
        }

        // Markdown Table (| ... |)
        if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
          const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
          if (rows.length >= 2) {
            const parseRow = (rowStr: string) =>
              rowStr
                .split('|')
                .slice(1, -1)
                .map((c) => c.trim());

            const headerCols = parseRow(rows[0]);
            const isSeparator = rows[1].includes('---');
            const dataRows = (isSeparator ? rows.slice(2) : rows.slice(1)).map(parseRow);

            return (
              <div key={bIdx} className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-2xs bg-white">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      {headerCols.map((col, cIdx) => (
                        <th key={cIdx} className="px-4 py-3 border-r last:border-r-0 border-slate-200">
                          {renderInlineFormatted(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataRows.map((rCols, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/60 transition">
                        {rCols.map((val, cIdx) => (
                          <td key={cIdx} className="px-4 py-2.5 border-r last:border-r-0 border-slate-100">
                            {renderInlineFormatted(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Bullet List (- item or * item)
        if (/^[-*]\s+/m.test(trimmed)) {
          const items = trimmed
            .split(/\n/)
            .filter((l) => /^[-*]\s+/.test(l.trim()))
            .map((l) => l.trim().replace(/^[-*]\s+/, ''));

          return (
            <ul key={bIdx} className="space-y-2 my-3 pl-2">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F] mt-2 shrink-0" />
                  <span className="flex-1">{renderInlineFormatted(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered List (1. item)
        if (/^\d+\.\s+/m.test(trimmed)) {
          const items = trimmed
            .split(/\n/)
            .filter((l) => /^\d+\.\s+/.test(l.trim()))
            .map((l) => l.trim().replace(/^\d+\.\s+/, ''));

          return (
            <ol key={bIdx} className="space-y-2 my-3 pl-2">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-[#06038D] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {iIdx + 1}
                  </span>
                  <span className="flex-1">{renderInlineFormatted(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Normal paragraph
        return (
          <p key={bIdx} className="text-slate-700 leading-relaxed">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
