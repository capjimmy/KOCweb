/**
 * NEXGEN SECURITY - Board Page JavaScript
 * Board functionality with filtering, search, and pagination
 */

class BoardManager {
    constructor() {
        this.posts = window.boardData || [];
        this.filteredPosts = [...this.posts];
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.currentCategory = 'all';
        this.searchTerm = '';

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkURLParams();
        this.render();
    }

    bindEvents() {
        // Category filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentCategory = tab.dataset.category;
                this.currentPage = 1;
                this.filterPosts();
            });
        });

        // Search functionality
        const searchInput = document.getElementById('boardSearch');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.filterPosts();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterPosts();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterPosts();
            });
        }

        // Modal close button
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletter(e));
        }
    }

    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId) {
            const post = this.posts.find(p => p.id === parseInt(postId));
            if (post) {
                setTimeout(() => this.openModal(post), 500);
            }
        }
    }

    filterPosts() {
        this.filteredPosts = this.posts.filter(post => {
            const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
            const matchesSearch = !this.searchTerm ||
                post.title.toLowerCase().includes(this.searchTerm) ||
                post.excerpt.toLowerCase().includes(this.searchTerm) ||
                post.author.toLowerCase().includes(this.searchTerm);
            return matchesCategory && matchesSearch;
        });
        this.render();
    }

    render() {
        this.renderPosts();
        this.renderPagination();
    }

    renderPosts() {
        const container = document.getElementById('boardList');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        if (postsToShow.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>검색 결과가 없습니다.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = postsToShow.map((post, index) => `
            <div class="board-item" data-id="${post.id}" data-aos="fade-up" data-aos-delay="${index * 50}">
                <span class="board-category ${post.category}">${post.categoryName}</span>
                <div class="board-content">
                    <h3 class="board-title">${post.title}</h3>
                    <p class="board-excerpt">${post.excerpt}</p>
                </div>
                <div class="board-author">
                    <i class="fas fa-user-circle"></i>
                    <span>${post.author}</span>
                </div>
                <div class="board-meta">
                    <span class="board-date">${post.date}</span>
                    <span class="board-views"><i class="fas fa-eye"></i> ${post.views.toLocaleString()}</span>
                </div>
            </div>
        `).join('');

        // Add click events
        container.querySelectorAll('.board-item').forEach(item => {
            item.addEventListener('click', () => {
                const postId = parseInt(item.dataset.id);
                const post = this.posts.find(p => p.id === postId);
                if (post) {
                    this.openModal(post);
                }
            });
        });

        // Trigger AOS animations for new items
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        } else {
            // Manual animation trigger
            setTimeout(() => {
                container.querySelectorAll('[data-aos]').forEach(el => {
                    el.classList.add('aos-animate');
                });
            }, 100);
        }
    }

    renderPagination() {
        const container = document.getElementById('pagination');
        if (!container) return;

        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = '';

        // Previous button
        html += `
            <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= this.currentPage - 1 && i <= this.currentPage + 1)
            ) {
                html += `
                    <button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                html += `<span class="page-ellipsis">...</span>`;
            }
        }

        // Next button
        html += `
            <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        container.innerHTML = html;

        // Add click events
        container.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.disabled) {
                    this.currentPage = parseInt(btn.dataset.page);
                    this.render();
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                }
            });
        });
    }

    openModal(post) {
        const modal = document.getElementById('postModal');
        if (!modal) return;

        // Set category class based on post category
        const categoryEl = modal.querySelector('.post-category');
        categoryEl.className = `post-category ${post.category}`;
        categoryEl.textContent = post.categoryName;

        modal.querySelector('.post-title').textContent = post.title;
        modal.querySelector('.post-author span').textContent = post.author;
        modal.querySelector('.post-date span').textContent = post.date;
        modal.querySelector('.post-views span').textContent = post.views.toLocaleString();
        modal.querySelector('.post-content').innerHTML = post.content;

        modal.classList.add('active');
        document.body.classList.add('no-scroll');

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('id', post.id);
        window.history.pushState({}, '', url);
    }

    closeModal() {
        const modal = document.getElementById('postModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');

            // Clear URL params
            const url = new URL(window.location);
            url.searchParams.delete('id');
            window.history.pushState({}, '', url);
        }
    }

    async handleNewsletter(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        const form = e.target;

        // Simple validation
        if (!email || !email.includes('@')) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        // Show success message
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="btn-text"><i class="fas fa-check"></i> 구독 완료!</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            form.reset();
        }, 3000);
    }
}

// Global close modal function
window.closeModal = function() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        const url = new URL(window.location);
        url.searchParams.delete('id');
        window.history.pushState({}, '', url);
    }
};

// Initialize board manager
document.addEventListener('DOMContentLoaded', () => {
    new BoardManager();
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.closeModal();
    }
});
