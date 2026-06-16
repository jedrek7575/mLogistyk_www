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



    console.log(" 1. Skrypt startuje...");

    document.addEventListener("DOMContentLoaded", () => {
        console.log(" 2. DOM załadowany. Szukam Supabase...");
        
        // Zabezpieczenie przed brakiem biblioteki
        if (!window.supabase) {
            console.error(" BŁĄD KRYTYCZNY: Biblioteka Supabase nie pobrała się z CDN!");
            return;
        }
        console.log(" 3. Supabase załadowane pomyślnie.");
        
        const supabaseUrl = 'https://ejkkpiuigladcwwodyvt.supabase.co'; 
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqa2twaXVpZ2xhZGN3d29keXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1OTM0NjgsImV4cCI6MjA4NTE2OTQ2OH0.MmXnosIOfvFINvG6oCJPxObW_dmLPxbWqCF_vftH5J8';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

        const formSupa = document.getElementById('premiumForm');
        
        if (!formSupa) {
            console.error(" BŁĄD KRYTYCZNY: Nie znaleziono formularza o ID 'premiumForm'!");
            return;
        }
        console.log(" 4. Formularz znaleziony. Podpinam akcję pod przycisk WYŚLIJ.");

        formSupa.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            console.log("🔥 5. PRZYCISK KLIKNIĘTY! Zatrzymano odświeżanie strony.");
            
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="material-symbols-outlined" style="animation: bounceDown 1s infinite;">sync</span> WYSYŁANIE...';
            submitBtn.disabled = true;

            const nazwaFirmy = document.getElementById('input-nazwa').value.trim();
            const wyzwania = document.getElementById('input-wyzwania').value.trim();
            const emailVal = document.getElementById('input-email').value.trim();
            const phoneVal = document.getElementById('input-phone') ? document.getElementById('input-phone').value.trim() : '';
            let wiadomoscVal = document.getElementById('input-wiadomosc').value.trim();
            
            const preferowanyKontakt = document.getElementById('btn-email').classList.contains('active') ? 'E-mail' : 'Telefon';

            if (!wiadomoscVal) wiadomoscVal = "Brak dodatkowych pytań.";

            console.log(" 6. Dane zebrane, wysyłam do Supabase...");

            try {
                const { data, error } = await supabase
                    .from('nowe_kontakty')
                    .insert([
                        {
                            nazwa_firmy: nazwaFirmy,
                            branza: "Brak danych", 
                            wyzwania: wyzwania,
                            preferowany_kontakt: preferowanyKontakt,
                            email: emailVal || null,     
                            telefon: phoneVal || null, 
                            wiadomosc: wiadomoscVal
                        }
                    ]);

                if (error) {
                    console.error(" 7. BŁĄD BAZY DANYCH:", error);
                    throw error;
                }

                console.log(" 8. SUKCES! Dane zapisane w bazie.");
                
                formSupa.style.display = 'none';
                const formDesc = document.querySelector('.form-desc');
                if (formDesc) formDesc.style.display = 'none';
                document.getElementById('success-msg').style.display = 'block';

            } catch (error) {
                alert("Błąd wysyłania (sprawdź konsolę po szczegóły).");
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });
