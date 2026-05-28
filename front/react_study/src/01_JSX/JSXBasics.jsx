// JSX = JavaScript + XML 문법
// 브라우저는 JSX 못 읽음 → Babel이 JS로 변환해줌

// 기본 규칙
// 1. 반환은 하나의 루트 요소
// 2. 태그는 반드시 닫아야 함 (<br /> <img />)
// 3. class → className, for → htmlFor
// 4. {} 안에 JS 표현식 사용 가능

function JSXBasics() {
    const name = '서진';
    const isLoggedIn = true;
    const items = ['사과', '바나나', '체리'];

    return (
        // 여러 요소는 Fragment로 감싸기 (빈 태그 또는 <Fragment>)
        <>
            <h1>안녕, {name}!</h1>

            {/* 조건부 렌더링 */}
            {isLoggedIn && <p>로그인 중</p>}
            {isLoggedIn ? <p>로그아웃</p> : <p>로그인</p>}

            {/* 리스트 렌더링 - key 필수 */}
            <ul>
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>

            {/* 인라인 스타일은 객체 */}
            <p style={{ color: 'red', fontSize: '16px' }}>스타일</p>

            {/* className */}
            <div className="container">내용</div>
        </>
    );
}

export default JSXBasics;
