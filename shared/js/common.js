/* ============================================
   PREMIUM SHARED JAVASCRIPT
   Advanced interactions & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initScrollAnimations();
    initCustomCursor();
    initMagneticButtons();
    initParallax();
    initTabs();
    initModals();
    initCounters();
    init3DTilt();
});

function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                animateHero();
            }, 500);
        });
    } else {
        setTimeout(animateHero, 100);
    }
}

function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (heroTitle) tl.to(heroTitle, { opacity: 1, y: 0, duration: 1, delay: 0.2 });
        if (heroSubtitle) tl.to(heroSubtitle, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
        if (heroButtons) tl.to(heroButtons, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
    } else {
        [heroTitle, heroSubtitle, heroButtons].forEach((el, i) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 200 + i * 200);
            }
        });
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        animatedElements.forEach(el => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out'
            });
        });
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        animatedElements.forEach(el => observer.observe(el));
    }
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll('a, button, .btn, .card, .image-card, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

function initMagneticButtons() {
    document.querySelectorAll('.magnetic, .btn').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });
        el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
    });
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        parallaxElements.forEach(el => {
            gsap.to(el, {
                yPercent: 30, ease: 'none',
                scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });
    } else {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => { el.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)'; });
        });
    }
}

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.toggle('active', content.id === target);
            });
        });
    });
}

function initModals() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById(trigger.dataset.modal);
            if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
        });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count) || parseInt(el.textContent);
        const duration = 2000, step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) { el.textContent = Math.floor(current).toLocaleString(); requestAnimationFrame(update); }
            else { el.textContent = target.toLocaleString() + (el.dataset.suffix || ''); }
        };
        update();
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => { counter.dataset.count = counter.textContent.replace(/[^0-9]/g, ''); observer.observe(counter); });
}

function init3DTilt() {
    document.querySelectorAll('.image-card, .tilt-card').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10, rotateY = (rect.width / 2 - x) / 10;
            el.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function initContactForm(formSelector, successCallback) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.created_at = new Date().toISOString();
        try {
            if (typeof supabase !== 'undefined') {
                const { error } = await supabase.from('inquiries').insert([data]);
                if (error) throw error;
            }
            if (successCallback) successCallback();
            else { alert('문의가 성공적으로 접수되었습니다.'); form.reset(); }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('문의 접수 중 오류가 발생했습니다.');
        }
    });
}

window.PremiumUtils = { initContactForm, animateHero };
