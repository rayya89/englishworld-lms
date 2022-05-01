// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import signUpForm from "../data/signUpForm.json";
import { createUser } from "../scripts/firebaseAuth";
import { createDocumentWithId } from "../scripts/fireStore";

export default function SignUp({ uidState }) {
  const [uid, setUid] = uidState;

  //Local state
  const navigate = useNavigate();
  const [name, setName] = useState("Raya");
  const [email, setEmail] = useState("rayyatar@gmail.com");
  const [password, setPassword] = useState("12345678");

  //Methods
  async function onSignUp(event) {
    event.preventDefault();

    const newUid = await createUser(email, password);

    const newUser = {
      name: name,
      role: "student",
    };
    const payload = await createDocumentWithId("users", newUid, newUser);
    setUid(newUid);
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Create an account</h1>
      <p>Create an account with us and start learning!</p>
      <form onSubmit={onSignUp}>
        <InputField setup={signUpForm.name} state={[name, setName]} />
        <InputField setup={signUpForm.email} state={[email, setEmail]} />
        <InputField
          setup={signUpForm.password}
          state={[password, setPassword]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
