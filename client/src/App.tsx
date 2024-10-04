import { Outlet, Link } from 'react-router-dom';
import React from 'react';






function App() {
  

  return (
    
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <Outlet />
    </>
  );
}



export default App
