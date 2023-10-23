import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./routes/Home"
import Play from "./routes/Play"
import ChapterOne from "./routes/ChapterOne"
import ChapterTwo from "./routes/ChapterTwo"
import ChapterThree from "./routes/ChapterThree"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/play',
    element: <Play/>
  },
  {
    path: '/play/chapter-one',
    element: <ChapterOne/>
  },
  {
    path: '/play/chapter-two',
    element: <ChapterTwo/>
  },
  {
    path: '/play/chapter-three',
    element: <ChapterThree/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
