import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './components/Login.tsx'
import SignUp from './components/SignUp.tsx'
import Home from './components/Home.tsx'


const router= createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/login',
      element: <Login />,

    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      index: true,
      element: <Home />
    },

  ],

}]) 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>
)
