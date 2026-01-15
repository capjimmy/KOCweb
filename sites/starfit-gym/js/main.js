/* ===================================================
   STARFIT GYM - Premium JavaScript
   Dynamic Animations, Video Background, Scroll Effects
   =================================================== */

// Supabase Configuration
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initVideoBackground();
    initParallax();
    initScrollToTop();
    initCounterAnimation();
    initContactForm();
    initMembershipCards();
    initProgramCards();
});

/* ===== Preloader ===== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });
}

/* ===== Navbar ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        elements.forEach((el, index) => {
            let fromVars = { opacity: 0 };

            if (el.classList.contains('fade-in')) {
                fromVars.y = 60;
            } else if (el.classList.contains('fade-in-left')) {
                fromVars.x = -60;
            } else if (el.classList.contains('fade-in-right')) {
                fromVars.x = 60;
            } else if (el.classList.contains('scale-in')) {
                fromVars.scale = 0.8;
            }

            gsap.fromTo(el, fromVars, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Stagger animations for grids
        gsap.utils.toArray('.membership-grid, .programs-grid, .trainers-grid').forEach(container => {
            const items = container.children;
            gsap.fromTo(items,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%'
                    }
                }
            );
        });

        // Hero animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 0.6, delay: 0.5 });
            gsap.from('.hero-title', { opacity: 0, y: 50, duration: 0.8, delay: 0.7 });
            gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.6, delay: 0.9 });
            gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 0.6, delay: 1.1 });
            gsap.from('.hero-stats', { opacity: 0, y: 30, duration: 0.6, delay: 1.3 });
        }
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }
}

/* ===== Video Background ===== */
function initVideoBackground() {
    const videoContainer = document.querySelector('.hero-video');
    if (!videoContainer) return;

    // Create video element with gym footage placeholder
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop';

    // Using a sample video URL (in production, use actual gym video)
    video.innerHTML = `
        <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-on-the-horizontal-bar-23601-large.mp4" type="video/mp4">
    `;

    videoContainer.appendChild(video);

    // Play video on load
    video.play().catch(e => {
        console.log('Autoplay prevented:', e);
        // Use poster image as fallback
        videoContainer.style.backgroundImage = `url(${video.poster})`;
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.style.backgroundPosition = 'center';
    });
}

/* ===== Parallax Effect ===== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    });
}

/* ===== Scroll to Top ===== */
function initScrollToTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===== Counter Animation ===== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target], .hero-stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * eased);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    }
}

/* ===== Membership Cards Interaction ===== */
function initMembershipCards() {
    const cards = document.querySelectorAll('.membership-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.style.transform = 'scale(0.95)');
            card.style.transform = 'scale(1.02) translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                if (c.classList.contains('featured')) {
                    c.style.transform = 'scale(1.05)';
                } else {
                    c.style.transform = 'scale(1)';
                }
            });
        });
    });
}

/* ===== Program Cards Interaction ===== */
function initProgramCards() {
    const cards = document.querySelectorAll('.program-card');

    cards.forEach(card => {
        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ===== Contact Form ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;

        const formData = {
            site_name: 'starfit_gym',
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]')?.value || '',
            subject: form.querySelector('[name="subject"]')?.value || '문의',
            message: form.querySelector('[name="message"]').value,
            created_at: new Date().toISOString()
        };

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showNotification('문의가 성공적으로 접수되었습니다!', 'success');
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('문의 접수 중 오류가 발생했습니다.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* ===== Notification ===== */
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '&#10004;' : '&#10006;'}</span>
        <span class="notification-text">${message}</span>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #FF1744)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            animation: slideUp 0.4s ease forwards;
        }
        @keyframes slideUp {
            to {
                transform: translateX(-50%) translateY(0);
            }
        }
        .notification-icon {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

/* ===== Smooth Scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== Dynamic Background Particles ===== */
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 23, 68, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize particles on hero section only
if (document.querySelector('.hero')) {
    initParticles();
}
