import { useState } from 'react'
import { VanillaExample } from './examples/VanillaExample'
import { ReactExample } from './examples/ReactExample'
import { ReactHookFormExample } from './examples/ReactHookFormExample'

type Tab = 'vanilla' | 'react' | 'react-hook-form'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('vanilla')

  return (
    <div className="app">
      <header className="header">
        <h1>ratio-lock</h1>
        <p className="tagline">
          A TypeScript library for managing numbers with locked ratios
        </p>
        <div className="badges">
          <a
            href="https://www.npmjs.com/package/ratio-lock"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/npm/v/ratio-lock.svg"
              alt="npm version"
            />
          </a>
          <a
            href="https://github.com/tupe12334/ratio-lock"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/github/stars/tupe12334/ratio-lock.svg?style=social"
              alt="GitHub stars"
            />
          </a>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'vanilla' ? 'active' : ''}`}
          onClick={() => setActiveTab('vanilla')}
        >
          Vanilla JS
        </button>
        <button
          className={`tab ${activeTab === 'react' ? 'active' : ''}`}
          onClick={() => setActiveTab('react')}
        >
          React
        </button>
        <button
          className={`tab ${activeTab === 'react-hook-form' ? 'active' : ''}`}
          onClick={() => setActiveTab('react-hook-form')}
        >
          React Hook Form
        </button>
      </nav>

      <main className="content">
        {activeTab === 'vanilla' && <VanillaExample />}
        {activeTab === 'react' && <ReactExample />}
        {activeTab === 'react-hook-form' && <ReactHookFormExample />}
      </main>

      <footer className="footer">
        <p>
          <a
            href="https://github.com/tupe12334/ratio-lock"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://www.npmjs.com/package/ratio-lock"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
          {' | '}
          <a
            href="https://github.com/tupe12334/ratio-lock#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </footer>
    </div>
  )
}
