-- PostgreSQL 학습 테이블

-- 1. users
CREATE TABLE users (
    id            BIGSERIAL       PRIMARY KEY,
    email         VARCHAR(60)     NOT NULL UNIQUE,
    name          TEXT            NOT NULL,
    password      TEXT            NOT NULL,
    bio           TEXT,
    city          TEXT,
    status        TEXT            DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deleted')),
    profile_image TEXT,
    birth_date    DATE,
    created_at    TIMESTAMPTZ     DEFAULT NOW()
);

INSERT INTO users (email, name, password, bio, city) VALUES
    ('hong@test.com', '홍길동', 'hashed_pw_1', '백엔드 개발자', '서울');

-- 2. posts
CREATE TABLE posts (
    id         BIGSERIAL    PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    title      TEXT         NOT NULL,
    body       TEXT,
    status     TEXT         DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    view_count INT          DEFAULT 0,
    created_at TIMESTAMPTZ  DEFAULT NOW(),

    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

INSERT INTO posts (user_id, title, body, status, view_count) VALUES
    (1, 'PostgreSQL 시작하기', 'PostgreSQL 설치 방법과 기본 설정을 알아봅니다.', 'published', 120);

-- 3. comments
CREATE TABLE comments (
    id         BIGSERIAL    PRIMARY KEY,
    post_id    BIGINT       NOT NULL,
    user_id    BIGINT       NOT NULL,
    body       TEXT         NOT NULL,
    created_at TIMESTAMPTZ  DEFAULT NOW(),

    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO comments (post_id, user_id, body) VALUES
    (1, 1, 'BIGSERIAL이 AUTO_INCREMENT랑 같은 거군요.');

-- 4. tags
CREATE TABLE tags (
    id   BIGSERIAL PRIMARY KEY,
    name TEXT      NOT NULL UNIQUE
);

INSERT INTO tags (name) VALUES ('postgresql');

-- 5. post_tags (posts ↔ tags 다대다)
CREATE TABLE post_tags (
    post_id BIGINT NOT NULL,
    tag_id  BIGINT NOT NULL,

    PRIMARY KEY (post_id, tag_id),
    CONSTRAINT fk_pt_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_pt_tag  FOREIGN KEY (tag_id)  REFERENCES tags(id)  ON DELETE CASCADE
);

INSERT INTO post_tags (post_id, tag_id) VALUES (1, 1);

-- 6. products
CREATE TABLE products (
    id         BIGSERIAL   PRIMARY KEY,
    name       TEXT        NOT NULL,
    price      NUMERIC     NOT NULL CHECK (price >= 0),
    stock      INT         DEFAULT 0 CHECK (stock >= 0),
    status     TEXT        DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products (name, price, stock) VALUES ('노트북', 1200000, 15);

-- 7. orders
CREATE TABLE orders (
    id         BIGSERIAL    PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    total      NUMERIC      NOT NULL CHECK (total >= 0),
    status     TEXT         DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ  DEFAULT NOW(),

    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

INSERT INTO orders (user_id, total, status) VALUES (1, 1200000, 'delivered');

-- 8. shipments
CREATE TABLE shipments (
    id           BIGSERIAL    PRIMARY KEY,
    order_id     BIGINT       NOT NULL UNIQUE,
    tracking_no  TEXT,
    shipped_at   TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,

    CONSTRAINT fk_shipments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

INSERT INTO shipments (order_id, tracking_no, shipped_at, delivered_at) VALUES
    (1, 'TRK-001', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days');

-- 9. sessions
CREATE TABLE sessions (
    id         BIGSERIAL    PRIMARY KEY,
    user_id    BIGINT       NOT NULL UNIQUE,
    token      TEXT         NOT NULL,
    expires_at TIMESTAMPTZ  NOT NULL,
    created_at TIMESTAMPTZ  DEFAULT NOW(),

    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO sessions (user_id, token, expires_at) VALUES
    (1, 'tok_abc123', NOW() + INTERVAL '7 days');

-- 10. employees (Self JOIN / 재귀 CTE용)
-- manager_id 관계 확인하려면 2개 필요
CREATE TABLE employees (
    id         BIGSERIAL PRIMARY KEY,
    name       TEXT      NOT NULL,
    position   TEXT,
    manager_id BIGINT,
    salary     NUMERIC   CHECK (salary >= 0),

    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO employees (name, position, manager_id, salary) VALUES
    ('김대표', 'CEO',          NULL, 8000000),
    ('이부장', 'Backend Lead',    1, 4500000);

-- 11. accounts (트랜잭션 실습용)
CREATE TABLE accounts (
    id         BIGSERIAL   PRIMARY KEY,
    user_id    BIGINT      NOT NULL UNIQUE,
    balance    NUMERIC     DEFAULT 0 CHECK (balance >= 0),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_accounts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO accounts (user_id, balance) VALUES (1, 500000);

-- 12. login_attempts
CREATE TABLE login_attempts (
    ip         VARCHAR(45) PRIMARY KEY,
    count      INT         DEFAULT 0,
    lock_until TIMESTAMPTZ
);

INSERT INTO login_attempts (ip, count, lock_until) VALUES ('192.168.0.1', 2, NULL);

-- 13. email_verify
CREATE TABLE email_verify (
    id         BIGSERIAL    PRIMARY KEY,
    email      VARCHAR(60)  NOT NULL UNIQUE,
    code       VARCHAR(6)   NOT NULL,
    expired_at TIMESTAMPTZ  NOT NULL,
    verified   BOOLEAN      DEFAULT FALSE,
    created_at TIMESTAMPTZ  DEFAULT NOW()
);

INSERT INTO email_verify (email, code, expired_at, verified) VALUES
    ('new1@test.com', '391827', NOW() + INTERVAL '5 minutes', FALSE);

-- 14. logs
CREATE TABLE logs (
    id         BIGSERIAL    PRIMARY KEY,
    user_id    BIGINT,
    action     TEXT         NOT NULL,
    detail     JSONB,
    ip         VARCHAR(45),
    created_at TIMESTAMPTZ  DEFAULT NOW()
);

INSERT INTO logs (user_id, action, detail, ip) VALUES
    (1, 'LOGIN', '{"method": "email"}', '192.168.0.1');

-- 인덱스
CREATE INDEX idx_posts_user_id    ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_orders_user_id   ON orders(user_id);
CREATE INDEX idx_logs_user_id     ON logs(user_id);
CREATE INDEX idx_logs_created_at  ON logs(created_at DESC);
CREATE INDEX idx_logs_detail      ON logs USING GIN (detail);

-- 학습 확인용 쿼리

-- SELECT u.name, p.title FROM users u INNER JOIN posts p ON u.id = p.user_id;

-- SELECT u.name, COUNT(p.id) AS post_count
-- FROM users u LEFT JOIN posts p ON u.id = p.user_id
-- GROUP BY u.id, u.name;

-- WITH RECURSIVE org AS (
--     SELECT id, name, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL
--     UNION ALL
--     SELECT e.id, e.name, e.manager_id, o.depth + 1
--     FROM employees e INNER JOIN org o ON e.manager_id = o.id
-- )
-- SELECT * FROM org ORDER BY depth;