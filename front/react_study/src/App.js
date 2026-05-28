import { useState } from 'react';
import './App.css';

import JSXBasics from './01_JSX/JSXBasics';

import { Counter, ProfileForm, Toggle, TodoList } from './03_Hooks/useState';
import { Timer, UserList } from './03_Hooks/useEffect';
import { FocusInput, PrevValue, Parent } from './03_Hooks/useRef_useMemo_useCallback';
import UseContextApp from './03_Hooks/useContext';

const menus = [
  '01 JSX',
  '03 useState',
  '03 useEffect',
  '03 useRef·useMemo·useCallback',
  '03 useContext',
];

function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="app">
      <h1 className="app-title">React 학습</h1>

      <div className="tab-bar">
        {menus.map((m, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`tab-btn ${tab === i ? 'active' : ''}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="content">
        {tab === 0 && (
          <Section title="JSX 기본">
            <JSXBasics />
          </Section>
        )}
        {tab === 1 && (
          <Section title="useState">
            <Block label="Counter">     <Counter />     </Block>
            <Block label="Toggle">      <Toggle />      </Block>
            <Block label="ProfileForm"> <ProfileForm /> </Block>
            <Block label="TodoList">    <TodoList />    </Block>
          </Section>
        )}
        {tab === 2 && (
          <Section title="useEffect">
            <Block label="Timer">    <Timer />    </Block>
            <Block label="UserList"> <UserList /> </Block>
          </Section>
        )}
        {tab === 3 && (
          <Section title="useRef · useMemo · useCallback">
            <Block label="useRef - FocusInput">  <FocusInput /> </Block>
            <Block label="useRef - PrevValue">   <PrevValue />  </Block>
            <Block label="useCallback - Parent"> <Parent />     </Block>
          </Section>
        )}
        {tab === 4 && (
          <Section title="useContext">
            <UseContextApp />
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div className="block">
      <p className="block-label">{label}</p>
      <div className="block-body">{children}</div>
    </div>
  );
}

export default App;