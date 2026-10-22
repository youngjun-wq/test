import React from 'react';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
  // Parse inline text with bolding (**text**) and Card badges (【추가 정보 카드...】)
  const renderInline = (text: string) => {
    // Regex matching bold **...**, card tags 【...】, and stars/hashes ★/#
    const parts = text.split(/(\*\*[^*]+\*\*|【[^】]+】|★\s*달성[□]?|#\s*달성[□]?|달성□)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-[#800f13] dark:text-[#d4af37]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('【') && part.endsWith('】')) {
        const isCard = part.includes('추가 정보 카드') || part.includes('카드');
        return (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 mx-1 px-2 py-0.5 font-bold font-serif text-xs rounded-xs shadow-xs ${
              isCard
                ? 'bg-[#800f13] text-[#fefae0] border border-[#d4af37]'
                : 'bg-[#2b221d] text-[#e8dfcc] border border-[#b48c36]/60'
            }`}
          >
            {isCard && <span className="text-[11px]">🎴</span>}
            {part}
          </span>
        );
      }
      if (part.includes('★') || part.includes('#')) {
        const isStar = part.includes('★');
        return (
          <span
            key={idx}
            className={`inline-block px-1.5 py-0.5 mx-1 font-bold text-xs rounded-xs border shadow-xs ${
              isStar
                ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#9b6a00]'
                : 'bg-[#9b2226]/20 border-[#9b2226] text-[#9b2226]'
            }`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Preprocess text to ensure card acquisition directives stand out as separate blocks
  const normalizedContent = (content || '').replace(
    /((?:당신은\s*)?(?:즉시\s*)?【추가 정보 카드[^】]+】(?:을|를)?\s*(?:획득한다|손에 넣는다|활용하자|확인해도 좋다)[^.\n]*\.?)/g,
    '\n\n$1\n\n'
  );

  const lines = normalizedContent.split('\n');
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

    // Special Callout for Card Actions / Card Acquisition
    const isCardAction =
      (trimmed.includes('【추가 정보 카드') || trimmed.includes('추가 정보 카드 No.')) &&
      (trimmed.includes('획득') || trimmed.includes('받을 가능성') || trimmed.includes('활용') || trimmed.includes('확인') || trimmed.includes('가져갈 경우'));

    if (isCardAction) {
      elements.push(
        <div
          key={`card-box-${idx}`}
          className="my-3.5 p-3.5 bg-gradient-to-r from-[#fbf2dd] to-[#f5e5c7] border-2 border-[#b48c36] shadow-md rounded-xs text-[#1c1917] flex items-start gap-3 relative overflow-hidden font-sans"
        >
          <div className="w-8 h-8 rounded-full bg-[#800f13] border-2 border-[#d4af37] text-white flex items-center justify-center shrink-0 text-base shadow-sm mt-0.5 animate-pulse">
            🎴
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold font-serif text-[#800f13] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <span>[추가 정보 카드 액션 안내]</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold leading-relaxed text-[#1c1917]">
              {renderInline(trimmed)}
            </div>
          </div>
        </div>
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
