import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import MessageToast from './components/MessageToast.js'

import 'bootstrap'
import './assets/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

const router = createHashRouter(routes)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MessageToast />
    <RouterProvider router={router} />
  </Provider>
)