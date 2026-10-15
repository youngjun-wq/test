import React from 'react';

interface SilhouetteProps {
  type: string;
  className?: string;
  size?: number;
}

export const CharacterSilhouette: React.FC<SilhouetteProps> = ({ type, className = '', size = 120 }) => {
  // Render distinct artistic vintage silhouettes with aged photo grain
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-[#b48c36]/40 bg-[#1f1915] ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Vintage Photo Corner Cuts & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#b48c36]/10 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-1 border border-[#b48c36]/20 pointer-events-none" />

      {/* SVG Silhouette Figures */}
      {type === 'detective' && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#d4af37]/80 fill-current opacity-90 drop-shadow-md">
          {/* Fedora Hat */}
          <ellipse cx="50" cy="30" rx="34" ry="7" />
          <path d="M 28 30 Q 32 12 50 12 Q 68 12 72 30 Z" />
          <rect x="29" y="27" width="42" height="3" fill="#1f1915" />
          {/* Head & Collar */}
          <path d="M 38 33 Q 50 33 50 48 Q 50 58 38 60 Z" opacity="0.3" />
          <ellipse cx="50" cy="45" rx="14" ry="16" />
          {/* Round Glasses */}
          <circle cx="44" cy="43" r="4" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <circle cx="56" cy="43" r="4" fill="none" stroke="#f5ede1" strokeWidth="1.5" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#f5ede1" strokeWidth="1.5" />
          {/* Trench Coat Shoulders & Lapels */}
          <path d="M 12 120 L 22 75 L 36 65 L 50 78 L 64 65 L 78 75 L 88 120 Z" />
          <path d="M 36 65 L 44 95 L 50 82 L 56 95 L 64 65 Z" fill="#140f0c" />
        </svg>
      )}

      {type === 'singer' && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#e0a899]/85 fill-current opacity-90 drop-shadow-md">
          {/* Feather hairpiece */}
          <path d="M 62 25 Q 75 10 78 2 Q 72 15 65 24 Z" fill="#d4af37" />
          {/* Finger Wave Hairstyle */}
          <ellipse cx="50" cy="42" rx="20" ry="18" />
          <path d="M 32 38 Q 42 22 50 22 Q 62 22 68 36 Q 66 48 64 56 Q 36 56 32 38 Z" />
          {/* Face & Neck */}
          <path d="M 42 54 L 42 70 L 58 70 L 58 54 Z" />
          {/* Velvet dress neckline & pearl necklace */}
          <path d="M 16 120 L 28 85 Q 50 78 72 85 L 84 120 Z" />
          <path d="M 38 72 Q 50 82 62 72" fill="none" stroke="#f5ede1" strokeWidth="2.5" strokeDasharray="2 3" />
          <circle cx="34" cy="48" r="2.5" fill="#d4af37" />
        </svg>
      )}

      {type === 'manager' && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#c2b092]/80 fill-current opacity-90 drop-shadow-md">
          {/* Slicked Back Hair */}
          <path d="M 32 36 Q 50 18 68 36 Q 66 48 62 52 L 38 52 Z" />
          {/* Head & Jawline */}
          <ellipse cx="50" cy="42" rx="14" ry="16" />
          {/* High Collar & Tie */}
          <path d="M 40 60 L 50 72 L 60 60 L 54 56 L 46 56 Z" fill="#f5ede1" />
          <polygon points="48,65 52,65 53,88 50,92 47,88" fill="#9b2226" />
          {/* Vest & Tailored Suit */}
          <path d="M 14 120 L 26 72 L 42 66 L 50 85 L 58 66 L 74 72 L 86 120 Z" />
          {/* Pocket Watch Chain Arc */}
          <path d="M 38 95 Q 50 106 58 98" fill="none" stroke="#d4af37" strokeWidth="1.5" />
        </svg>
      )}

      {type === 'doctor' && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#a8b89d]/80 fill-current opacity-90 drop-shadow-md">
          {/* Traditional Gat/Hat or Scholar Topknot silhouette */}
          <ellipse cx="50" cy="22" rx="36" ry="5" />
          <rect x="38" y="10" width="24" height="13" rx="2" />
          {/* Head & Beard */}
          <ellipse cx="50" cy="42" rx="14" ry="15" />
          <path d="M 44 48 Q 50 64 56 48 Z" fill="#dcd6c8" />
          {/* Durumagi Traditional Robe Collar (Dongjeong) */}
          <path d="M 12 120 L 24 70 L 46 60 L 60 75 L 76 70 L 88 120 Z" />
          <path d="M 46 60 L 56 75 L 50 85 L 42 70 Z" fill="#f5ede1" />
          {/* Wire spectacles */}
          <circle cx="44" cy="40" r="3.5" fill="none" stroke="#d4af37" strokeWidth="1.2" />
          <circle cx="56" cy="40" r="3.5" fill="none" stroke="#d4af37" strokeWidth="1.2" />
          <line x1="47.5" y1="40" x2="52.5" y2="40" stroke="#d4af37" strokeWidth="1.2" />
        </svg>
      )}

      {type === 'scholar' && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#caa472]/85 fill-current opacity-90 drop-shadow-md">
          {/* Beret / Student Cap */}
          <ellipse cx="50" cy="24" rx="28" ry="10" />
          <path d="M 30 25 Q 50 14 66 22 L 68 28 L 32 28 Z" />
          {/* Face with Round Glasses */}
          <ellipse cx="50" cy="42" rx="14" ry="16" />
          <circle cx="43" cy="42" r="5" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <circle cx="57" cy="42" r="5" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <line x1="48" y1="42" x2="52" y2="42" stroke="#ffffff" strokeWidth="1.6" />
          {/* Scarf & Student Uniform */}
          <path d="M 36 60 Q 50 68 64 60 L 68 76 L 32 76 Z" fill="#8c2d2d" />
          <path d="M 14 120 L 26 76 L 40 68 L 50 78 L 60 68 L 74 76 L 86 120 Z" />
        </svg>
      )}

      {/* Fallback silhouette if custom type */}
      {!['detective', 'singer', 'manager', 'doctor', 'scholar'].includes(type) && (
        <svg viewBox="0 0 100 125" className="w-4/5 h-4/5 text-[#c2b092]/80 fill-current opacity-90 drop-shadow-md">
          <ellipse cx="50" cy="40" rx="16" ry="18" />
          <path d="M 18 120 L 28 78 L 50 70 L 72 78 L 82 120 Z" />
        </svg>
      )}

      {/* Seal mark on photo corner */}
      <div className="absolute bottom-1 right-1 text-[8px] border border-[#9b2226]/80 text-[#9b2226] px-1 py-0.2 rotate-[-6deg] font-serif bg-[#1f1915]/90">
        容疑
      </div>
    </div>
  );
};
