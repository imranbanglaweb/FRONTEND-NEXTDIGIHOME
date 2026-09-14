// app/components/TrackedCTA.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { trackCtaClick } from '../utils/analytics';

interface TrackedCTAProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  ctaName: string;
  ctaLocation: 'hero' | 'mid_page' | 'case_study' | 'final_cta' | 'sticky_nav' | 'header' | 'footer' | string;
  service?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
  title?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export default function TrackedCTA({
  href,
  onClick,
  ctaName,
  ctaLocation,
  service,
  className,
  children,
  id,
  title,
  target,
  rel,
  style,
}: TrackedCTAProps) {
  const handleClick = (e: React.MouseEvent) => {
    const pagePath = typeof window !== 'undefined' ? window.location.pathname : '/';

    trackCtaClick({
      cta_name: ctaName,
      cta_location: ctaLocation,
      service,
      page_path: pagePath,
    });

    if (onClick) {
      onClick(e);
    }
  };

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        title={title}
        target={target}
        rel={rel}
        onClick={handleClick}
        className={className}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id={id}
      title={title}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
