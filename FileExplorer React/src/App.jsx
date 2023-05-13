import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const FileChildren = ({ depth, file }) => {
  const [expanded, toggle] = useState(false)
  const [parent, disableAnimations] = useAutoAnimate()
  const folderIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      />
    </svg>
  )
  const fileIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  )
  const expandIcon = expanded ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )

  return (
    <div>
      <button onClick={() => toggle(!expanded)} className={`flex gap-1 `}>
        <div className={`transition transition-all ${file.children ? '' : 'hidden'} ${expanded ? 'rotate-90' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        {file.children ? folderIcon : fileIcon}
        {file.name}
      </button>
      <div ref={parent} style={{ paddingLeft: `${depth * 10}px` }}>
        {expanded &&
          file.children &&
          file.children.map(child => <FileChildren key={child.name} depth={depth + 1} file={child} />)}
      </div>
    </div>
  )
}

const App = () => {
  const files = [
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [
            {
              name: 'Button.js',
            },
            {
              name: 'Input.js',
            },
            {
              name: 'Header.js',
            },
          ],
        },
        {
          name: 'pages',
          children: [
            {
              name: 'Home.js',
            },
            {
              name: 'About.js',
            },
            {
              name: 'Contact.js',
            },
          ],
        },
        {
          name: 'app.css',
          children: [],
        },
        {
          name: 'index.js',
          children: [],
        },
      ],
    },
    {
      name: 'public',
      children: [
        {
          name: 'index.html',
        },
        {
          name: 'favicon.ico',
        },
      ],
    },
    {
      name: 'node_modules',
      children: [
        {
          name: 'react',
        },
        {
          name: 'react-dom',
        },
        // Additional packages
      ],
    },
  ]

  return (
    <div className="p-10 flex-col space-y-4">
      <h1> File Explorer</h1>
      <div>
        {files.map(file => (
          <div key={file.name}>
            <FileChildren depth={1} file={file} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
