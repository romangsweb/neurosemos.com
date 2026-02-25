/* ══════════════════════════════════════════
   NEUROSEMOS — Emo SVG Icon Library
   Inline SVG icon generator functions
   ══════════════════════════════════════════ */

// All icons are hand-crafted line-art with emo aesthetic
// Uses currentColor so they inherit text color

const icons = {
    // ── Brain with thorns ──
    brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C9 2 7 4 7 6.5C5.5 6.5 4 8 4 10c0 1.5.8 2.8 2 3.5C5.5 14.5 5 16 5.5 17.5c.5 1.5 2 2.5 3.5 2.5h1V22h4v-2h1c1.5 0 3-1 3.5-2.5s0-3-.5-4c1.2-.7 2-2 2-3.5 0-2-1.5-3.5-3-3.5C17 4 15 2 12 2z"/>
    <path d="M12 2v20" opacity="0.3"/>
    <path d="M8.5 6.5c1.5 1 3 1.5 3.5 3" opacity="0.4"/>
    <path d="M15.5 6.5c-1.5 1-3 1.5-3.5 3" opacity="0.4"/>
    <line x1="2" y1="1" x2="4" y2="3" opacity="0.2"/>
    <line x1="22" y1="1" x2="20" y2="3" opacity="0.2"/>
    <line x1="1" y1="10" x2="3" y2="10" opacity="0.2"/>
  </svg>`,

    // ── Broken heart / healing ──
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21l-1.5-1.3C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.5 11.2L12 21z"/>
    <path d="M12 5l-2 4h4l-2 4" opacity="0.5"/>
  </svg>`,

    // ── Calendar with X / dark appointment ──
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <path d="M9 14l2 2 4-4" opacity="0.6"/>
  </svg>`,

    // ── Dark book / grimoire ──
    book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    <path d="M8 7h8M8 11h5" opacity="0.4"/>
    <circle cx="15" cy="13" r="1.5" opacity="0.3"/>
  </svg>`,

    // ── Dark shopping bag ──
    bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
    <line x1="12" y1="14" x2="12" y2="18" opacity="0.3"/>
    <line x1="10" y1="16" x2="14" y2="16" opacity="0.3"/>
  </svg>`,

    // ── Bandaged cross / first aid ──
    firstaid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <path d="M7 7l2 2M15 15l2 2M17 7l-2 2M7 17l2-2" opacity="0.2"/>
  </svg>`,

    // ── Dark speech bubble ──
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    <circle cx="9" cy="12" r="0.5" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="12" r="0.5" fill="currentColor" opacity="0.5"/>
    <circle cx="15" cy="12" r="0.5" fill="currentColor" opacity="0.5"/>
  </svg>`,

    // ── Dark lotus / meditation ──
    lotus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20c0-4-3-7-6-9 3-1 5-3 6-6 1 3 3 5 6 6-3 2-6 5-6 9z"/>
    <path d="M12 20c0-3 2-5.5 4.5-7.5" opacity="0.3"/>
    <path d="M12 20c0-3-2-5.5-4.5-7.5" opacity="0.3"/>
    <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.3"/>
  </svg>`,

    // ── Dark compass ──
    compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.15"/>
    <polygon points="14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76"/>
    <line x1="12" y1="2" x2="12" y2="4" opacity="0.3"/>
    <line x1="12" y1="20" x2="12" y2="22" opacity="0.3"/>
    <line x1="2" y1="12" x2="4" y2="12" opacity="0.3"/>
    <line x1="20" y1="12" x2="22" y2="12" opacity="0.3"/>
  </svg>`,

    // ── Dark waves ──
    waves: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
    <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity="0.6"/>
    <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity="0.3"/>
  </svg>`,

    // ── Building / in-person ──
    building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="1"/>
    <line x1="4" y1="22" x2="20" y2="22"/>
    <rect x="9" y="16" width="6" height="6"/>
    <line x1="12" y1="16" x2="12" y2="22" opacity="0.3"/>
    <rect x="8" y="6" width="3" height="3" opacity="0.4"/>
    <rect x="13" y="6" width="3" height="3" opacity="0.4"/>
    <rect x="8" y="11" width="3" height="3" opacity="0.4"/>
    <rect x="13" y="11" width="3" height="3" opacity="0.4"/>
  </svg>`,

    // ── Monitor / online ──
    monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <circle cx="12" cy="10" r="2" opacity="0.4"/>
    <path d="M12 8v-1" opacity="0.3"/>
  </svg>`,

    // ── Phone ──
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3"/>
    <line x1="5" y1="18" x2="19" y2="18" opacity="0.3"/>
    <circle cx="12" cy="20" r="0.5" fill="currentColor" opacity="0.4"/>
    <line x1="9" y1="5" x2="15" y2="5" opacity="0.3"/>
  </svg>`,

    // ── Upload arrow ──
    upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17,8 12,3 7,8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>`,

    // ── Credit card ──
    card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
    <line x1="6" y1="15" x2="10" y2="15" opacity="0.4"/>
    <line x1="14" y1="15" x2="18" y2="15" opacity="0.3"/>
  </svg>`,

    // ── Paperclip / attach ──
    clip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
  </svg>`,

    // ── Sparkle / celebration ──
    sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
  </svg>`,

    // ── Check circle ──
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>`,

    // ── Dark star / emo star ──
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2l3 6.5 7 1-5 4.9 1.2 7.1L12 18l-6.2 3.5L7 14.4 2 9.5l7-1z"/>
  </svg>`,

    // ── Skull (subtle, elegant) ──
    skull: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="10" r="8"/>
    <circle cx="9" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
    <circle cx="15" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M8 18h8v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2z"/>
    <line x1="10" y1="18" x2="10" y2="22" opacity="0.3"/>
    <line x1="14" y1="18" x2="14" y2="22" opacity="0.3"/>
    <path d="M10 14c.5.5 1.5 1 2 1s1.5-.5 2-1" opacity="0.4"/>
  </svg>`,

    // ── Rose / dark flower ──
    rose: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3c-1 2-3 3-3 5s2 4 3 4 3-2 3-4-2-3-3-5z"/>
    <path d="M9 8c-2 0-4 1-4 3s2 4 4 4" opacity="0.5"/>
    <path d="M15 8c2 0 4 1 4 3s-2 4-4 4" opacity="0.5"/>
    <line x1="12" y1="15" x2="12" y2="22"/>
    <path d="M12 18l-3-2" opacity="0.4"/>
    <path d="M12 20l3-2" opacity="0.4"/>
  </svg>`,

    // ── Moon / crescent ──
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>`,

    // ── Chain link (WhatsApp alternative) ──
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>`,
};

/**
 * Generate an icon HTML string
 * @param {string} name - Icon name from the icons object
 * @param {string} [sizeClass] - Size class: ico-sm, ico-md, ico-lg, ico-xl, ico-2xl, ico-3xl
 * @returns {string} HTML string
 */
export function icon(name, sizeClass = '') {
    const svgContent = icons[name];
    if (!svgContent) {
        console.warn(\`Icon "\${name}" not found\`);
    return '';
  }
  return \`<span class="ico \${sizeClass}" aria-hidden="true">\${svgContent}</span>\`;
}

/**
 * Replace all [icon:name:size] placeholders in the DOM
 */
export function hydrateIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    const size = el.dataset.iconSize || '';
    el.innerHTML = icons[name] || '';
    el.classList.add('ico');
    if (size) el.classList.add(size);
    el.setAttribute('aria-hidden', 'true');
  });
}

export { icons };
