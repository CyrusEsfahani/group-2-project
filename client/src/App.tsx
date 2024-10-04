import { Outlet, Link } from 'react-router-dom';

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
