/* =====================================================
   Dongwon Logistics - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initTruckAnimation();
    initTrackingForm();
    initNetworkDots();
});

/* ===== Truck Animation ===== */
function initTruckAnimation() {
    const truckContainers = document.querySelectorAll('.truck-animation');

    truckContainers.forEach(container => {
        // Create truck icon
        const truck = document.createElement('div');
        truck.className = 'truck-icon';
        truck.innerHTML = '<svg width="50" height="50" viewBox="0 0 24 24" fill="var(--secondary-color)"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>';
        container.appendChild(truck);
    });
}

/* ===== Tracking Form ===== */
function initTrackingForm() {
    const trackingForm = document.getElementById('tracking-form');

    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const trackingNumber = this.querySelector('input').value.trim();

            if (!trackingNumber) {
                window.CommonJS.showToast('운송장 번호를 입력해주세요.', 'error');
                return;
            }

            // Simulate tracking (in real app, would call API)
            window.CommonJS.showToast('배송 조회 중입니다...', 'success');

            setTimeout(() => {
                showTrackingResult(trackingNumber);
            }, 1500);
        });
    }
}

function showTrackingResult(trackingNumber) {
    // Demo tracking result
    const result = {
        number: trackingNumber,
        status: '배송중',
        location: '인천 물류센터',
        estimatedDelivery: '2025-12-30',
        history: [
            { time: '2025-12-28 09:30', status: '발송', location: '서울 강남구' },
            { time: '2025-12-28 14:00', status: '인천 허브 도착', location: '인천 물류센터' },
            { time: '2025-12-28 18:00', status: '배송 출발', location: '인천 물류센터' }
        ]
    };

    const modalHtml = `
        <div class="modal-overlay active" id="tracking-modal">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h4>배송 조회 결과</h4>
                    <button class="modal-close" onclick="closeTrackingModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="background: var(--bg-blue); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: var(--text-light); font-size: 0.9rem;">운송장 번호</p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: var(--primary-color);">${result.number}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <div>
                            <p style="color: var(--text-light); font-size: 0.9rem;">배송 상태</p>
                            <p style="font-weight: 600; color: var(--secondary-color);">${result.status}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-light); font-size: 0.9rem;">예상 도착</p>
                            <p style="font-weight: 600;">${result.estimatedDelivery}</p>
                        </div>
                    </div>
                    <h5 style="margin-bottom: 15px; color: var(--primary-color);">배송 이력</h5>
                    <div style="border-left: 2px solid var(--primary-color); padding-left: 20px;">
                        ${result.history.map(item => `
                            <div style="margin-bottom: 15px; position: relative;">
                                <div style="position: absolute; left: -26px; width: 12px; height: 12px; background: var(--secondary-color); border-radius: 50%;"></div>
                                <p style="font-size: 0.85rem; color: var(--text-light);">${item.time}</p>
                                <p style="font-weight: 500;">${item.status}</p>
                                <p style="font-size: 0.9rem; color: var(--text-light);">${item.location}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeTrackingModal() {
    const modal = document.getElementById('tracking-modal');
    if (modal) {
        modal.remove();
    }
}

/* ===== Network Dots Animation ===== */
function initNetworkDots() {
    const networkMap = document.querySelector('.network-map');

    if (networkMap) {
        const locations = [
            { x: 20, y: 30, label: '인천 본사' },
            { x: 35, y: 25, label: '서울' },
            { x: 50, y: 40, label: '부산' },
            { x: 65, y: 35, label: '일본' },
            { x: 80, y: 30, label: '미국' },
            { x: 15, y: 60, label: '중국' },
            { x: 45, y: 70, label: '베트남' }
        ];

        locations.forEach((loc, index) => {
            const dot = document.createElement('div');
            dot.className = 'network-dot';
            dot.style.left = `${loc.x}%`;
            dot.style.top = `${loc.y}%`;
            dot.style.animationDelay = `${index * 0.3}s`;
            dot.title = loc.label;
            networkMap.appendChild(dot);
        });
    }
}

/* ===== Notices Data ===== */
const notices = [
    {
        id: 1,
        category: '공지',
        title: '2025년 연말연시 배송 일정 안내',
        date: '2025-12-20'
    },
    {
        id: 2,
        category: '시스템',
        title: '실시간 화물추적 시스템 업그레이드 완료',
        date: '2025-12-15'
    },
    {
        id: 3,
        category: '서비스',
        title: '동남아시아 신규 항로 개설 안내',
        date: '2025-12-10'
    },
    {
        id: 4,
        category: '공지',
        title: '친환경 물류 서비스 도입',
        date: '2025-12-05'
    },
    {
        id: 5,
        category: '이벤트',
        title: '신규 고객 첫 배송 20% 할인 이벤트',
        date: '2025-12-01'
    }
];

/* ===== Load Notices ===== */
function loadNotices(container) {
    if (!container) return;

    container.innerHTML = notices.map((notice, index) => `
        <div class="notice-card fade-in stagger-${index + 1}">
            <div>
                <span class="badge">${notice.category}</span>
                <span class="title">${notice.title}</span>
            </div>
            <span class="date">${notice.date}</span>
        </div>
    `).join('');
}

/* ===== Services Data ===== */
const services = [
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>',
        title: '해상운송',
        description: 'FCL, LCL 등 다양한 해상운송 서비스로 전 세계 주요 항구를 연결합니다.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
        title: '항공운송',
        description: '긴급 화물을 위한 빠르고 안전한 항공운송 서비스를 제공합니다.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
        title: '육상운송',
        description: '전국 어디든 신속하게 배송하는 체계적인 육상운송 네트워크.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V5c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V5h16v2z"/></svg>',
        title: '창고관리',
        description: '최첨단 WMS 시스템 기반의 효율적인 창고 보관 및 재고관리.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
        title: '국제운송',
        description: '통관, 검역 등 복잡한 국제운송 절차를 원스톱으로 해결합니다.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>',
        title: '풀필먼트',
        description: '입고부터 출고까지 이커머스 물류 전 과정을 대행합니다.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        title: '보안물류',
        description: '귀중품, 의약품 등 특수 화물을 위한 보안 운송 서비스.'
    },
    {
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>',
        title: '친환경물류',
        description: '탄소 배출을 줄이는 지속가능한 친환경 물류 솔루션.'
    }
];

/* ===== Contact Form Handler ===== */
async function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    if (!window.CommonJS.validateForm(form)) {
        window.CommonJS.showToast('모든 필수 항목을 입력해주세요.', 'error');
        return;
    }

    const formData = {
        name: form.querySelector('#name').value,
        phone: form.querySelector('#phone').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value,
        company: 'dongwon-logistics',
        created_at: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> 전송 중...';

    try {
        const result = await window.CommonJS.supabaseInsert('inquiries', formData);

        if (result.error) throw result.error;

        window.CommonJS.showToast('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
        form.reset();
    } catch (error) {
        console.error('Contact form error:', error);
        window.CommonJS.showToast('전송 중 오류가 발생했습니다.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Export
window.DongwonLogistics = {
    notices,
    services,
    loadNotices,
    handleContactSubmit,
    closeTrackingModal
};
