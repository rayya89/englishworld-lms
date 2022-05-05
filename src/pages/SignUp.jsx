// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/signUpForm.json";
import { createUser } from "../scripts/firebaseAuth";
import { createDocumentWithId, getDocument } from "../scripts/fireStore";
import { useUser } from "../state/UserContext";
import { onFail } from "../scripts/onFail";

export default function SignUp() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  //Local state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Methods
  async function onSignUp(event) {
    event.preventDefault();

    const newUid = await createUid().catch(onFail);
    let newUser, userData;
    if (newUid) newUser = await createDocument(newUid).catch(onFail);
    if (newUser) userData = await getUserData(newUid).catch(onFail);
    if (userData) onSuccess(userData);
  }

  async function createUid() {
    const newUid = await createUser(email, password);
    return newUid;
  }

  async function createDocument(newUid) {
    const newUser = { name: name, role: "student" };
    const payload = await createDocumentWithId("users", newUid, newUser);
    return payload;
  }

  async function getUserData(newUid) {
    const userData = await getDocument("users", newUid);
    return userData;
  }

  async function onSuccess(userData) {
    setUser(userData);
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
