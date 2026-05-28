const { Pool } = require("pg");

const pool = new Pool({
    host:     process.env.PG_HOST,
    port:     Number(process.env.PG_PORT) || 5432,
    database: process.env.PG_DATABASE,
    user:     process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

// 단순 쿼리
const result = await pool.query("SELECT * FROM users");
result.rows;      // 행 배열
result.rowCount;  // 영향받은 행 수

// 파라미터화 쿼리 (SQL Injection 막으려면 항상 이렇게)
const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
);

// RETURNING - insert/update 결과 바로 반환
const { rows: [user] } = await pool.query(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, created_at",
    [email, name]
);

// 트랜잭션
async function withTransaction(fn) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release(); // 안 하면 커넥션 고갈
    }
}

// 사용 예시
await withTransaction(async (client) => {
    await client.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [amount, fromId]);
    await client.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [amount, toId]);
});

module.exports = pool;
