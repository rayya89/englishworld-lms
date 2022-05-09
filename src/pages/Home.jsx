import { Link } from "react-router-dom";
import BookImage from "../assets/home.png";

// ok
export default function Home() {
  return (
    <div className="home">
      <img className="left" src={BookImage} alt="book with apple and hat" />
      <div className="right">
        <h1>English World</h1>
        <p>
          Welcome to English World! English World is one of the leading
          educational platform that holds course content, materials and
          administration in one user-friendly online system. It allows teachers
          to easily manage courses and track their students, highlighting areas
          of strength and weakness for ongoing performance improvement.
        </p>
        <p>Sign up for free and start Learning now!</p>
        <div className="home-buttons">
          <Link className="button" to="/sign-up">
            Sign up
          </Link>
          <Link className="button" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
