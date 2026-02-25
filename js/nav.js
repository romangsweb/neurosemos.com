/* ══════════════════════════════════════════
   NEUROSEMOS — Navigation Controller
   ══════════════════════════════════════════ */

export function initNav() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('.nav-link');
    const floatingCta = document.getElementById('floatingCta');
    const sections = document.querySelectorAll('.section, .hero');

    // ── Scroll Detection for Nav Background ──
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Nav background
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Floating CTA visibility (hide while hero is visible)
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (scrollY < heroBottom - 200) {
                floatingCta.classList.add('hidden');
            } else {
                floatingCta.classList.remove('hidden');
            }
        }

        // Active section highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.id;
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        lastScroll = scrollY;
    }, { passive: true });

    // ── Hamburger Toggle ──
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // ── Close on Link Click (Mobile) ──
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ── Close on Outside Click (Mobile) ──
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });

    // ── Initialize floating CTA state ──
    floatingCta.classList.add('hidden');
}
