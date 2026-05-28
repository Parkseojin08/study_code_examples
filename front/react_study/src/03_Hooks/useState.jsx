import { useState } from 'react';

// useState: 컴포넌트 안에서 값이 바뀌면 다시 렌더링 필요할 때
// const [상태, 변경함수] = useState(초기값)

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>초기화</button>
        </div>
    );
}

// 객체 상태 - 스프레드로 기존 값 유지
function ProfileForm() {
    const [form, setForm] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form>
            <input name="name"  value={form.name}  onChange={handleChange} placeholder="이름" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
            <p>{form.name} / {form.email}</p>
        </form>
    );
}

// 토글
function Toggle() {
    const [on, setOn] = useState(false);
    return <button onClick={() => setOn(prev => !prev)}>{on ? 'ON' : 'OFF'}</button>;
    // prev 쓰는 이유: 이전 값 기준으로 바꿀 때 안전함
}

// 배열 상태
function TodoList() {
    const [todos, setTodos]   = useState([]);
    const [input, setInput]   = useState('');

    const add = () => {
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, done: false }]);
        setInput('');
    };

    const toggle = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const remove = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={add}>추가</button>
            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                        <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}
                              onClick={() => toggle(t.id)}>
                            {t.text}
                        </span>
                        <button onClick={() => remove(t.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { Counter, ProfileForm, Toggle, TodoList };
