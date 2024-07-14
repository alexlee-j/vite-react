import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/reset.css'
import routers from '@/routes/index'
import {RouterProvider} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>,
)
 