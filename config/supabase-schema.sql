-- =========================================
-- KOC Web Studio - Supabase Database Schema
-- =========================================

-- 문의 테이블 (모든 사이트 공통)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시판 게시글 테이블
CREATE TABLE IF NOT EXISTS board_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id VARCHAR(100) NOT NULL,
    board_type VARCHAR(50) DEFAULT 'notice',
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    view_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시판 댓글 테이블
CREATE TABLE IF NOT EXISTS board_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES board_posts(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 예약 테이블 (호텔, 병원, 피트니스 등)
CREATE TABLE IF NOT EXISTS reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id VARCHAR(100) NOT NULL,
    service_type VARCHAR(100),
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME,
    party_size INTEGER DEFAULT 1,
    special_requests TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 상품/포트폴리오 테이블
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 뉴스레터 구독 테이블
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(site_id, email)
);

-- =========================================
-- Row Level Security (RLS) Policies
-- =========================================

-- inquiries 테이블 RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read inquiries" ON inquiries FOR SELECT USING (true);

-- board_posts 테이블 RLS
ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published posts" ON board_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can insert posts" ON board_posts FOR INSERT WITH CHECK (true);

-- board_comments 테이블 RLS
ALTER TABLE board_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read comments" ON board_comments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert comments" ON board_comments FOR INSERT WITH CHECK (true);

-- reservations 테이블 RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert reservations" ON reservations FOR INSERT WITH CHECK (true);

-- products 테이블 RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read available products" ON products FOR SELECT USING (is_available = true);

-- newsletter_subscribers 테이블 RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- =========================================
-- Indexes for Performance
-- =========================================

CREATE INDEX IF NOT EXISTS idx_inquiries_site_id ON inquiries(site_id);
CREATE INDEX IF NOT EXISTS idx_board_posts_site_id ON board_posts(site_id);
CREATE INDEX IF NOT EXISTS idx_board_posts_board_type ON board_posts(board_type);
CREATE INDEX IF NOT EXISTS idx_reservations_site_id ON reservations(site_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_products_site_id ON products(site_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
