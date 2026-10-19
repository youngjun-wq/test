import React from 'react';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
  // Parse inline text with bolding (**text**)
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-[#800f13] dark:text-[#d4af37]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentList: string[] = [];
  const flushList = (keyPrefix: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${keyPrefix}`} className="list-disc list-outside pl-5 my-2 space-y-1.5 text-xs sm:text-sm leading-relaxed">
          {currentList.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check if line is a bullet item
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      currentList.push(trimmed.slice(2));
      return;
    }

    // Flush any pending list
    flushList(idx);

    if (!trimmed) {
      // Empty line / paragraph break
      elements.push(<div key={`sp-${idx}`} className="h-2" />);
      return;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      elements.push(
        <hr key={`hr-${idx}`} className="my-4 border-t border-[#b48c36]/40" />
      );
      return;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={`quote-${idx}`}
          className="my-3 p-3 bg-[#e8ded1]/50 dark:bg-[#2b221d] border-l-4 border-[#800f13] text-xs sm:text-sm italic font-serif leading-relaxed text-[#3a2e26] dark:text-[#e8ded1]"
        >
          {renderInline(quoteText)}
        </blockquote>
      );
      return;
    }

    // Headers
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h5 key={`h5-${idx}`} className="font-bold text-sm sm:text-base text-[#800f13] mt-3 mb-1 font-serif flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#800f13] rounded-full inline-block" />
          {renderInline(trimmed.slice(5))}
        </h5>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${idx}`} className="font-bold text-base sm:text-lg text-[#590d10] mt-4 mb-2 pb-1 border-b border-[#b48c36]/30 font-serif">
          {renderInline(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${idx}`} className="font-bold text-lg sm:text-xl text-[#1c1917] mt-5 mb-2 font-serif">
          {renderInline(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={`h2-${idx}`} className="font-bold text-xl sm:text-2xl text-[#800f13] my-3 pb-2 border-b-2 border-[#800f13] font-serif tracking-wide text-center">
          {renderInline(trimmed.slice(2))}
        </h2>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${idx}`} className="text-xs sm:text-sm leading-relaxed my-1.5 text-[#211d1a]">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList(lines.length);

  return (
    <div className={`markdown-body text-[#1c1917] font-sans selection:bg-[#d4af37]/30 ${className}`}>
      {elements}
    </div>
  );
};
