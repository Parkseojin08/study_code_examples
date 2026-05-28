const bcrypt     = require("bcrypt");
const jwt        = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto     = require("crypto");

// bcrypt
async function hashPassword(password) {
    return bcrypt.hash(password, 10); // 10 = saltRounds
}
async function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// jwt
const ACCESS_SECRET  = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function createTokens(payload) {
    const accessToken  = jwt.sign(payload, ACCESS_SECRET,  { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

function verifyAccess(token) {
    return jwt.verify(token, ACCESS_SECRET);
    // 만료 → TokenExpiredError, 위조 → JsonWebTokenError
}

// nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail 앱 비밀번호
    },
});

async function sendCode(email, code) {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to:   email,
        subject: "인증 코드",
        html: `<h2>인증 코드: ${code}</h2><p>5분 안에 입력하세요.</p>`,
    });
}

// crypto
const code  = crypto.randomInt(100000, 999999).toString(); // 6자리 인증 코드
const token = crypto.randomBytes(32).toString("hex");      // 랜덤 토큰
const uuid  = crypto.randomUUID();

module.exports = { hashPassword, checkPassword, createTokens, verifyAccess, sendCode };
