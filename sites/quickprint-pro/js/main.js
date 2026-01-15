// QuickPrint Pro - Main JavaScript
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

let supabaseClient = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            data.created_at = new Date().toISOString();

            try {
                if (supabaseClient) {
                    const { error } = await supabaseClient
                        .from('contacts')
                        .insert([data]);

                    if (error) throw error;
                }

                alert('견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('문의 접수 중 오류가 발생했습니다. 전화로 문의해주세요.');
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .product-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
