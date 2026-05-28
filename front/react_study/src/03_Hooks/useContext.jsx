import { createContext, useContext, useState } from 'react';

// useContext: props 없이 전역 상태 공유
// prop drilling(여러 단계 거쳐서 props 내리기) 해결

// 1. Context 생성
const AuthContext = createContext(null);

// 2. Provider로 감싸기
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login  = (name) => setUser({ name });
    const logout = ()     => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. 커스텀 훅으로 감싸면 편함
function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('AuthProvider 안에서만 사용 가능');
    return ctx;
}

// 어디서든 useAuth()로 꺼내 씀
function Header() {
    const { user, logout } = useAuth();
    return (
        <header>
            {user ? (
                <>
                    <span>{user.name}님</span>
                    <button onClick={logout}>로그아웃</button>
                </>
            ) : (
                <span>로그인 필요</span>
            )}
        </header>
    );
}

function LoginForm() {
    const { login } = useAuth();
    const [name, setName] = useState('');

    return (
        <form onSubmit={e => { e.preventDefault(); login(name); }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="이름" />
            <button type="submit">로그인</button>
        </form>
    );
}

// 최상위에서 Provider로 감쌈
function App() {
    return (
        <AuthProvider>
            <Header />
            <LoginForm />
        </AuthProvider>
    );
}

export { AuthProvider, useAuth };
export default App;
