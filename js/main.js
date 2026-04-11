/* ═══════════════════════════════════════════
   Anushka Joshi | Portfolio — main.js
   ═══════════════════════════════════════════ */

/* ── Highlight active nav link on scroll ── */
const sections  = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.sidebar-nav a');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach((sec) => observer.observe(sec));

/* ── Smooth-scroll for sidebar nav links ── */
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ── Set "Home" active by default on page load ── */
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.sidebar-nav a[href="#"]');
    if (homeLink) homeLink.classList.add('active');
});

/* ── Publications filter ── */
(function () {
    let activeType = 'all';
    let activeYear = 'all';

    function applyFilters() {
        document.querySelectorAll('#pubList .pub-item').forEach((item) => {
            const typeMatch = activeType === 'all' || item.dataset.type === activeType;
            const yearMatch = activeYear === 'all' || item.dataset.year === activeYear;
            item.classList.toggle('hidden', !(typeMatch && yearMatch));
        });
    }

    document.querySelectorAll('.pub-filter .filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pub-filter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeType = btn.dataset.filter;
            applyFilters();
        });
    });

    const yearSelect = document.getElementById('yearFilter');
    if (yearSelect) {
        yearSelect.addEventListener('change', () => {
            activeYear = yearSelect.value;
            applyFilters();
        });
    }
})();
