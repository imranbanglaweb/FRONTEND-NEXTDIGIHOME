'use client';

import React, { useState } from 'react';

interface NextDigiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  customLogoUrl?: string | null;
  className?: string;
}

export default function NextDigiLogo({
  size = 'md',
  showText = true,
  subtitle = 'VENTURE ECOSYSTEM',
  customLogoUrl = null,
  className = '',
}: NextDigiLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  // Height mappings for flat, prominent visibility
  const heightMap = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16 md:h-18',
    lg: 'h-18 sm:h-20 md:h-24',
    xl: 'h-24 sm:h-28 md:h-32',
  };

  const iconSquareMap = {
    sm: 'h-9 w-9 sm:h-10 sm:w-10',
    md: 'h-12 w-12 sm:h-14 sm:w-14',
    lg: 'h-16 w-16 sm:h-18 sm:w-18',
    xl: 'h-22 w-22 sm:h-26 sm:w-26',
  };

  const titleSizeMap = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl md:text-[32px]',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
    xl: 'text-4xl sm:text-5xl md:text-6xl',
  };

  const subtitleSizeMap = {
    sm: 'text-[8.5px] tracking-[1.8px]',
    md: 'text-[10px] sm:text-[11px] tracking-[2.8px]',
    lg: 'text-xs tracking-[3.5px]',
    xl: 'text-sm tracking-[4px]',
  };

  const hasCustomLogo = Boolean(
    customLogoUrl &&
    !imageFailed
  );

  // If a valid custom logo exists from the backend API, render it with crisp sizing
  if (hasCustomLogo && customLogoUrl) {
    return (
      <div className={`relative flex items-center select-none ${heightMap[size]} ${className}`}>
        <img
          src={customLogoUrl}
          alt="NEXTDIGI"
          decoding="async"
          className="h-full w-auto max-h-10 sm:max-h-12 md:max-h-14 max-w-[240px] sm:max-w-[320px] object-contain transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  // Standalone Vector Brand (Folded Ribbon 'N' + NEXTDIGI Typography)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision 3D Folded Ribbon 'N' Emblem */}
      <div className={`relative flex-shrink-0 flex items-center justify-center ${iconSquareMap[size]}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_16px_rgba(0,212,170,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_22px_rgba(139,92,246,0.6)]"
        >
          <defs>
            <linearGradient id="ndLeftPillar" x1="16" y1="8" x2="16" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#00d4aa" />
            </linearGradient>
            <linearGradient id="ndDiagFold" x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="25%" stopColor="#00d4aa" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="ndRightPillar" x1="48" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="ndSpecularFold" x1="10" y1="8" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="ndGlowEffect" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00d4aa" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Right Pillar */}
          <rect x="42" y="8" width="12" height="48" rx="6" fill="url(#ndRightPillar)" />

          {/* Left Pillar */}
          <rect x="10" y="8" width="12" height="48" rx="6" fill="url(#ndLeftPillar)" />

          {/* Dynamic Folded Diagonal Ribbon */}
          <path
            d="M 10 14 C 10 10.7 12.7 8 16 8 C 17.8 8 19.4 8.8 20.5 10.1 L 47.5 45.9 C 48.6 47.2 49.2 48.8 49.2 50.5 C 49.2 53.5 46.8 56 43.8 56 C 42 56 40.4 55.2 39.3 53.9 L 12.5 18.1 C 10.9 16.9 10 15.6 10 14 Z"
            fill="url(#ndDiagFold)"
            filter="url(#ndGlowEffect)"
          />

          {/* Specular Ridge on Crest Fold */}
          <path
            d="M 10 14 C 10 10.7 12.7 8 16 8 C 17.8 8 19.4 8.8 20.5 10.1 L 28 20 L 22 25 L 10 14 Z"
            fill="url(#ndSpecularFold)"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-baseline gap-1 font-black tracking-tight leading-none">
            <span className={`text-white tracking-[-0.5px] ${titleSizeMap[size]}`}>
              NEXT
            </span>
            <span className={`bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent ${titleSizeMap[size]}`}>
              DIGI
            </span>
            <span className="text-[10px] font-bold text-[#00d4aa] ml-0.5 opacity-90 hidden sm:inline">
              HOME
            </span>
          </div>

          {subtitle && (
            <span className={`font-extrabold uppercase text-[#71717a] group-hover:text-[#00d4aa] transition-colors mt-1.5 leading-none ${subtitleSizeMap[size]}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
