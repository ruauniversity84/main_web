(function () {
    const config = window.SITE_CONFIG || {};
    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('floating-menu-btn');
    const closeButton = document.querySelector('.close-btn');
    const backdrop = document.querySelector('.menu-backdrop');

    const setText = (selector, value) => {
        if (!value) return;
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    };

    const setLinks = (selector, value) => {
        if (!value) return;
        document.querySelectorAll(selector).forEach((element) => {
            element.href = value;
        });
    };

    setText('[data-site-name]', config.siteName);
    setText('[data-site-tagline]', config.tagline);
    setText('[data-current-year]', new Date().getFullYear());

    if (config.heroTitle) {
        document.querySelectorAll('[data-hero-title]').forEach((element) => {
            element.innerHTML = config.heroTitle;
        });
    }
    if (config.heroDescription) {
        document.querySelectorAll('[data-hero-description]').forEach((element) => {
            element.innerHTML = config.heroDescription;
        });
    }
    if (config.contactEmail) {
        document.querySelectorAll('[data-contact-email]').forEach((element) => {
            element.textContent = config.contactEmail;
            element.href = 'mailto:' + config.contactEmail;
        });
        setLinks('[data-contact-link]', 'mailto:' + config.contactEmail);
    }
    setLinks('[data-form-link]', config.feedbackFormUrl);

    const heroImage = document.querySelector('[data-hero-image]');
    const imageWrap = document.querySelector('.visual-image-wrap');
    if (heroImage && imageWrap && config.heroImage) {
        heroImage.alt = config.heroImageAlt || '';
        heroImage.addEventListener('load', () => imageWrap.classList.add('has-image'));
        heroImage.addEventListener('error', () => imageWrap.classList.remove('has-image'));
        heroImage.src = config.heroImage;
    }

    function closeMenu() {
        if (!menu) return;
        menu.classList.remove('active');
        backdrop?.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuButton?.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        if (!menu) return;
        menu.classList.add('active');
        backdrop?.classList.add('active');
        document.body.classList.add('menu-open');
        menuButton?.setAttribute('aria-expanded', 'true');
    }

    menuButton?.addEventListener('click', openMenu);
    closeButton?.addEventListener('click', closeMenu);
    backdrop?.addEventListener('click', closeMenu);
    document.querySelectorAll('#menu a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    // PCのみ：スクロール時にナビゲーションを固定
    const siteHeader = document.querySelector('.site-header');

    function updateHeader() {
        if (!siteHeader) return;

        if (window.innerWidth > 700) {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    window.addEventListener('resize', updateHeader);

    updateHeader();

})();
