import React, { useState } from 'react';

interface SilhouetteProps {
  type: string;
  imageUrl?: string;
  altName?: string;
  className?: string;
  size?: number;
}

export const CharacterSilhouette: React.FC<SilhouetteProps> = ({
  type,
  imageUrl,
  altName,
  className = '',
  size = 120,
}) => {
  const [imageError, setImageError] = useState(false);

  // If a valid image URL is provided, display the character photo with a vintage portrait frame
  if (imageUrl && !imageError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden border-2 border-[#b48c36]/70 bg-[#171310] shadow-md group rounded-sm ${className}`}
        style={{ width: size, height: size * 1.25 }}
      >
        <img
          src={imageUrl}
          alt={altName || type}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        {/* Subtle vintage film noir vignette & ornamental inner border */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute inset-0.5 border border-[#b48c36]/40 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-[#b48c36]/40 bg-[#171310] rounded-sm ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Vintage Photo Corner Cuts & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#b48c36]/10 via-transparent to-black/85 pointer-events-none" />
      <div className="absolute inset-1 border border-[#b48c36]/20 pointer-events-none" />

      {/* 1. 베테랑 형사 (detective) */}
      {(type === 'detective' || type === 'char_detective') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#d4af37]/80 fill-current opacity-90 drop-shadow-md">
          {/* Fedora Hat */}
          <ellipse cx="50" cy="30" rx="35" ry="7" />
          <path d="M 28 30 Q 32 12 50 12 Q 68 12 72 30 Z" />
          <rect x="29" y="27" width="42" height="3" fill="#171310" />
          {/* Head & Glasses */}
          <ellipse cx="50" cy="46" rx="14" ry="16" />
          <circle cx="44" cy="45" r="3.5" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <circle cx="56" cy="45" r="3.5" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <line x1="48" y1="45" x2="52" y2="45" stroke="#f5ede1" strokeWidth="1.5" />
          {/* Heavy Trench Coat Shoulders & Lapels */}
          <path d="M 10 125 L 20 78 L 36 66 L 50 80 L 64 66 L 80 78 L 90 125 Z" />
          <path d="M 36 66 L 44 95 L 50 82 L 56 95 L 64 66 Z" fill="#0d0a08" />
        </svg>
      )}

      {/* 2. 미모의 괴도 (thief) */}
      {(type === 'thief' || type === 'char_thief' || type === 'singer') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#e0a899]/85 fill-current opacity-90 drop-shadow-md">
          {/* Dramatic Wide-Brim Hat with Plumage */}
          <path d="M 64 22 Q 78 8 82 2 Q 75 14 66 22 Z" fill="#d4af37" />
          <ellipse cx="50" cy="32" rx="38" ry="8" />
          <path d="M 30 32 Q 40 16 50 16 Q 60 16 70 32 Z" />
          {/* Elegant Head & Silhouette Veil */}
          <ellipse cx="50" cy="48" rx="13" ry="16" />
          <path d="M 44 54 Q 50 58 56 54" stroke="#d4af37" strokeWidth="1.5" fill="none" />
          {/* Velvet Cape & Shoulders */}
          <path d="M 15 125 L 28 82 Q 50 76 72 82 L 85 125 Z" />
          <path d="M 38 72 Q 50 82 62 72" fill="none" stroke="#f5ede1" strokeWidth="2" strokeDasharray="2 3" />
          <circle cx="50" cy="80" r="3" fill="#9b2226" />
        </svg>
      )}

      {/* 3. 전직 기자 (journalist) */}
      {(type === 'journalist' || type === 'char_journalist') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#c2b092]/80 fill-current opacity-90 drop-shadow-md">
          {/* Newsboy Flat Cap */}
          <ellipse cx="50" cy="32" rx="26" ry="12" />
          <path d="M 30 32 Q 40 18 58 24 Q 68 28 66 35 L 30 32 Z" />
          <ellipse cx="56" cy="33" rx="15" ry="4" fill="#0d0a08" />
          {/* Head & Wire Glasses */}
          <ellipse cx="50" cy="48" rx="14" ry="16" />
          <circle cx="45" cy="46" r="4" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <circle cx="55" cy="46" r="4" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <line x1="49" y1="46" x2="51" y2="46" stroke="#f5ede1" strokeWidth="1.5" />
          {/* Reporter Jacket with Fountain Pen in pocket */}
          <path d="M 12 125 L 24 78 L 38 68 L 50 78 L 62 68 L 76 78 L 88 125 Z" />
          <rect x="30" y="86" width="3" height="12" fill="#d4af37" rx="1" />
        </svg>
      )}

      {/* 4. 작가 (writer) */}
      {(type === 'writer' || type === 'char_writer' || type === 'scholar') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#bfa07e]/80 fill-current opacity-90 drop-shadow-md">
          {/* Disheveled Creative Hair */}
          <path d="M 32 40 Q 30 20 50 18 Q 70 20 68 40 Q 74 32 72 48 L 28 48 Q 26 32 32 40 Z" />
          <path d="M 28 44 Q 24 55 32 60 L 34 50 Z" />
          <ellipse cx="50" cy="48" rx="14" ry="17" />
          {/* Moody Collar & Cardigan */}
          <path d="M 14 125 L 26 80 L 38 70 L 50 82 L 62 70 L 74 80 L 86 125 Z" />
          <path d="M 44 82 L 50 125 L 56 82 Z" fill="#0d0a08" />
        </svg>
      )}

      {/* 5. 조수 (assistant) */}
      {(type === 'assistant' || type === 'char_assistant') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#e2c7a4]/85 fill-current opacity-90 drop-shadow-md">
          {/* Traditional Updo / Ribbon */}
          <ellipse cx="50" cy="24" rx="10" ry="8" fill="#d4af37" />
          <path d="M 32 38 Q 42 22 50 22 Q 58 22 68 38 Q 66 50 64 58 Q 36 58 32 38 Z" />
          {/* Face & Delicate Neck */}
          <ellipse cx="50" cy="48" rx="13" ry="15" />
          {/* Hakama Kimono Collar */}
          <path d="M 16 125 L 28 82 L 40 70 L 50 85 L 60 70 L 72 82 L 84 125 Z" />
          <path d="M 40 70 L 50 95 L 60 70 Z" fill="#140f0c" />
          <path d="M 46 80 L 54 92" stroke="#d4af37" strokeWidth="1.5" />
        </svg>
      )}

      {/* 6. 노인 청소부 (cleaner) */}
      {(type === 'cleaner' || type === 'char_cleaner') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#9e9282]/85 fill-current opacity-90 drop-shadow-md">
          {/* Stooped Elder Silhouette with Wispy White Beard */}
          <path d="M 34 38 Q 50 24 66 38 Q 64 54 60 58 Q 40 58 34 38 Z" />
          <ellipse cx="50" cy="46" rx="14" ry="15" />
          {/* Elder Beard */}
          <path d="M 42 54 Q 50 72 58 54 Q 50 62 42 54 Z" fill="#f5ede1" opacity="0.8" />
          {/* Stooped Hunchback Coat & Broom/Cane Handle */}
          <path d="M 8 125 L 22 84 L 38 72 L 50 82 L 62 72 L 78 84 L 92 125 Z" />
          {/* Wooden Cane */}
          <line x1="78" y1="70" x2="84" y2="125" stroke="#b48c36" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      {/* 7. 명탐정 가와즈야 세이지로 (frog / victim) */}
      {(type === 'frog' || type === 'victim' || type === 'kawazuya') && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#588157]/90 fill-current opacity-95 drop-shadow-md">
          {/* Silk Top Hat */}
          <rect x="36" y="14" width="28" height="22" fill="#171310" stroke="#b48c36" strokeWidth="1" />
          <ellipse cx="50" cy="36" rx="26" ry="5" fill="#171310" stroke="#b48c36" strokeWidth="1" />
          <rect x="36" y="30" width="28" height="3" fill="#9b2226" />
          {/* Frog Mask Features */}
          <ellipse cx="50" cy="52" rx="20" ry="16" fill="#3a5a40" />
          {/* Big Frog Eyes on Mask */}
          <circle cx="38" cy="42" r="7" fill="#283618" stroke="#d4af37" strokeWidth="1.5" />
          <circle cx="62" cy="42" r="7" fill="#283618" stroke="#d4af37" strokeWidth="1.5" />
          <circle cx="38" cy="42" r="3" fill="#000" />
          <circle cx="62" cy="42" r="3" fill="#000" />
          {/* Frog Mask Mouth slit */}
          <path d="M 38 58 Q 50 64 62 58" fill="none" stroke="#171310" strokeWidth="2" />
          {/* Formal Evening Cape & Bowtie */}
          <path d="M 12 125 L 26 78 L 38 68 L 50 82 L 62 68 L 74 78 L 88 125 Z" fill="#1b263b" />
          <polygon points="44,76 56,76 50,82" fill="#9b2226" />
        </svg>
      )}
    </div>
  );
};
