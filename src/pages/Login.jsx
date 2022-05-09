// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/loginForm.json";
import { loginUser } from "../scripts/firebaseAuth";
import { readDocument } from "../scripts/fireStore";
import { useUser } from "../state/UserContext";
import { useUid } from "../state/UidContext";
import { onFail } from "../scripts/onFail";

export default function Login() {
  const { setUser } = useUser();
  const { setUid } = useUid();

  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Methods
  async function onLogin(event) {
    event.preventDefault();
    let user;
    const uid = await loginUser(email, password).catch(onFail);
    if (uid) user = await readDocument("users", uid).catch(onFail);

    if (user) onSuccess(user, uid);
  }

  function onSuccess(user, uid) {
    setUser(user);
    setUid(uid);
    user.role === "student" && navigate("/dashboard");
    user.role === "teacher" && navigate("/list-courses");
  }

  return (
    <div>
      <h1>Welcome back!</h1>
      <p>Please login to continue studying</p>
      <form onSubmit={onLogin}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Login</button>
      </form>
      <Link to="/recover-password">Forgot password?</Link>
    </div>
  );
}
