import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth"; // Update the path as per your project structure
import { Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext);
  let navigate = useNavigate();

  if (!isAuthenticated) {
    // user is not authenticated! Return them to the login page.
    navigate("/login");
    return null;
  }

  // User is authenticated
  return <Route {...rest}>{children}</Route>;
}
