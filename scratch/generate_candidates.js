const fs = require('fs');

// Candidate A: Precision Dual-Facet Cyber Blade (Supabase/Linear hybrid with N-monogram hints)
const svgA = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="gradA1" x1="16" y1="4" x2="36" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#00d4aa"/>
    </linearGradient>
    <linearGradient id="gradA2" x1="24" y1="24" x2="48" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="60%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <filter id="glowA" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00d4aa" flood-opacity="0.35"/>
    </feDropShadow>
  </defs>
  <!-- Upper Blade -->
  <path d="M 37 4 L 14 33 L 29 33 L 24 45 L 39 26 L 27 26 Z" fill="url(#gradA1)" filter="url(#glowA)" />
  <!-- Lower Mirror / Energy Echo forming N -->
  <path d="M 27 60 L 50 31 L 35 31 L 40 19 L 25 38 L 37 38 Z" fill="url(#gradA2)" opacity="0.95" />
</svg>
`;

// Candidate B: Next-Gen Isometric "N" Ribbon with Dynamic Energy Cut (Venture Ecosystem)
const svgB = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="gradB1" x1="8" y1="8" x2="22" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#00d4aa"/>
    </linearGradient>
    <linearGradient id="gradB2" x1="14" y1="8" x2="50" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="gradB3" x1="42" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="glowB" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#00d4aa" flood-opacity="0.4"/>
    </filter>
  </defs>
  <!-- Left Pillar -->
  <path d="M 12 14 C 12 10.7 14.7 8 18 8 L 22 8 C 24.2 8 26 9.8 26 12 L 26 52 C 26 54.2 24.2 56 22 56 L 18 56 C 14.7 56 12 53.3 12 50 Z" fill="url(#gradB1)"/>
  <!-- Central Dynamic Energy Slash / Fold -->
  <path d="M 22 8 L 46 44 C 47.5 46.2 46.8 49.3 44.5 50.8 C 43.8 51.3 43 51.5 42.2 51.5 L 36 51.5 L 18 20 C 16.5 17.8 17.2 14.7 19.5 13.2 C 20.2 12.7 21 12.5 21.8 12.5 Z" fill="url(#gradB2)" filter="url(#glowB)"/>
  <!-- Right Pillar -->
  <path d="M 38 12 C 38 9.8 39.8 8 42 8 L 46 8 C 49.3 8 52 10.7 52 14 L 52 50 C 52 53.3 49.3 56 46 56 L 42 56 C 39.8 56 38 54.2 38 52 Z" fill="url(#gradB3)"/>
</svg>
`;

// Candidate C: Modernized Original Lightning Bolt (Zero background, 3D Chamfer & Prism Bevels)
const svgC = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256" fill="none">
  <defs>
    <linearGradient id="gradC1" x1="16" y1="4" x2="48" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="35%" stop-color="#00d4aa"/>
      <stop offset="70%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="gradC2" x1="10" y1="10" x2="34" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#00d4aa" stop-opacity="0"/>
    </linearGradient>
    <filter id="glowC" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#00d4aa" flood-opacity="0.45"/>
    </filter>
  </defs>
  <!-- Main High-Precision Lightning Mark -->
  <path d="M 36 3 L 13 34 L 28 34 L 24 61 L 51 27 L 34 27 Z" fill="url(#gradC1)" filter="url(#glowC)" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" stroke-linejoin="round"/>
  <!-- Specular Facet Bevel (Left Wing) -->
  <path d="M 36 3 L 13 34 L 28 34 L 32 30 L 33 8 Z" fill="url(#gradC2)" opacity="0.7"/>
  <!-- Ambient Core Spark -->
  <circle cx="28" cy="34" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 4px #00f2fe)"/>
</svg>
`;

fs.writeFileSync('preview-candidates.html', `
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0f0f12; color: white; font-family: system-ui, sans-serif; display: flex; gap: 40px; padding: 40px; align-items: center; justify-content: center; }
  .card { background: #18181c; border: 1px solid #2a2a30; border-radius: 16px; padding: 24px; text-align: center; }
  .header-sim { background: #0f0f12; border: 1px solid #2a2a30; padding: 12px 24px; border-radius: 12px; display: flex; align-items: center; gap: 12px; margin-top: 16px; }
</style>
</head>
<body>
  <div class="card">
    <h3>Design A: Dual Energy Blade</h3>
    ${svgA}
  </div>
  <div class="card">
    <h3>Design B: Dynamic 'N' Ribbon</h3>
    ${svgB}
  </div>
  <div class="card">
    <h3>Design C: High-End Polished Bolt</h3>
    ${svgC}
  </div>
</body>
</html>
`);
console.log('Candidates written to preview-candidates.html');
