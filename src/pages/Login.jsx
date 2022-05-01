// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/loginForm.json";
import { loginUser } from "../scripts/firebaseAuth";
import { getDocument } from "../scripts/fireStore";

export default function Login({ uidState }) {
  const [uid, setUid] = uidState;

  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Methods
  async function onLogin(event) {
    event.preventDefault();

    const logginUID = await loginUser(email, password);
    const user = await getDocument("users", logginUID);

    if (logginUID) {
      setUid(user);
      navigate("/dashboard");
    }
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
    </div>
  );
}
