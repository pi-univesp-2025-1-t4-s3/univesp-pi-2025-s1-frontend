import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

//layout
import MainLayout from './layout'

//pages
import InitialPage from './routes/initial/initial'
import Login from './routes/login/login'
import Menu from './routes/menu/menu'
import { Perfil } from './routes/perfil/perfil'

//actions

import { action as login_action } from './routes/login/login_action'

//loaders

import { protected_routes_loader } from './protected_routes_loader'
import { loader as logout } from './routes/logout'
import  perfil_loader  from './routes/perfil/perfil_loader'
import { Progress } from './routes/progress/progress'


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
            element: <Progress/>,
          },
          {
            path: '/stock',
            element: <Progress/>,
          },
          {
            path: '/sales',
            element: <Progress/>,
          }
        ],
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
