// 산술
let a = 10, b = 3;
console.log(a + b); // 13
console.log(a % b); // 1  나머지
console.log(a ** b);// 1000  거듭제곱

// 비교: == 는 타입 변환함, === 는 안 함
// 항상 === 써
console.log("5" == 5);  // true (타입 변환)
console.log("5" === 5); // false

// null 병합: null이나 undefined일 때만 우측 반환
let user = null;
let name = user ?? "게스트"; // "게스트"

// 옵셔널 체이닝: 프로퍼티 없어도 에러 안 남
let profile = { address: { city: "서울" } };
console.log(profile?.phone?.number); // undefined (에러 없음)

// 삼항
let age = 20;
let type = age >= 18 ? "성인" : "미성년자";

// if / else if / else
let score = 85;
if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else {
    console.log("F");
}

// switch
let day = "MON";
switch (day) {
    case "SAT":
    case "SUN":
        console.log("주말");
        break;
    default:
        console.log("평일");
}
