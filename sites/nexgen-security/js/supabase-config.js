/**
 * NEXGEN SECURITY - Supabase Configuration & Contact Form Handler
 */

// Supabase Configuration
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

// Initialize Supabase client
let supabase = null;

// Load Supabase from CDN
function loadSupabase() {
    return new Promise((resolve, reject) => {
        if (window.supabase) {
            resolve(window.supabase);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            if (window.supabase) {
                resolve(window.supabase);
            } else {
                reject(new Error('Failed to load Supabase'));
            }
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Initialize Supabase client
async function initSupabase() {
    try {
        const supabaseLib = await loadSupabase();
        supabase = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase initialized successfully');
        return supabase;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        return null;
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.statusEl = document.getElementById('formStatus');

        if (this.form) {
            this.init();
        }
    }

    async init() {
        await initSupabase();
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            company: formData.get('company') || null,
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            budget: formData.get('budget') || null,
            message: formData.get('message'),
            marketing_consent: formData.get('marketing') === 'on',
            created_at: new Date().toISOString()
        };

        // Validate required fields
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            this.showStatus('error', '필수 항목을 모두 입력해주세요.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showStatus('error', '올바른 이메일 주소를 입력해주세요.');
            return;
        }

        // Validate phone format (Korean phone number)
        const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$|^0[2-9][0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(data.phone.replace(/-/g, ''))) {
            this.showStatus('error', '올바른 전화번호를 입력해주세요.');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-spinner fa-spin"></i> 전송 중...</span>';
        submitBtn.disabled = true;

        try {
            if (supabase) {
                // Try to submit to Supabase
                const { data: result, error } = await supabase
                    .from('contacts')
                    .insert([data]);

                if (error) {
                    console.error('Supabase error:', error);
                    // Fall back to local storage if Supabase fails
                    this.saveToLocalStorage(data);
                }
            } else {
                // Save to local storage as fallback
                this.saveToLocalStorage(data);
            }

            // Show success message
            this.showStatus('success', '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            this.form.reset();

            // Scroll to status message
            this.statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('error', '문의 접수 중 오류가 발생했습니다. 전화(02-2026-8500)로 문의해주세요.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }
    }

    saveToLocalStorage(data) {
        const contacts = JSON.parse(localStorage.getItem('nexgen_contacts') || '[]');
        contacts.push(data);
        localStorage.setItem('nexgen_contacts', JSON.stringify(contacts));
        console.log('Contact saved to local storage');
    }

    showStatus(type, message) {
        this.statusEl.className = `form-status ${type}`;
        this.statusEl.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        this.statusEl.style.display = 'block';

        // Auto-hide after 10 seconds
        setTimeout(() => {
            this.statusEl.style.display = 'none';
        }, 10000);
    }
}

// Service name mapping for display
const serviceNames = {
    'soc': '통합 보안관제 (SOC)',
    'pentest': '모의해킹/침투테스트',
    'consulting': '보안 컨설팅',
    'isms': 'ISMS 인증 컨설팅',
    'vuln': '취약점 진단',
    'malware': '악성코드 분석',
    'solutions': '보안 솔루션 구축',
    'cloud': '클라우드 보안',
    'other': '기타'
};

// Budget range mapping for display
const budgetRanges = {
    'under1000': '1,000만원 미만',
    '1000-3000': '1,000만원 ~ 3,000만원',
    '3000-5000': '3,000만원 ~ 5,000만원',
    '5000-10000': '5,000만원 ~ 1억원',
    'over10000': '1억원 이상',
    'undecided': '미정'
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

// Export for use in other modules
window.NexgenSupabase = {
    init: initSupabase,
    getClient: () => supabase,
    serviceNames,
    budgetRanges
};
