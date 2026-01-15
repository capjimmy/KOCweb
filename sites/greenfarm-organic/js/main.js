// GreenFarm Organic - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCategoryFilter();
    initMobileMenu();
    initScrollEffects();
});

// Category Filter for Products
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Filter products
            products.forEach(function(product) {
                if (filter === 'all' || product.dataset.category === filter) {
                    product.style.display = '';
                    product.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .timeline-item, .faq-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact Form Handler (uses common.js handleContactForm)
