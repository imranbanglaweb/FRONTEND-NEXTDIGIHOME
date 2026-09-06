const fs = require('fs');
const sharp = require('sharp');

// 1. Futuristic Faceted 'N' Monogram
const svgMonogram = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="mGrad1" x1="12" y1="8" x2="24" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#00d4aa"/>
    </linearGradient>
    <linearGradient id="mGrad2" x1="18" y1="12" x2="46" y2="52" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="mGrad3" x1="40" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="mGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#00d4aa" flood-opacity="0.4"/>
    </filter>
  </defs>
  
  <!-- Left Pillar -->
  <rect x="11" y="8" width="13" height="48" rx="6.5" fill="url(#mGrad1)"/>
  
  <!-- Central Dynamic Fold / Energy Diagonal -->
  <path d="M 20 9.5 L 45 47 C 46.5 49.3 45.8 52.4 43.5 53.9 C 42.8 54.4 42 54.6 41.2 54.6 L 33 54.6 L 17 14.5 C 15.5 12.2 16.2 9.1 18.5 7.6 C 19 7.3 19.5 7.1 20 7.1 Z" fill="url(#mGrad2)" filter="url(#mGlow)"/>
  
  <!-- Right Pillar -->
  <rect x="40" y="8" width="13" height="48" rx="6.5" fill="url(#mGrad3)"/>
</svg>
`;

// 2. Ultra-Sleek Dynamic Hexagon Prism with Forward Chevron
const svgHexPrism = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="hGrad1" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="50%" stop-color="#00d4aa"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="hGrad2" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <filter id="hGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#00d4aa" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Hexagon Outer Border Ring -->
  <polygon points="32,4 58,19 58,45 32,60 6,45 6,19" stroke="url(#hGrad1)" stroke-width="2.5" stroke-linejoin="round" fill="none" opacity="0.8"/>

  <!-- Dynamic Energy Bolt Core inside Hexagon -->
  <path d="M 37 10 L 17 34 L 31 34 L 27 54 L 47 28 L 33 28 Z" fill="url(#hGrad2)" filter="url(#hGlow)"/>
  <circle cx="31" cy="34" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #00f2fe)"/>
</svg>
`;

// 3. World-Class Dual-Blade Thunderbolt (Zero container, pure modern mark)
const svgDualBolt = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="dBolt1" x1="12" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#00d4aa"/>
    </linearGradient>
    <linearGradient id="dBolt2" x1="26" y1="24" x2="52" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <filter id="dGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#00d4aa" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Upper Energy Blade -->
  <path d="M 39 3 L 13 35 L 29 35 L 23 51 L 43 27 L 27 27 Z" fill="url(#dBolt1)" filter="url(#dGlow)"/>
  <!-- Specular Reflection -->
  <path d="M 39 3 L 26 21 L 27 27 L 32 15 Z" fill="#ffffff" opacity="0.6"/>
  <!-- Lower Echo Wing -->
  <path d="M 43 27 L 51 17 L 39 17 L 45 7 L 32 23 L 39 23 Z" fill="url(#dBolt2)" opacity="0.9"/>
</svg>
`;

async function main() {
  await sharp(Buffer.from(svgMonogram)).png().toFile('scratch/monogram.png');
  await sharp(Buffer.from(svgHexPrism)).png().toFile('scratch/hexprism.png');
  await sharp(Buffer.from(svgDualBolt)).png().toFile('scratch/dualbolt.png');
  console.log('Rendered 3 designs');
}

main();
