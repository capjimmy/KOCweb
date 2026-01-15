/* =====================================================
   SkyView Real Estate - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initScrollToTop();
    initPropertyFilter();
    initBoardTabs();
    initContactForm();
    initParticles();
    initPropertyFavorites();
});

/* Preloader */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1000);
    });
}

/* Navbar */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* Mobile Menu */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* Counter Animations */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * eased);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

/* Scroll to Top */
function initScrollToTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* Property Filter */
function initPropertyFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const properties = document.querySelectorAll('.property-card');

    if (!filterTabs.length || !properties.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter properties
            properties.forEach(property => {
                const category = property.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    property.style.display = '';
                    setTimeout(() => {
                        property.style.opacity = '1';
                        property.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    property.style.opacity = '0';
                    property.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        property.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* Board Tabs */
function initBoardTabs() {
    const boardTabs = document.querySelectorAll('.board-tab');
    const boardContents = document.querySelectorAll('.board-content');

    if (!boardTabs.length) return;

    boardTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const board = this.getAttribute('data-board');

            // Update active tab
            boardTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding content
            boardContents.forEach(content => {
                if (content.id === board) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

/* Contact Form */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            property_type: formData.get('property_type'),
            deal_type: formData.get('deal_type'),
            budget: formData.get('budget'),
            area: formData.get('area'),
            message: formData.get('message'),
            site: 'skyview-realestate',
            created_at: new Date().toISOString()
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;

        try {
            // Supabase submission
            if (typeof CommonJS !== 'undefined' && CommonJS.supabaseInsert) {
                const result = await CommonJS.supabaseInsert('contact_inquiries', data);

                if (result.error) {
                    throw new Error(result.error.message);
                }
            }

            // Show success message
            showNotification('상담 신청이 완료되었습니다. 빠른 시간 내에 연락드리겠습니다.', 'success');
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('전송 중 오류가 발생했습니다. 전화로 문의해주세요.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* Notification */
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '&#10003;' : '&#10007;'}</span>
        <span class="notification-message">${message}</span>
    `;

    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            padding: 16px 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        .notification.success {
            background: #27ae60;
            color: white;
        }
        .notification.error {
            background: #e74c3c;
            color: white;
        }
        .notification-icon {
            font-size: 1.2rem;
        }
    `;

    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* Particles Effect */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(201, 169, 98, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${left}%;
        bottom: -20px;
        animation: floatUp ${duration}s linear ${delay}s infinite;
    `;

    const keyframes = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;

    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = keyframes;
        document.head.appendChild(style);
    }

    container.appendChild(particle);
}

/* Property Favorites */
function initPropertyFavorites() {
    const favorites = document.querySelectorAll('.property-favorite');

    favorites.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.innerHTML = '&#9829;';
                this.style.color = '#e74c3c';
            } else {
                this.innerHTML = '&#9825;';
                this.style.color = '';
            }
        });
    });
}

/* Modal */
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-modal]')) {
        e.preventDefault();
        const modalId = e.target.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 100;
            const position = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});
