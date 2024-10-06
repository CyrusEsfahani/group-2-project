import { Outlet, Link } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar.tsx';


function App() {
  return (
    
    <>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav> */}
      <Navbar />
      <Outlet />
    </>
  );
}



export default App
