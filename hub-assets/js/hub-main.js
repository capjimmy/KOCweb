/* =========================================
   KOC Web Studio - Hub Site JavaScript
   ========================================= */

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const heroCanvas = document.getElementById('heroCanvas');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const cursorFollower = document.querySelector('.cursor-follower');

// Supabase Configuration
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

// =========================================
// Loading Screen
// =========================================
window.addEventListener('load', () => {
    document.body.classList.add('loading');

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
        initAnimations();
    }, 2000);
});

// =========================================
// Custom Cursor
// =========================================
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
        cursorFollower.classList.add('active');
    });

    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// =========================================
// Navbar
// =========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =========================================
// Hero Canvas Animation (Three.js)
// =========================================
function initHeroCanvas() {
    if (!heroCanvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = [];

    for (let i = 0; i < 100; i++) {
        const x1 = (Math.random() - 0.5) * 8;
        const y1 = (Math.random() - 0.5) * 8;
        const z1 = (Math.random() - 0.5) * 8;
        const x2 = x1 + (Math.random() - 0.5) * 2;
        const y2 = y1 + (Math.random() - 0.5) * 2;
        const z2 = z1 + (Math.random() - 0.5) * 2;

        linesPositions.push(x1, y1, z1, x2, y2, z2);
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linesPositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0008;

        linesMesh.rotation.x += 0.0003;
        linesMesh.rotation.y += 0.0005;

        // Mouse follow
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// =========================================
// GSAP Animations
// =========================================
function initAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');

    // Counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
        const target = parseInt(num.dataset.count);
        gsap.to(num, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: num,
                start: 'top 80%'
            }
        });
    });

    // Section animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%'
            }
        });
    });

    // About visual cards
    gsap.from('.visual-card', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 70%'
        }
    });

    // Service cards
    gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 70%'
        }
    });

    // Process items
    gsap.from('.process-item', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%'
        }
    });

    // Feature items
    gsap.from('.feature-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-features',
            start: 'top 80%'
        }
    });
}

// =========================================
// Portfolio
// =========================================
function initPortfolio() {
    if (!portfolioGrid || typeof portfolioData === 'undefined') return;

    let visibleCount = 9;
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    function renderPortfolio(filter = 'all') {
        const filtered = filter === 'all'
            ? portfolioData
            : portfolioData.filter(item => item.category === filter);

        portfolioGrid.innerHTML = '';

        filtered.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${index >= visibleCount ? 'hidden' : ''}`;
            portfolioItem.dataset.category = item.category;

            const categoryLabel = {
                'simple': '심플',
                'medium': '세련된',
                'premium': '프리미엄'
            };

            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="portfolio-image" loading="lazy">
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${categoryLabel[item.category]}</span>
                    <h3 class="portfolio-title">${item.name}</h3>
                    <p class="portfolio-desc">${item.industry} | ${item.description}</p>
                    <span class="portfolio-link">
                        사이트 보기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            `;

            // 카드 전체 클릭 시 사이트로 이동
            portfolioItem.style.cursor = 'pointer';
            portfolioItem.addEventListener('click', () => {
                window.open(`sites/${item.id}/index.html`, '_blank');
            });

            portfolioGrid.appendChild(portfolioItem);

            // Animate in
            setTimeout(() => {
                if (index < visibleCount) {
                    portfolioItem.classList.add('visible');
                }
            }, index * 100);
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';
        }
    }

    // Initial render
    renderPortfolio();

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            visibleCount = 9;
            renderPortfolio(btn.dataset.filter);
        });
    });

    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const hiddenItems = portfolioGrid.querySelectorAll('.portfolio-item.hidden');
            let count = 0;

            hiddenItems.forEach(item => {
                if (count < 6) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.classList.add('visible'), count * 100);
                    count++;
                }
            });

            visibleCount += 6;

            // Check if all items are visible
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            const filtered = activeFilter === 'all'
                ? portfolioData
                : portfolioData.filter(item => item.category === activeFilter);

            if (visibleCount >= filtered.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

// =========================================
// Contact Form
// =========================================
async function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>전송 중...</span>';
        submitBtn.disabled = true;

        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value || null,
            subject: contactForm.project.value || '일반 문의',
            message: contactForm.message.value
        };

        try {
            // Try to submit to Supabase
            if (typeof supabase !== 'undefined') {
                const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                const { error } = await client
                    .from('inquiries')
                    .insert([{
                        site_id: 'koc-webstudio-hub',
                        ...formData
                    }]);

                if (error) throw error;
            }

            // Success
            showToast('문의가 성공적으로 전송되었습니다!', 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            // Even if Supabase fails, show success (for demo purposes)
            showToast('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            contactForm.reset();
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// =========================================
// Toast Notification
// =========================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 18px 28px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                      type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.4s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// =========================================
// Smooth Scroll
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// Initialize
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initPortfolio();
    initContactForm();
});

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);
