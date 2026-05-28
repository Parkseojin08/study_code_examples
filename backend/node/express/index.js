require("dotenv").config(); // 무조건 맨 위

const express      = require("express");
const cors         = require("cors");
const cookieParser = require("cookie-parser");

const app  = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true, // 쿠키 허용
}));

app.use("/uploads", express.static("uploads"));

// 라우터
// app.use("/api/auth",  require("./routes/auth"));
// app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// 에러 핸들러 (4개 인자, 마지막에)
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        error: {
            code:    err.code    || "INTERNAL_ERROR",
            message: err.message || "서버 오류",
        },
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
