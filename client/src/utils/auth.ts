import { type JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return {
      username: "testuser",
      email: "testuser@example.com",
    };
  }

  loggedIn() {
    // For now, we just return true to simulate a logged-in state
    return true;
  }

  login(idToken: string) {
    // Skip token handling for now and redirect directly to the TrackSearch page
    window.location.assign("/tracksearch");
  }

  logout() {
    // Clear token and redirect to login page on logout
    window.location.assign("/login");
  }
}

export default new AuthService();