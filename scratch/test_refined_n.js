const fs = require('fs');
const sharp = require('sharp');

// Precision Math for Isometric Folded Ribbon 'N'
// Pillars: x=10..22 (left), x=42..54 (right). Both y=8..56, rx=6.
// Diagonal: Ribbon connecting top-left to bottom-right with 3D isometric layering.
const refinedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <!-- Left Pillar Gradient -->
    <linearGradient id="pLeft" x1="16" y1="8" x2="16" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#00d4aa"/>
    </linearGradient>

    <!-- Diagonal Fold Gradient -->
    <linearGradient id="pDiag" x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="25%" stop-color="#00d4aa"/>
      <stop offset="75%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>

    <!-- Right Pillar Gradient -->
    <linearGradient id="pRight" x1="48" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>

    <!-- Specular Highlight for Ribbon Fold -->
    <linearGradient id="pSpec" x1="10" y1="8" x2="30" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Ambient Cyber Glow -->
    <filter id="pGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#00d4aa" flood-opacity="0.45"/>
    </filter>

    <filter id="foldShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Right Pillar (Behind Diagonal) -->
  <rect x="42" y="8" width="12" height="48" rx="6" fill="url(#pRight)"/>

  <!-- Left Pillar (Base) -->
  <rect x="10" y="8" width="12" height="48" rx="6" fill="url(#pLeft)"/>

  <!-- Dynamic Energy Diagonal (Folds over Left Pillar, connects down into Right) -->
  <path
    d="M 10 14 C 10 10.7 12.7 8 16 8 C 17.8 8 19.4 8.8 20.5 10.1 L 47.5 45.9 C 48.6 47.2 49.2 48.8 49.2 50.5 C 49.2 53.5 46.8 56 43.8 56 C 42 56 40.4 55.2 39.3 53.9 L 12.5 18.1 C 10.9 16.9 10 15.6 10 14 Z"
    fill="url(#pDiag)"
    filter="url(#pGlow)"
  />

  <!-- Specular Sheen on Top Fold -->
  <path
    d="M 10 14 C 10 10.7 12.7 8 16 8 C 17.8 8 19.4 8.8 20.5 10.1 L 28 20 L 22 25 L 10 14 Z"
    fill="url(#pSpec)"
    opacity="0.6"
  />
</svg>
`;

async function main() {
  await sharp(Buffer.from(refinedSvg)).png().toFile('scratch/refined_n.png');
  console.log('Generated refined_n.png');
}

main();
