/**
 * NEXGEN SECURITY - Main JavaScript
 * Matrix Animation, Cyber Effects, and Interactions
 */

// ========================================
// Matrix Rain Animation
// ========================================
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.columns = 0;
        this.drops = [];
        this.fontSize = 14;
        this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';

        this.init();
        this.animate();
        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Vary the color slightly
            const colorChoice = Math.random();
            if (colorChoice > 0.9) {
                this.ctx.fillStyle = '#00d4ff';
            } else if (colorChoice > 0.8) {
                this.ctx.fillStyle = '#ffffff';
            } else {
                this.ctx.fillStyle = '#00ff88';
            }

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Preloader
// ========================================
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.preloader.classList.add('loaded');
                document.body.classList.remove('no-scroll');
            }, 1500);
        });
    }
}

// ========================================
// Navbar
// ========================================
class Navbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navMenu = document.getElementById('navMenu');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.mobileToggle.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileToggle?.classList.remove('active');
                this.navMenu?.classList.remove('active');
            });
        });
    }
}

// ========================================
// Counter Animation
// ========================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.observed = new Set();
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed.has(entry.target)) {
                    this.observed.add(entry.target);
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
}

// ========================================
// Scroll Animations (AOS-like)
// ========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ========================================
// Glitch Effect on Hover
// ========================================
class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.glitch').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitch-skew 0.5s infinite linear alternate-reverse';
                }, 10);
            });

            element.addEventListener('mouseleave', () => {
                element.style.animation = 'glitch-skew 4s infinite linear alternate-reverse';
            });
        });
    }
}

// ========================================
// FAQ Accordion
// ========================================
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all
                this.items.forEach(i => i.classList.remove('active'));

                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// ========================================
// Smooth Scroll
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ========================================
// GSAP Animations
// ========================================
class GSAPAnimations {
    constructor() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            this.init();
        }
    }

    init() {
        // Hero animations
        gsap.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            delay: 0.7
        });

        gsap.from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.3
        });

        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.5
        });

        gsap.from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.7
        });

        // Service cards stagger
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.15
        });

        // Stats cards
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.stats-grid',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.1
        });

        // Stat bar fills
        document.querySelectorAll('.stat-bar .bar-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';

            ScrollTrigger.create({
                trigger: bar,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(bar, {
                        width: width,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
}

// ========================================
// Latest News Loader (for index page)
// ========================================
class LatestNewsLoader {
    constructor() {
        this.container = document.getElementById('latestNews');
        if (this.container) {
            this.loadNews();
        }
    }

    loadNews() {
        // Get first 3 posts from board data
        const posts = boardData.slice(0, 3);

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.setAttribute('data-aos', 'fade-up');

            card.innerHTML = `
                <div class="news-image">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="news-category">${post.categoryName}</span>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${post.title}</h3>
                    <p class="news-excerpt">${post.excerpt}</p>
                    <div class="news-meta">
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-calendar"></i> ${post.date}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                window.location.href = `board.html?id=${post.id}`;
            });

            this.container.appendChild(card);
        });
    }
}

// ========================================
// Board Data (Seed Data)
// ========================================
const boardData = [
    {
        id: 1,
        category: 'threat',
        categoryName: '위협 동향',
        title: '2024년 랜섬웨어 공격 동향 분석 및 대응 전략',
        excerpt: '최근 급증하고 있는 랜섬웨어 공격의 특징과 기업이 취해야 할 대응 전략을 분석합니다.',
        content: `<p>2024년 들어 랜섬웨어 공격이 더욱 정교해지고 있습니다. 특히 이중 협박(Double Extortion) 방식이 일반화되면서, 기업들의 피해가 커지고 있습니다.</p>

        <h3>주요 랜섬웨어 트렌드</h3>
        <ul>
            <li><strong>LockBit 3.0</strong>: 가장 활발한 RaaS(Ransomware-as-a-Service) 그룹으로, 자동화된 공격 도구 제공</li>
            <li><strong>BlackCat/ALPHV</strong>: Rust 언어로 작성된 크로스 플랫폼 랜섬웨어</li>
            <li><strong>Royal</strong>: 사회공학적 기법과 결합한 타깃 공격</li>
        </ul>

        <h3>권장 대응 전략</h3>
        <ul>
            <li>3-2-1 백업 원칙 준수 (3개 사본, 2개 미디어, 1개 오프사이트)</li>
            <li>네트워크 세그멘테이션 강화</li>
            <li>EDR/XDR 솔루션 도입</li>
            <li>임직원 보안 인식 교육 강화</li>
            <li>인시던트 대응 계획 수립 및 훈련</li>
        </ul>

        <p>넥스젠 시큐리티는 랜섬웨어 대응을 위한 종합 보안 서비스를 제공합니다. 자세한 상담이 필요하시면 연락 주세요.</p>`,
        author: '서정우',
        date: '2024-01-15',
        views: 1247,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop'
    },
    {
        id: 2,
        category: 'threat',
        categoryName: '위협 동향',
        title: '제로데이 취약점 CVE-2024-XXXX 긴급 대응 가이드',
        excerpt: '최근 발견된 제로데이 취약점에 대한 기술적 분석과 긴급 패치 적용 가이드를 제공합니다.',
        content: `<p>최근 주요 엔터프라이즈 소프트웨어에서 심각한 제로데이 취약점이 발견되었습니다. 이 취약점은 원격 코드 실행(RCE)을 가능하게 하며, 즉각적인 대응이 필요합니다.</p>

        <h3>취약점 개요</h3>
        <ul>
            <li><strong>CVE 번호</strong>: CVE-2024-XXXX</li>
            <li><strong>CVSS 점수</strong>: 9.8 (Critical)</li>
            <li><strong>영향받는 버전</strong>: 버전 5.0 ~ 7.2</li>
            <li><strong>공격 벡터</strong>: 네트워크 기반, 인증 불필요</li>
        </ul>

        <h3>긴급 대응 조치</h3>
        <ul>
            <li>즉시 보안 패치 적용 (버전 7.2.1 이상)</li>
            <li>패치 적용 전까지 외부 접근 차단</li>
            <li>WAF 룰 업데이트로 악성 트래픽 차단</li>
            <li>로그 분석을 통한 침해 여부 확인</li>
        </ul>

        <p>넥스젠 시큐리티 보안관제센터에서는 해당 취약점에 대한 모니터링을 강화하고 있으며, 관제 고객사에는 별도의 알림을 발송하였습니다.</p>`,
        author: '이해커',
        date: '2024-01-14',
        views: 2156,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop'
    },
    {
        id: 3,
        category: 'guide',
        categoryName: '가이드',
        title: '클라우드 보안 베스트 프랙티스 2024',
        excerpt: 'AWS, Azure, GCP 환경에서 적용해야 할 필수 클라우드 보안 설정과 모범 사례를 소개합니다.',
        content: `<p>클라우드 환경의 보안은 전통적인 온프레미스 환경과 다른 접근 방식이 필요합니다. 공유 책임 모델을 이해하고 적절한 보안 통제를 적용해야 합니다.</p>

        <h3>AWS 보안 필수 설정</h3>
        <ul>
            <li>IAM 최소 권한 원칙 적용</li>
            <li>MFA 필수 활성화</li>
            <li>CloudTrail 로깅 활성화</li>
            <li>GuardDuty 위협 탐지 활성화</li>
            <li>S3 버킷 퍼블릭 액세스 차단</li>
        </ul>

        <h3>Azure 보안 체크리스트</h3>
        <ul>
            <li>Azure AD 조건부 액세스 정책</li>
            <li>Azure Security Center 활성화</li>
            <li>Network Security Group 설정</li>
            <li>Key Vault를 통한 비밀 관리</li>
        </ul>

        <h3>GCP 보안 권고사항</h3>
        <ul>
            <li>Organization Policy 제약조건 설정</li>
            <li>VPC Service Controls 구성</li>
            <li>Cloud Audit Logs 활성화</li>
            <li>Binary Authorization 적용</li>
        </ul>`,
        author: '김보안',
        date: '2024-01-12',
        views: 987,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
    },
    {
        id: 4,
        category: 'tech',
        categoryName: '기술 블로그',
        title: 'SIEM 솔루션 도입 시 고려해야 할 5가지 핵심 요소',
        excerpt: '보안 이벤트 통합 관리를 위한 SIEM 솔루션 선택과 구축 시 반드시 검토해야 할 사항들입니다.',
        content: `<p>SIEM(Security Information and Event Management)은 현대 보안 운영의 핵심 도구입니다. 효과적인 SIEM 도입을 위해 고려해야 할 핵심 요소를 살펴보겠습니다.</p>

        <h3>1. 로그 수집 범위와 확장성</h3>
        <p>다양한 소스(방화벽, 서버, 애플리케이션, 클라우드)에서 로그를 수집할 수 있어야 하며, 조직 성장에 따른 확장이 용이해야 합니다.</p>

        <h3>2. 탐지 룰과 위협 인텔리전스</h3>
        <p>사전 정의된 탐지 룰의 품질과 최신 위협 인텔리전스 피드 연동 여부를 확인하세요.</p>

        <h3>3. 분석 및 조사 기능</h3>
        <p>직관적인 대시보드, 강력한 검색 기능, 상관관계 분석 능력이 중요합니다.</p>

        <h3>4. 자동화와 오케스트레이션</h3>
        <p>SOAR 기능 연동을 통해 반복적인 작업을 자동화하고 대응 시간을 단축할 수 있어야 합니다.</p>

        <h3>5. TCO와 ROI</h3>
        <p>라이선스 비용뿐 아니라 운영 인력, 교육, 유지보수 비용을 포함한 총소유비용을 고려하세요.</p>`,
        author: '박방화벽',
        date: '2024-01-10',
        views: 754,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop'
    },
    {
        id: 5,
        category: 'notice',
        categoryName: '공지사항',
        title: '넥스젠 시큐리티 24시간 긴급 대응 서비스 확대 안내',
        excerpt: '보안 사고 발생 시 더욱 신속한 대응을 위해 긴급 대응 서비스를 확대 운영합니다.',
        content: `<p>안녕하세요. 넥스젠 시큐리티입니다.</p>

        <p>2024년 1월부터 24시간 긴급 대응 서비스를 확대 운영합니다. 보안 사고 발생 시 더욱 신속하게 대응하여 고객사의 피해를 최소화하겠습니다.</p>

        <h3>확대 내용</h3>
        <ul>
            <li>긴급 대응팀 인원 2배 확충</li>
            <li>현장 파견 대응 시간 단축 (4시간 -> 2시간 이내)</li>
            <li>원격 초동 대응 시간 보장 (15분 이내)</li>
            <li>침해사고 분석 보고서 제공 시간 단축</li>
        </ul>

        <h3>긴급 연락처</h3>
        <p><strong>전화:</strong> 02-2026-8500 (24시간)</p>
        <p><strong>이메일:</strong> emergency@nexgen-security.kr</p>

        <p>앞으로도 최고의 보안 서비스로 보답하겠습니다.</p>`,
        author: '서정우',
        date: '2024-01-08',
        views: 1532,
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop'
    },
    {
        id: 6,
        category: 'tech',
        categoryName: '기술 블로그',
        title: 'EDR vs XDR: 차세대 엔드포인트 보안의 선택',
        excerpt: 'EDR과 XDR의 차이점을 분석하고, 조직에 적합한 솔루션 선택 기준을 제시합니다.',
        content: `<p>엔드포인트 보안은 기업 보안의 핵심입니다. EDR에서 XDR로의 진화가 이루어지고 있는 현 시점에서, 두 솔루션의 차이를 명확히 이해하는 것이 중요합니다.</p>

        <h3>EDR (Endpoint Detection and Response)</h3>
        <ul>
            <li>엔드포인트 중심의 위협 탐지 및 대응</li>
            <li>행위 기반 분석으로 알려지지 않은 위협 탐지</li>
            <li>포렌식 데이터 수집 및 조사 기능</li>
            <li>자동화된 위협 차단 및 격리</li>
        </ul>

        <h3>XDR (Extended Detection and Response)</h3>
        <ul>
            <li>엔드포인트 + 네트워크 + 클라우드 통합 가시성</li>
            <li>크로스 레이어 상관관계 분석</li>
            <li>통합된 인시던트 대응 워크플로우</li>
            <li>AI/ML 기반 고급 위협 탐지</li>
        </ul>

        <h3>선택 기준</h3>
        <p>조직의 규모, 보안 성숙도, 기존 인프라, 예산을 종합적으로 고려하여 선택해야 합니다. 중소기업은 EDR부터 시작하고, 대기업이나 보안 성숙도가 높은 조직은 XDR을 고려하는 것이 좋습니다.</p>`,
        author: '이해커',
        date: '2024-01-05',
        views: 689,
        image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&h=400&fit=crop'
    },
    {
        id: 7,
        category: 'guide',
        categoryName: '가이드',
        title: 'ISMS-P 인증 준비 완벽 가이드',
        excerpt: '정보보호 및 개인정보보호 관리체계 인증을 위한 단계별 준비 사항과 핵심 포인트를 안내합니다.',
        content: `<p>ISMS-P 인증은 정보보호관리체계(ISMS)와 개인정보보호관리체계(PIMS)를 통합한 인증입니다. 체계적인 준비로 성공적인 인증을 획득할 수 있습니다.</p>

        <h3>ISMS-P 인증 요건</h3>
        <ul>
            <li>관리체계 수립 및 운영 (16개 항목)</li>
            <li>보호대책 요구사항 (64개 항목)</li>
            <li>개인정보 처리단계별 요구사항 (22개 항목)</li>
        </ul>

        <h3>준비 단계</h3>
        <p><strong>1단계: 현황 분석 (1-2개월)</strong></p>
        <ul>
            <li>인증 범위 정의</li>
            <li>자산 현황 파악</li>
            <li>GAP 분석 실시</li>
        </ul>

        <p><strong>2단계: 관리체계 구축 (3-4개월)</strong></p>
        <ul>
            <li>정책/지침 수립</li>
            <li>위험 평가 실시</li>
            <li>보호대책 구현</li>
        </ul>

        <p><strong>3단계: 운영 및 개선 (2-3개월)</strong></p>
        <ul>
            <li>내부 감사</li>
            <li>경영진 검토</li>
            <li>시정조치</li>
        </ul>

        <p>넥스젠 시큐리티는 100건 이상의 ISMS-P 인증 컨설팅 경험을 보유하고 있습니다.</p>`,
        author: '김보안',
        date: '2024-01-03',
        views: 1123,
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop'
    },
    {
        id: 8,
        category: 'threat',
        categoryName: '위협 동향',
        title: 'APT 공격 그룹 분석: 최신 공격 기법과 IOC',
        excerpt: '최근 활동이 활발한 APT 공격 그룹의 공격 기법과 침해지표(IOC)를 공유합니다.',
        content: `<p>지능형 지속 위협(APT)은 특정 조직을 대상으로 장기간에 걸쳐 은밀하게 진행되는 사이버 공격입니다. 최근 활동이 활발한 APT 그룹을 분석했습니다.</p>

        <h3>APT 그룹 프로필</h3>
        <ul>
            <li><strong>공격 대상</strong>: 국내 주요 기업, 정부기관</li>
            <li><strong>주요 동기</strong>: 산업기밀 탈취, 정치적 목적</li>
            <li><strong>활동 기간</strong>: 2020년 ~ 현재</li>
        </ul>

        <h3>주요 공격 기법</h3>
        <ul>
            <li>스피어 피싱 이메일 (악성 문서 첨부)</li>
            <li>워터링홀 공격</li>
            <li>공급망 공격</li>
            <li>Living-off-the-Land 기법 사용</li>
        </ul>

        <h3>침해지표 (IOC)</h3>
        <p>상세한 IOC는 보안관제 고객사에 별도 공유됩니다. 일반 문의는 보안관제팀으로 연락 주세요.</p>

        <h3>권장 대응 조치</h3>
        <ul>
            <li>이메일 보안 강화 (SPF, DKIM, DMARC)</li>
            <li>파워쉘 실행 로깅 활성화</li>
            <li>비정상 관리자 계정 활동 모니터링</li>
        </ul>`,
        author: '이해커',
        date: '2024-01-02',
        views: 1876,
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop'
    },
    {
        id: 9,
        category: 'notice',
        categoryName: '공지사항',
        title: '2024년 정보보안 교육 프로그램 안내',
        excerpt: '임직원 보안 인식 제고를 위한 2024년 교육 프로그램을 안내드립니다.',
        content: `<p>넥스젠 시큐리티는 2024년 새로운 정보보안 교육 프로그램을 운영합니다. 임직원 보안 인식 교육부터 전문가 양성 과정까지 다양한 프로그램을 제공합니다.</p>

        <h3>교육 프로그램</h3>

        <p><strong>1. 임직원 보안 인식 교육</strong></p>
        <ul>
            <li>대상: 전 임직원</li>
            <li>내용: 피싱 대응, 비밀번호 관리, 정보 취급 등</li>
            <li>방식: 온라인/오프라인 선택</li>
        </ul>

        <p><strong>2. 개발자 보안 코딩 교육</strong></p>
        <ul>
            <li>대상: 개발 부서</li>
            <li>내용: OWASP Top 10, 시큐어 코딩 가이드</li>
            <li>방식: 실습 중심 오프라인</li>
        </ul>

        <p><strong>3. 보안 담당자 전문 교육</strong></p>
        <ul>
            <li>대상: IT/보안 담당자</li>
            <li>내용: 인시던트 대응, 포렌식 기초</li>
            <li>방식: 오프라인 집중 교육</li>
        </ul>

        <p>교육 신청 및 문의는 교육담당(edu@nexgen-security.kr)으로 연락 주세요.</p>`,
        author: '서정우',
        date: '2024-01-01',
        views: 965,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    },
    {
        id: 10,
        category: 'tech',
        categoryName: '기술 블로그',
        title: '컨테이너 보안: Kubernetes 환경 보호하기',
        excerpt: 'Kubernetes 환경에서 발생할 수 있는 보안 위협과 효과적인 보안 전략을 소개합니다.',
        content: `<p>컨테이너와 Kubernetes는 현대 애플리케이션 개발의 핵심이 되었습니다. 하지만 새로운 기술에는 새로운 보안 과제가 따릅니다.</p>

        <h3>Kubernetes 보안 위협</h3>
        <ul>
            <li>취약한 컨테이너 이미지</li>
            <li>잘못된 RBAC 설정</li>
            <li>네트워크 정책 부재</li>
            <li>시크릿 관리 미흡</li>
            <li>런타임 위협</li>
        </ul>

        <h3>보안 강화 전략</h3>

        <p><strong>이미지 보안</strong></p>
        <ul>
            <li>신뢰할 수 있는 베이스 이미지 사용</li>
            <li>이미지 스캐닝 자동화</li>
            <li>불필요한 패키지 제거</li>
        </ul>

        <p><strong>런타임 보안</strong></p>
        <ul>
            <li>Pod Security Standards 적용</li>
            <li>Network Policy 구성</li>
            <li>런타임 보안 도구 배포 (Falco 등)</li>
        </ul>

        <p><strong>접근 제어</strong></p>
        <ul>
            <li>최소 권한 RBAC 설정</li>
            <li>Service Account 토큰 자동 마운트 비활성화</li>
            <li>API Server 접근 제한</li>
        </ul>`,
        author: '박방화벽',
        date: '2023-12-28',
        views: 832,
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop'
    }
];

// Make boardData globally available
window.boardData = boardData;

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        new MatrixRain(canvas);
    }

    // Initialize all components
    new Preloader();
    new Navbar();
    new CounterAnimation();
    new ScrollAnimations();
    new GlitchEffect();
    new FAQAccordion();
    new SmoothScroll();
    new GSAPAnimations();
    new LatestNewsLoader();

    // Add body class for no-scroll during preload
    document.body.classList.add('no-scroll');
});

// ========================================
// Utility Functions
// ========================================
function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
