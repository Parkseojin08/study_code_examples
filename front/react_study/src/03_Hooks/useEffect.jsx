import { useState, useEffect } from 'react';

// useEffect: 렌더링 이후 실행할 사이드 이펙트
// 사이드 이펙트 = fetch, 타이머, 이벤트 리스너, DOM 조작 등

// 의존성 배열에 따라 실행 시점이 달라짐
// []         → 마운트 시 1번만
// [a, b]     → a나 b가 바뀔 때마다
// 생략        → 매 렌더링마다 (거의 안 씀)

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setSeconds(s => s + 1), 1000);

        // cleanup: 언마운트될 때 실행 (메모리 누수 방지)
        return () => clearInterval(id);
    }, []); // 마운트 1번만

    return <p>{seconds}초</p>;
}

// 데이터 fetching
function UserList() {
    const [users, setUsers]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);

    useEffect(() => {
        let cancelled = false; // 언마운트 후 setState 방지

        async function fetchUsers() {
            try {
                const res  = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await res.json();
                if (!cancelled) setUsers(data);
            } catch (e) {
                if (!cancelled) setError(e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchUsers();
        return () => { cancelled = true; };
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error)   return <p>에러: {error}</p>;

    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    );
}

// 검색어 바뀔 때마다 fetch
function Search() {
    const [query, setQuery]   = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) { setResults([]); return; }

        const timer = setTimeout(async () => {
            const res  = await fetch(`/api/search?q=${query}`);
            const data = await res.json();
            setResults(data);
        }, 300); // 디바운스

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="검색" />
            <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
        </div>
    );
}

export { Timer, UserList, Search };
