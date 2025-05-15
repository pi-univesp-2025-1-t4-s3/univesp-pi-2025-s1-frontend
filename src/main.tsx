import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

//layout
import MainLayout from './layout'

//pages
import InitialPage from './routes/initial/initial'
import Login from './routes/login/login'
import Menu from './routes/menu/menu'
import { Perfil } from './routes/perfil/perfil'
import { Products } from './routes/products/products'
import { Stock } from './routes/stock/stock'
import { Sales } from './routes/sales/sales'

//actions

import { action as login_action } from './routes/login/login_action'

//loaders

import { protected_routes_loader } from './protected_routes_loader'
import { loader as logout } from './routes/logout'
import  perfil_loader  from './routes/perfil/perfil_loader'
import products_loader from './routes/products/products_loader'
import { stock_loader } from './routes/stock/stock_loader'
import { Sales_Loader } from './routes/sales/sales_loader'


const router = createBrowserRouter([

  {
    element: <MainLayout/>,

    children: [


      {
        path:'/',
        element: <InitialPage/>
      },
      {
        path:'/login',
        element: <Login/>,
        action: login_action
      },

      {
        path: '/logout',
        loader: logout,
      },

      {
        loader: protected_routes_loader,
        children: [
          {
            path:'/menu',
            element: <Menu/>
          },
          {
            path: '/perfil',
            element: <Perfil/>,
            loader: perfil_loader
          },
          {
            path: '/products',
            element: <Products/>,
            loader: products_loader
          },
          {
            path: '/stock',
            element: <Stock/>,
            loader: stock_loader
          },
          {
            path: '/sales',
            element: <Sales/>,
            loader: Sales_Loader
          }
        ],
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
