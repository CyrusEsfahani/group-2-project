import { Outlet, Link } from 'react-router-dom';
import AuthService from './utils/auth.ts'; // Import your auth service

function App() {
  // Check if the user is logged in using AuthService
  const isLoggedIn = AuthService.loggedIn();


  return (
    <>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button onClick={() => AuthService.logout()}>Logout</button> // Show logout button when logged in
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default App;
