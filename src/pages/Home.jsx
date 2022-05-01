import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <p>
        Welcome to English World! English World is one of the leading
        educational platform that holds course content, materials and
        administration in one user-friendly online system. It allows teachers to
        easily manage courses and track their students, highlighting areas of
        strength and weakness for ongoing performance improvement.
      </p>
      <p>Sign up for free and start Learning now!</p>
      <Link to="/sign-up">Sign up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
