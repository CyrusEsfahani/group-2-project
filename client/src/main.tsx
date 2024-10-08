import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './components/login.tsx'
import SignUp from './components/signup.tsx'
import TrackSearch from './TrackSearch.tsx'

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
      path: '/tracksearch',
      element: <TrackSearch />,
    }
  ],

}]) 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>
)
