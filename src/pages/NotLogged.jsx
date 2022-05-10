// NPM packages
import { Link } from "react-router-dom";

export default function NotLogged() {
  return (
    <div className="not-logged">
      <h1>Sorry, you are not logged in</h1>
      <p>
        Please don't forget to login or create an account to access our content
      </p>
      <Link className="button" to="/sign-up">
        Sign up
      </Link>
      <Link className="button" to="/login">
        Login
      </Link>
    </div>
  );
}
