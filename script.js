document.addEventListener('DOMContentLoaded', function () {
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', function (e) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    let isArabic = true;
    const textsAr = ['مطور ويب', 'مصمم واجهات', 'حلول رقمية', 'مبرمج محترف'];
    const textsEn = ['Web Developer', 'UI Designer', 'Digital Solutions', 'Pro Coder'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    function type() {
        const texts = isArabic ? textsAr : textsEn;
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    const langToggle = document.getElementById('langToggle');

    langToggle.addEventListener('click', function () {
        isArabic = !isArabic;
        const body = document.body;
        const html = document.documentElement;

        if (isArabic) {
            html.lang = 'ar';
            html.dir = 'rtl';
            body.dir = 'rtl';
            langToggle.textContent = 'EN';
        } else {
            html.lang = 'en';
            html.dir = 'ltr';
            body.dir = 'ltr';
            langToggle.textContent = 'AR';
        }

        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            if (isArabic) {
                el.textContent = el.dataset.ar;
            } else {
                el.textContent = el.dataset.en;
            }
        });

        const nameAr = document.querySelector('.name-ar');
        const nameEn = document.querySelector('.name-en');
        if (nameAr && nameEn) {
            nameAr.style.display = isArabic ? 'block' : 'none';
            nameEn.style.display = isArabic ? 'none' : 'block';
        }

        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
    });

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card, .skill-card, .project-card, .service-card, .contact-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const cards = document.querySelectorAll('.about-card, .project-card, .service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--text);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    const counters = document.querySelectorAll('.stat-number');
    let counted = false;

    function countUp() {
        if (counted) return;

        const heroSection = document.getElementById('home');
        const heroRect = heroSection.getBoundingClientRect();

        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            counted = true;

            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                let current = 0;
                const increment = target / 50;
                const suffix = counter.textContent.includes('+') ? '+' : '';

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', countUp);
    countUp();
});
