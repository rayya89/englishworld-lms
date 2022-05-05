// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/loginForm.json";
import { loginUser } from "../scripts/firebaseAuth";
import { getDocument } from "../scripts/fireStore";
import { useUser } from "../state/UserContext";
import { onFail } from "../scripts/onFail";

export default function Login() {
  const { setUser } = useUser();

  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Methods
  async function onLogin(event) {
    event.preventDefault();
    let user;
    const uid = await loginUser(email, password).catch(onFail);
    if (uid) user = await getDocument("users", uid).catch(onFail);

    if (user) onSuccess(user);
  }

  function onSuccess(user) {
    setUser(user);
    {
      user.role === "student" && navigate("/dashboard");
    }
    {
      user.role === "teacher" && navigate("/list-courses");
    }
  }

  return (
    <div>
      <h1>Welcome back! Please login to continue studying</h1>
      <form onSubmit={onLogin}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Login</button>
      </form>
      <Link to="/recover-password">Forgot password?</Link>
    </div>
  );
}
