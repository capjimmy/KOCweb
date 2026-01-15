/* ===================================================
   SPARKLE BEAUTY - Premium JavaScript
   Cursor Sparkle Effects, 3D Product Rotation, Animations
   =================================================== */

// Supabase Configuration
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initCustomCursor();
    initSparkleEffect();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initProductCards3D();
    initWishlist();
    initScrollToTop();
    initCounterAnimation();
    initContactForm();
    initNewsletterForm();
    initParallax();
});

/* ===== Preloader ===== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
}

/* ===== Custom Cursor ===== */
function initCustomCursor() {
    // Skip on mobile
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .product-card, [data-cursor-hover]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ===== Sparkle Effect on Cursor ===== */
function initSparkleEffect() {
    if (window.innerWidth < 768) return;

    let lastSparkle = 0;
    const sparkleDelay = 50; // ms between sparkles

    const sparkleColors = ['#FF6EB4', '#FFD700', '#FF9A9E', '#FECFEF', '#E91E8C'];
    const sparkleShapes = [
        `<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>`,
        `<svg viewBox="0 0 24 24" width="10" height="10"><circle fill="currentColor" cx="12" cy="12" r="12"/></svg>`,
        `<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>`
    ];

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < sparkleDelay) return;
        lastSparkle = now;

        // Random chance to create sparkle
        if (Math.random() > 0.3) return;

        createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)];
        sparkle.style.left = x + (Math.random() - 0.5) * 30 + 'px';
        sparkle.style.top = y + (Math.random() - 0.5) * 30 + 'px';
        sparkle.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}

/* ===== Navbar ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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

    // Close on link click
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

        elements.forEach(el => {
            let fromVars = { opacity: 0 };

            if (el.classList.contains('fade-in')) {
                fromVars.y = 50;
            } else if (el.classList.contains('fade-in-left')) {
                fromVars.x = -50;
            } else if (el.classList.contains('fade-in-right')) {
                fromVars.x = 50;
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
        gsap.utils.toArray('.products-grid, .categories-grid, .testimonial-slider').forEach(container => {
            const items = container.children;
            gsap.fromTo(items,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%'
                    }
                }
            );
        });
    } else {
        // Fallback without GSAP
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

/* ===== Product Cards 3D Effect ===== */
function initProductCards3D() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const inner = card.querySelector('.product-card-inner');
        if (!inner) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ===== Wishlist Toggle ===== */
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.product-wishlist');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');

            // Create heart animation
            if (btn.classList.contains('active')) {
                createHeartBurst(e.clientX, e.clientY);
            }
        });
    });

    function createHeartBurst(x, y) {
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '&#10084;';
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                color: #E91E8C;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                animation: heartBurst 0.8s ease-out forwards;
                --angle: ${(i / 6) * 360}deg;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 800);
        }
    }
}

// Add heart burst animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(-50% + cos(var(--angle)) * 50px),
                calc(-50% + sin(var(--angle)) * 50px)
            ) scale(0);
        }
    }
`;
document.head.appendChild(heartStyle);

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
    const counters = document.querySelectorAll('.stat-number[data-target]');

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
            const eased = 1 - Math.pow(1 - progress, 3);
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
            site_name: 'sparkle_beauty',
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
                showNotification('문의가 성공적으로 접수되었습니다.', 'success');
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* ===== Newsletter Form ===== */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button');
        const email = input.value;

        if (!email) return;

        btn.textContent = '구독 중...';
        btn.disabled = true;

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    site_name: 'sparkle_beauty',
                    email: email,
                    created_at: new Date().toISOString()
                })
            });

            if (response.ok) {
                showNotification('뉴스레터 구독이 완료되었습니다!', 'success');
                input.value = '';
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            showNotification('구독 중 오류가 발생했습니다.', 'error');
        } finally {
            btn.textContent = '구독하기';
            btn.disabled = false;
        }
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
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #e91e8c)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
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
        notification.style.setProperty('--slide-distance', '100px');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

/* ===== Smooth Scroll for Anchor Links ===== */
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
