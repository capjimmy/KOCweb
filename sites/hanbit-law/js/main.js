/* =====================================================
   Hanbit Law Office - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initParallaxHero();
    initTeamCards();
    initArticleLoader();
});

/* ===== Parallax Hero Effect ===== */
function initParallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
    });
}

/* ===== Team Cards Interaction ===== */
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.team-image img').style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.team-image img').style.transform = 'scale(1)';
        });
    });
}

/* ===== Article/Board Data ===== */
const articles = [
    {
        id: 1,
        category: '부동산',
        title: '상가 임대차 계약 시 필수 확인사항 5가지',
        excerpt: '상가 임대차 계약을 앞두고 계신가요? 계약 전 반드시 확인해야 할 핵심 사항들을 정리해 드립니다.',
        author: '최한빛 변호사',
        date: '2025-12-28',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'
    },
    {
        id: 2,
        category: '기업법무',
        title: '스타트업 투자 계약서, 이것만은 꼭 확인하세요',
        excerpt: '투자 유치를 앞둔 스타트업 대표님들을 위해 투자계약서 핵심 조항을 분석해 드립니다.',
        author: '김서준 변호사',
        date: '2025-12-25',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
    },
    {
        id: 3,
        category: '부동산',
        title: '재개발·재건축 조합원 권리 보호 가이드',
        excerpt: '재개발·재건축 사업에서 조합원으로서 알아야 할 권리와 분쟁 예방법을 안내합니다.',
        author: '최한빛 변호사',
        date: '2025-12-20',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
    },
    {
        id: 4,
        category: '기업법무',
        title: '법인 설립 시 정관 작성의 핵심 포인트',
        excerpt: '회사 설립의 기초가 되는 정관, 어떻게 작성해야 할까요? 핵심 조항별 작성 가이드입니다.',
        author: '박민지 변호사',
        date: '2025-12-18',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80'
    },
    {
        id: 5,
        category: '노동',
        title: '근로계약서 미작성, 어떤 문제가 발생할까?',
        excerpt: '근로계약서 없이 일하고 계신가요? 발생할 수 있는 법적 문제와 해결방안을 알려드립니다.',
        author: '이하늘 변호사',
        date: '2025-12-15',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80'
    },
    {
        id: 6,
        category: '상속',
        title: '유언장 작성, 법적으로 유효하려면?',
        excerpt: '효력 있는 유언장 작성을 위한 법적 요건과 주의사항을 상세히 설명해 드립니다.',
        author: '정우성 변호사',
        date: '2025-12-10',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80'
    },
    {
        id: 7,
        category: '기업법무',
        title: 'M&A 실사(Due Diligence) 체크리스트',
        excerpt: '기업 인수합병 시 반드시 점검해야 할 법률실사 항목들을 정리했습니다.',
        author: '김서준 변호사',
        date: '2025-12-05',
        image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=600&q=80'
    },
    {
        id: 8,
        category: '부동산',
        title: '분양권 전매제한, 예외가 인정되는 경우',
        excerpt: '분양권 전매제한 규정과 예외적으로 전매가 허용되는 경우에 대해 알아봅니다.',
        author: '최한빛 변호사',
        date: '2025-12-01',
        image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80'
    }
];

/* ===== Load Articles ===== */
function initArticleLoader() {
    const container = document.querySelector('.articles-container');
    if (!container) return;

    renderArticles(container, articles);
}

function renderArticles(container, data) {
    container.innerHTML = data.map((article, index) => `
        <div class="col-4 col-md-6 col-sm-12 fade-in stagger-${(index % 4) + 1}">
            <article class="article-card">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-body">
                    <span class="article-category">${article.category}</span>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span>${article.author}</span>
                        <span>${article.date}</span>
                    </div>
                </div>
            </article>
        </div>
    `).join('');

    // Reinitialize scroll animations for new elements
    initArticleAnimations();
}

function initArticleAnimations() {
    const fadeElements = document.querySelectorAll('.articles-container .fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

/* ===== Contact Form Handler ===== */
async function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    // Validate form
    if (!window.CommonJS.validateForm(form)) {
        window.CommonJS.showToast('모든 필수 항목을 입력해주세요.', 'error');
        return;
    }

    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        phone: form.querySelector('#phone').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value,
        company: 'hanbit-law',
        created_at: new Date().toISOString()
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> 전송 중...';

    try {
        const result = await window.CommonJS.supabaseInsert('inquiries', formData);

        if (result.error) {
            throw result.error;
        }

        window.CommonJS.showToast('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
        form.reset();
    } catch (error) {
        console.error('Contact form error:', error);
        window.CommonJS.showToast('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/* ===== Team Data ===== */
const teamMembers = [
    {
        name: '최한빛',
        position: '대표 변호사',
        specialty: '부동산, 기업법무',
        education: '서울대학교 법학전문대학원',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        bio: '20년 이상의 부동산 및 기업법무 경력. 대형 로펌 파트너 출신.'
    },
    {
        name: '김서준',
        position: '파트너 변호사',
        specialty: '기업법무, M&A',
        education: '고려대학교 법학전문대학원',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        bio: 'IT/스타트업 전문 변호사. 100건 이상의 투자계약 자문 경험.'
    },
    {
        name: '박민지',
        position: '시니어 변호사',
        specialty: '기업법무, 계약법',
        education: '연세대학교 법학전문대학원',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        bio: '계약 분쟁 및 기업 자문 전문. 꼼꼼한 법률 검토로 신뢰받는 변호사.'
    },
    {
        name: '이하늘',
        position: '변호사',
        specialty: '노동법, 기업법무',
        education: '성균관대학교 법학전문대학원',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        bio: '노동 분쟁 및 인사 관리 법률 자문 전문.'
    },
    {
        name: '정우성',
        position: '변호사',
        specialty: '상속, 가사',
        education: '한양대학교 법학전문대학원',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        bio: '상속 및 가사 사건 전문. 의뢰인 중심의 따뜻한 상담.'
    }
];

/* ===== Load Team Members ===== */
function loadTeamMembers(container) {
    if (!container) return;

    container.innerHTML = teamMembers.map((member, index) => `
        <div class="col-4 col-md-6 col-sm-12 fade-in stagger-${(index % 3) + 1}">
            <div class="team-card">
                <div class="team-image">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="team-image-overlay">
                        <p>${member.bio}</p>
                    </div>
                </div>
                <div class="team-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.position}</p>
                    <p class="specialty">${member.specialty}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Export for use in HTML
window.HanbitLaw = {
    articles,
    teamMembers,
    handleContactSubmit,
    loadTeamMembers
};
