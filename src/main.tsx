import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index.jsx'
const router = createHashRouter(routes)

import 'bootstrap'
import './assets/all.scss'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)