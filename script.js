document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. OBSŁUGA MENU MOBILNEGO (BURGER)
    // ==========================================
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Zamknięcie menu po kliknięciu w jakikolwiek link (bardzo ważne na telefonach)
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // ==========================================
    // 2. EFEKT SCROLL NA NAVBARZE
    // ==========================================
    const navbar = document.querySelector('.navbar'); 
    const hero = document.querySelector('.hero-premium'); // Dopasowane do Twojego HTML!

    if (navbar && hero) {
        window.addEventListener('scroll', () => {
            const heroBottom = hero.getBoundingClientRect().bottom;

            // Kiedy dół sekcji hero osiąga 0 (lub górę ekranu), navbar dostaje mocne tło
            if (heroBottom <= 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // 3. ANIMACJE REVEAL DLA LEWEJ STRONY
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }

});