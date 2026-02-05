import Layout from '../layout/Layout';
import AdminLayout from '../layout/AdminLayout';
import { Home }  from '../pages/Home'
import { Products } from '../pages/Products'
import { Product } from '../pages/Product'
import { Cart } from '../pages/Cart'
import { NotFound } from '../pages/NotFound'
import { Login } from '../pages/Login'
import { AdminProducts } from '../pages/admin/AdminProducts'
import { AdminOrders } from '../pages/admin/AdminOrders'
import { AdminCoupons } from '../pages/admin/AdminCoupons'
import { CreateOrder } from '../pages/CreateOrder'
import { ConfirmOrder } from '../pages/ConfirmOrder'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'product/:id',
        element: <Product />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'create_order',
        element: <CreateOrder />
      },
      {
        path: 'confirm_order',
        element: <ConfirmOrder />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminProducts />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'coupons',
        element: <AdminCoupons />
      }
    ]
  }
]

export default routes;
