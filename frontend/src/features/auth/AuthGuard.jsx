import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

/**
 * AuthGuard component
 * Wraps protected routes and redirects unauthenticated users to /login
 */
export default function AuthGuard({ children }) {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation(); // current location

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authenticated, render the protected component
  return children;
}
