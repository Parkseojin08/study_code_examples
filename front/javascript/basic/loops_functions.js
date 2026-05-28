// for
for (let i = 0; i < 5; i++) {
    if (i === 2) continue; // 건너뜀
    if (i === 4) break;    // 종료
    console.log(i);        // 0 1 3
}

// while
let n = 0;
while (n < 3) {
    console.log(n++);
}

// for...of - 배열 값 순회
const fruits = ["사과", "바나나", "체리"];
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in - 객체 키 순회
const person = { name: "홍길동", age: 25 };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 함수 선언식 (호이스팅 됨)
function add(a, b) {
    return a + b;
}

// 화살표 함수
const multiply = (a, b) => a * b;
const square = x => x ** 2; // 매개변수 하나면 괄호 생략

// 기본값 매개변수
function greet(name = "게스트") {
    return `안녕, ${name}!`;
}

// rest 파라미터 - 나머지를 배열로
function sum(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
