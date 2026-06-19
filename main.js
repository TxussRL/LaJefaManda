/* ========================================
   LA JEFA — JavaScript
   Selector de idioma + Animaciones
   ======================================== */

// ===== TRADUCCIONES =====
const translations = {
    es: {
        tagline: 'Tartas artesanales hechas con productos naturales',
        sectionCakes: 'Tartas Medianas',
        sectionSlices: 'Porciones',
        badgePopular: 'Popular',
        badgeNew: 'Novedad',
        cake1: 'Tarta de LaJefa (Clasica)',
        cake2: 'Tarta de Kinder',
        cake3: 'Tarta de Chocolte Blanco o Pistacho',
        cake4: 'Tarta de Lotus',
        cake5: 'Tarta de Nutella',
        cake6: 'Tarta de ChocoTorta',
        cake7: 'Tarta de Oreo',
        cake8: 'Tarta Pantera Rosa',
        cake9: 'Tarta de Intensa (Queso Gorgonzola)',
        sliceJefa: 'Porción de La Jefa',
        sliceSpecial: 'Porción Especial',
        badgeSpecial: 'Especial',
        footerText: 'Hecho con productos naturales y artesanales en el obrador de palamós.',
    },
    ca: {
        tagline: 'Pastissos artesanals fets amb productes naturals',
        sectionCakes: 'Pastissos Mitjans',
        sectionSlices: 'Porcions',
        badgePopular: 'Popular',
        badgeNew: 'Novetat',
        cake1: 'Pastís de LaJefa (Clàssica)',
        cake2: 'Pastís de Kinder',
        cake3: 'Pastís de Xocolata Blanca o Festuc',
        cake4: 'Pastís de Lotus',
        cake5: 'Pastís de Nutella',
        cake6: 'Pastís de XocoTorta',
        cake7: 'Pastís d’Oreo',
        cake8: 'Pastís de la Pantera Rosa',
        cake9: 'Pastís Intensa (Formatge Gorgonzola)',
        sliceJefa: 'Porció de La Jefa',
        sliceSpecial: 'Porció Especial',
        badgeSpecial: 'Especial',
        footerText: 'Fet amb productes naturals i artesanals en l\'obrador de palamós.',
    },
    en: {
        tagline: 'Artisan cakes made with natural products',
        sectionCakes: 'Medium Cakes',
        sectionSlices: 'Slices',
        badgePopular: 'Popular',
        badgeNew: 'New',
        cake1: 'LaJefa Cake (Classic)',
        cake2: 'Kinder Cake',
        cake3: 'White Chocolate or Pistachio Cake',
        cake4: 'Lotus Cake',
        cake5: 'Nutella Cake',
        cake6: 'ChocoTorta Cake',
        cake7: 'Oreo Cake',
        cake8: 'Pink Panther Cake',
        cake9: 'Intense Cake (Gorgonzola Cheese)',
        sliceJefa: 'La Jefa Slice',
        sliceSpecial: 'Special Slice',
        badgeSpecial: 'Special',
        footerText: 'Made with natural and artisanal products in our Palamos pastry shop.',
    },
    fr: {
        tagline: 'Gâteaux artisanaux élaborés avec des produits naturels',
        sectionCakes: 'Gâteaux moyens',
        sectionSlices: 'Parts de gâteau',
        badgePopular: 'Populaire',
        badgeNew: 'Nouveau',
        cake1: 'Gâteau LaJefa (Classique)',
        cake2: 'Gâteau Kinder',
        cake3: 'Gâteau au Chocolat Blanc ou à la Pistache',
        cake4: 'Gâteau Lotus',
        cake5: 'Gâteau Nutella',
        cake6: 'Gâteau ChocoTorta',
        cake7: 'Gâteau Oreo',
        cake8: 'Gâteau Panthère Rose',
        cake9: 'Gâteau Intense (Fromage Gorgonzola)',
        sliceJefa: 'Part La Jefa',
        sliceSpecial: 'Part Spéciale',
        badgeSpecial: 'Spécial',
        footerText: 'Préparé avec des produits naturels et artisanaux dans notre pâtisserie de Palamós.',
    }
};

// ===== APLICAR IDIOMA =====
function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // Actualizar atributo lang en <html>
    document.documentElement.lang = lang;

    // Guardar preferencia
    localStorage.setItem('lajefa-lang', lang);

    // Actualizar botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ===== ANIMACIÓN DE ENTRADA CON INTERSECTION OBSERVER =====
function initCardAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// ===== EFECTO PARALLAX SUAVE EN EL HEADER =====
function initParallax() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 400) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
            header.style.opacity = 1 - (scrolled * 0.002);
        }
    }, { passive: true });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {

    // Botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.dataset.lang);
        });
    });

    // Recuperar idioma guardado (por defecto: español)
    const savedLang = localStorage.getItem('lajefa-lang') || 'es';
    applyLanguage(savedLang);

    initCardAnimations();
    initParallax();
});
