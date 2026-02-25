/* ══════════════════════════════════════════
   NEUROSEMOS — Main Entry Point
   ══════════════════════════════════════════ */

import { initNav } from './nav.js';
import { initParticles } from './particles.js';
import { initAnimations } from './animations.js';
import { initMarketplace } from './marketplace.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initParticles();
    initAnimations();
    initMarketplace();
});
