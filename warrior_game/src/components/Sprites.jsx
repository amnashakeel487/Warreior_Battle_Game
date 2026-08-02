export function PlayerSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="16" ry="4" fill="rgba(0,0,0,0.4)" />
      {/* Legs */}
      <rect x="20" y="46" width="10" height="26" rx="3" fill="#5a4a2f" />
      <rect x="30" y="46" width="10" height="26" rx="3" fill="#4a3d28" />
      {/* Body / Armour */}
      <rect x="16" y="24" width="28" height="28" rx="6" fill="#7a6a45" />
      <rect x="16" y="24" width="28" height="10" rx="4" fill="#c9a227" />
      {/* Shoulder pauldrons */}
      <ellipse cx="14" cy="30" rx="6" ry="5" fill="#c9a227" />
      <ellipse cx="46" cy="30" rx="6" ry="5" fill="#c9a227" />
      {/* Head */}
      <circle cx="30" cy="14" r="11" fill="#d8b48a" />
      {/* Helmet */}
      <path d="M19 12 a11 11 0 0 1 22 0 l-2 -2 a14 8 0 0 0 -18 0 z" fill="#4a3d28" />
      {/* Left arm */}
      <rect x="10" y="30" width="8" height="20" rx="3" fill="#7a6a45" />
      {/* Sword */}
      <rect x="42" y="16" width="6" height="40" rx="2" fill="#cfd6dc" />
      <rect x="41" y="14" width="8" height="6" rx="1" fill="#c9a227" />
      {/* Eyes */}
      <circle cx="26" cy="14" r="1.5" fill="#2a1a0a" />
      <circle cx="34" cy="14" r="1.5" fill="#2a1a0a" />
    </svg>
  );
}

/* ── Goblin – small and wiry ── */
function GoblinSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
      {/* Skinny legs */}
      <rect x="22" y="54" width="7" height="20" rx="3" fill="#3d5c2c" />
      <rect x="31" y="54" width="7" height="20" rx="3" fill="#2e4a20" />
      {/* Body */}
      <ellipse cx="30" cy="44" rx="13" ry="13" fill="#5c8a3f" />
      {/* Loincloth */}
      <path d="M20 52 q10 8 20 0" fill="#7a5c2a" />
      {/* Arms */}
      <rect x="8"  y="38" width="6" height="16" rx="3" fill="#5c8a3f" />
      <rect x="46" y="38" width="6" height="16" rx="3" fill="#5c8a3f" />
      {/* Dagger in right hand */}
      <rect x="50" y="48" width="3" height="12" rx="1" fill="#b0b8c0" />
      {/* Head */}
      <ellipse cx="30" cy="27" rx="12" ry="11" fill="#6aa04a" />
      {/* Big ears */}
      <ellipse cx="14" cy="26" rx="5" ry="7" fill="#5c8a3f" />
      <ellipse cx="46" cy="26" rx="5" ry="7" fill="#5c8a3f" />
      {/* Inner ears */}
      <ellipse cx="14" cy="26" rx="2.5" ry="4" fill="#c97070" />
      <ellipse cx="46" cy="26" rx="2.5" ry="4" fill="#c97070" />
      {/* Eyes – red & mean */}
      <circle cx="25" cy="26" r="3" fill="#cc2222" />
      <circle cx="35" cy="26" r="3" fill="#cc2222" />
      <circle cx="25" cy="26" r="1.2" fill="#1a0a0a" />
      <circle cx="35" cy="26" r="1.2" fill="#1a0a0a" />
      {/* Nose */}
      <ellipse cx="30" cy="30" rx="2" ry="1.5" fill="#3d5c2c" />
      {/* Grin */}
      <path d="M24 34 q6 5 12 0" stroke="#1a1710" strokeWidth="1.5" fill="none" />
      <rect x="27" y="33" width="2" height="3" rx="0.5" fill="#e8e0c8" />
      <rect x="31" y="33" width="2" height="3" rx="0.5" fill="#e8e0c8" />
    </svg>
  );
}

/* ── Goblin Shaman – robed with a staff ── */
function GoblinShamanSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
      {/* Robe / body */}
      <path d="M18 40 q-2 20 2 44 h20 q4 -24 2 -44 z" fill="#4a2f6a" />
      {/* Robe trim */}
      <path d="M18 40 q12 6 24 0" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      {/* Arms */}
      <rect x="8"  y="38" width="12" height="7" rx="3" fill="#4a2f6a" />
      <rect x="40" y="38" width="12" height="7" rx="3" fill="#4a2f6a" />
      {/* Staff */}
      <rect x="48" y="18" width="3" height="36" rx="1" fill="#7a5c30" />
      <circle cx="49.5" cy="16" r="6" fill="#7a2a8a" opacity="0.85" />
      <circle cx="49.5" cy="16" r="3.5" fill="#d070f0" />
      {/* Head */}
      <ellipse cx="30" cy="27" rx="11" ry="10" fill="#6aa04a" />
      {/* Big ears */}
      <ellipse cx="15" cy="27" rx="4" ry="6" fill="#5c8a3f" />
      <ellipse cx="45" cy="27" rx="4" ry="6" fill="#5c8a3f" />
      {/* Witch hat */}
      <polygon points="30,6 18,32 42,32" fill="#2a1a4a" />
      <rect x="16" y="32" width="28" height="4" rx="2" fill="#3d2a6a" />
      {/* Hat band */}
      <rect x="16" y="33" width="28" height="2" rx="1" fill="#c9a227" />
      {/* Eyes – glowing purple */}
      <circle cx="25" cy="27" r="3" fill="#9b30d0" />
      <circle cx="35" cy="27" r="3" fill="#9b30d0" />
      <circle cx="25" cy="27" r="1.3" fill="#1a0a2a" />
      <circle cx="35" cy="27" r="1.3" fill="#1a0a2a" />
      {/* Beard */}
      <path d="M24 34 q6 8 12 0" fill="#b0a080" />
    </svg>
  );
}

/* ── Orc – heavy-armoured brute ── */
function OrcSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="18" ry="4" fill="rgba(0,0,0,0.45)" />
      {/* Wide legs */}
      <rect x="17" y="50" width="12" height="24" rx="3" fill="#6b4a2f" />
      <rect x="31" y="50" width="12" height="24" rx="3" fill="#5a3d26" />
      {/* Big body */}
      <rect x="10" y="24" width="40" height="30" rx="8" fill="#8a6a4a" />
      {/* Chest plate */}
      <rect x="14" y="26" width="32" height="20" rx="5" fill="#4a3a28" />
      <rect x="14" y="26" width="32" height="7"  rx="4" fill="#7a6030" />
      {/* Wide arms */}
      <rect x="2"  y="28" width="11" height="22" rx="4" fill="#8a6a4a" />
      <rect x="47" y="28" width="11" height="22" rx="4" fill="#8a6a4a" />
      {/* Axe */}
      <rect x="50" y="18" width="4" height="30" rx="1" fill="#7a6030" />
      <path d="M50 18 q-10 2 -8 12 q10 -2 8 -12z" fill="#8a8a9a" />
      {/* Head */}
      <ellipse cx="30" cy="18" rx="15" ry="14" fill="#9a7a5a" />
      {/* Helmet */}
      <path d="M15 18 a15 14 0 0 1 30 0 l-2 -3 a16 10 0 0 0 -26 0 z" fill="#4a3a28" />
      {/* Eyes */}
      <circle cx="24" cy="18" r="3.5" fill="#cc3a1a" />
      <circle cx="36" cy="18" r="3.5" fill="#cc3a1a" />
      <circle cx="24" cy="18" r="1.5" fill="#1a0a00" />
      <circle cx="36" cy="18" r="1.5" fill="#1a0a00" />
      {/* Tusks */}
      <rect x="25" y="26" width="3" height="8" rx="1.5" fill="#e8e0c8" />
      <rect x="32" y="26" width="3" height="8" rx="1.5" fill="#e8e0c8" />
    </svg>
  );
}

/* ── Orc Warlord – crowned, bigger, scarred ── */
function OrcWarlordSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="19" ry="5" fill="rgba(0,0,0,0.5)" />
      {/* Legs */}
      <rect x="16" y="50" width="13" height="25" rx="3" fill="#5a3a20" />
      <rect x="31" y="50" width="13" height="25" rx="3" fill="#4a2e18" />
      {/* Armoured body */}
      <rect x="9" y="22" width="42" height="32" rx="8" fill="#7a5a3a" />
      {/* Spiked shoulder pads */}
      <ellipse cx="9"  cy="28" rx="8" ry="7" fill="#4a3020" />
      <ellipse cx="51" cy="28" rx="8" ry="7" fill="#4a3020" />
      <polygon points="6,21 9,14 12,21" fill="#8a8a9a" />
      <polygon points="48,21 51,14 54,21" fill="#8a8a9a" />
      {/* Chest engraving */}
      <path d="M18 30 q12 -6 24 0" stroke="#c9a227" strokeWidth="2" fill="none" />
      <path d="M18 36 q12 -6 24 0" stroke="#c9a227" strokeWidth="1" fill="none" />
      {/* Arms */}
      <rect x="1"  y="27" width="11" height="24" rx="4" fill="#7a5a3a" />
      <rect x="48" y="27" width="11" height="24" rx="4" fill="#7a5a3a" />
      {/* War hammer */}
      <rect x="49" y="10" width="4" height="36" rx="1" fill="#5a4020" />
      <rect x="44" y="10" width="14" height="12" rx="2" fill="#6a6a7a" />
      <rect x="44" y="10" width="14" height="4"  rx="2" fill="#9a9aaa" />
      {/* Head */}
      <ellipse cx="30" cy="16" rx="16" ry="14" fill="#9a7a5a" />
      {/* Crown */}
      <rect x="14" y="7" width="32" height="6" rx="2" fill="#c9a227" />
      <polygon points="17,7 20,1 23,7" fill="#c9a227" />
      <polygon points="27,7 30,1 33,7" fill="#c9a227" />
      <polygon points="37,7 40,1 43,7" fill="#c9a227" />
      <circle cx="20" cy="4" r="1.5" fill="#e05050" />
      <circle cx="30" cy="3" r="1.5" fill="#50e050" />
      <circle cx="40" cy="4" r="1.5" fill="#5050e0" />
      {/* Scar */}
      <path d="M26 14 l4 6" stroke="#5a2a10" strokeWidth="1.5" fill="none" />
      {/* Eyes – burning red */}
      <circle cx="23" cy="16" r="4" fill="#e03a0a" />
      <circle cx="37" cy="16" r="4" fill="#e03a0a" />
      <circle cx="23" cy="16" r="1.8" fill="#1a0500" />
      <circle cx="37" cy="16" r="1.8" fill="#1a0500" />
      {/* Tusks */}
      <rect x="24" y="24" width="4" height="9" rx="2" fill="#e8e0c8" />
      <rect x="32" y="24" width="4" height="9" rx="2" fill="#e8e0c8" />
    </svg>
  );
}

/* ── Inferno Dragon – full beast ── */
function DragonSprite() {
  return (
    <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="86" rx="22" ry="5" fill="rgba(0,0,0,0.5)" />
      {/* Tail */}
      <path d="M48 70 q18 -10 10 -30" stroke="#7a1a2a" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Wings */}
      <path d="M6 38 q-8 -22 10 -28 q6 14 14 14z" fill="#9c1a2a" opacity="0.9" />
      <path d="M54 38 q8 -22 -10 -28 q-6 14 -14 14z" fill="#9c1a2a" opacity="0.9" />
      {/* Wing membranes */}
      <path d="M6 38 q2 -14 10 -16 q4 8 10 10z" fill="#c0303a" opacity="0.6" />
      <path d="M54 38 q-2 -14 -10 -16 q-4 8 -10 10z" fill="#c0303a" opacity="0.6" />
      {/* Body */}
      <ellipse cx="30" cy="56" rx="22" ry="20" fill="#9c2a3a" />
      {/* Belly scales */}
      <ellipse cx="30" cy="60" rx="14" ry="13" fill="#c0503a" opacity="0.7" />
      {/* Legs */}
      <rect x="14" y="68" width="10" height="16" rx="4" fill="#7a1a2a" />
      <rect x="36" y="68" width="10" height="16" rx="4" fill="#7a1a2a" />
      {/* Claws left */}
      <path d="M14 84 l-4 4 m4-4 l0 5 m4-5 l4 4" stroke="#c8c0b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Claws right */}
      <path d="M36 84 l-4 4 m4-4 l0 5 m4-5 l4 4" stroke="#c8c0b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="23" y="32" width="14" height="18" rx="6" fill="#9c2a3a" />
      {/* Head */}
      <ellipse cx="30" cy="26" rx="16" ry="13" fill="#b03040" />
      {/* Horns */}
      <path d="M20 18 l-6 -14 3 -1 6 14z" fill="#4a1a0a" />
      <path d="M40 18 l6 -14 -3 -1 -6 14z" fill="#4a1a0a" />
      {/* Spines on back */}
      <path d="M24 36 l-2 -8 2 8z" fill="#6a1a1a" />
      <path d="M30 34 l-2 -10 2 10z" fill="#6a1a1a" />
      <path d="M36 36 l-2 -8 2 8z" fill="#6a1a1a" />
      {/* Eyes – yellow fire */}
      <ellipse cx="23" cy="24" rx="4" ry="4.5" fill="#f2a020" />
      <ellipse cx="37" cy="24" rx="4" ry="4.5" fill="#f2a020" />
      <ellipse cx="23" cy="24" rx="2"   ry="3"   fill="#1a0a00" />
      <ellipse cx="37" cy="24" rx="2"   ry="3"   fill="#1a0a00" />
      {/* Nostril fire */}
      <path d="M26 30 q4 6 8 0" fill="#f05010" opacity="0.8" />
      <circle cx="28" cy="30" r="1.5" fill="#f05010" />
      <circle cx="32" cy="30" r="1.5" fill="#f05010" />
      {/* Teeth */}
      <path d="M22 34 l2 4 2 -4 2 4 2 -4 2 4 2 -4 2 4" stroke="#e8e0c8" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function EnemySprite({ type }) {
  switch (type) {
    case 'goblin':        return <GoblinSprite />;
    case 'goblin-shaman': return <GoblinShamanSprite />;
    case 'orc':           return <OrcSprite />;
    case 'orc-warlord':   return <OrcWarlordSprite />;
    default:              return <DragonSprite />;
  }
}
