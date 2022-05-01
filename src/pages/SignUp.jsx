// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/signUpForm.json";
import { createUser } from "../scripts/firebaseAuth";
import { createDocumentWithId, getDocument } from "../scripts/fireStore";

export default function SignUp({ uidState }) {
  const [uid, setUid] = uidState;
  const navigate = useNavigate();

  //Local state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Methods
  async function onSignUp(event) {
    event.preventDefault();

    const newUid = await createUser(email, password);

    const newUser = {
      name: name,
      role: "student",
    };
    const payload = await createDocumentWithId("users", newUid, newUser);
    const userData = await getDocument("users", newUid);
    setUid(userData);
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Create an account</h1>
      <p>Create an account with us and start learning!</p>
      <form onSubmit={onSignUp}>
        <InputField setup={form.name} state={[name, setName]} />
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Create account</button>
      </form>
    </div>
  );
}
