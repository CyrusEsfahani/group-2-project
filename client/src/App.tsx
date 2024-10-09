import { Outlet, Link } from "react-router-dom";
import AuthService from "./utils/auth.ts"; // Import your auth service
import Navbar from "./components/Navbar.tsx";

function App() {
  // Check if the user is logged in using AuthService
  const isLoggedIn = AuthService.loggedIn();

  return (
    <>
      <Navbar />
      <button onClick={() => AuthService.logout()}>Logout</button>
      <Outlet />
    </>
  );
}

export default App;
