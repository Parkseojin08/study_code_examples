import { useState, useRef, useMemo, useCallback } from 'react';

// useRef: 렌더링 없이 값 저장 or DOM 직접 접근
// 값이 바뀌어도 리렌더링 안 일어남

function FocusInput() {
    const inputRef = useRef(null);

    const focus = () => inputRef.current.focus();

    return (
        <div>
            <input ref={inputRef} placeholder="여기에 포커스" />
            <button onClick={focus}>포커스</button>
        </div>
    );
}

// 이전 값 기억
function PrevValue() {
    const [count, setCount] = useState(0);
    const prev = useRef(0);

    const increment = () => {
        prev.current = count; // 렌더링 없이 저장
        setCount(c => c + 1);
    };

    return (
        <div>
            <p>현재: {count} / 이전: {prev.current}</p>
            <button onClick={increment}>+</button>
        </div>
    );
}


// useMemo: 계산 결과 캐싱 (값)
// 의존성이 바뀔 때만 다시 계산

function ExpensiveCalc({ numbers }) {
    const sum = useMemo(() => {
        console.log('합계 계산 중...');
        return numbers.reduce((acc, n) => acc + n, 0);
    }, [numbers]); // numbers 바뀔 때만 재계산

    return <p>합계: {sum}</p>;
}


// useCallback: 함수 캐싱
// 자식에게 함수를 넘길 때 매 렌더링마다 새 함수 생성 방지

function Parent() {
    const [count, setCount] = useState(0);
    const [text, setText]   = useState('');

    // text 바뀌어도 handleClick은 새로 만들어지지 않음
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []); // 의존성 없음

    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <Child onClick={handleClick} />
            <p>클릭: {count}</p>
        </div>
    );
}

function Child({ onClick }) {
    console.log('Child 렌더링');
    return <button onClick={onClick}>클릭</button>;
}

export { FocusInput, PrevValue, ExpensiveCalc, Parent };
