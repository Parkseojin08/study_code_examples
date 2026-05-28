// let - 재할당 가능
let count = 0;
count = 1;

// const - 재할당 불가 (기본적으로 const 쓰기)
const MAX = 100;

// 자료형
let num = 42;
let str = "안녕";
let bool = true;
let nothing = null;
let undef = undefined;

console.log(typeof num);  // number
console.log(typeof str);  // string
console.log(typeof null); // object (버그임, 원래 null이어야 함)

// 형 변환
console.log(Number("42"));     // 42
console.log(Number(""));       // 0
console.log(Number(null));     // 0
console.log(Number(undefined));// NaN

console.log(Boolean(0));   // false
console.log(Boolean(""));  // false
console.log(Boolean(null));// false
// 0, "", null, undefined, NaN, false → falsy

// 템플릿 리터럴
let name = "서진";
console.log(`안녕, ${name}!`);
