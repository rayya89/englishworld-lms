// NPM packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/recoverPasswordForm.json";
import { recoverUser } from "../scripts/firebaseAuth";
import { onFail } from "../scripts/onFail";

export default function RecoverPassword() {
  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");

  // Method
  async function onRecover(event) {
    event.preventDefault();

    const result = await recoverUser(email).catch(onFail);

    if (result) onSuccess(email);
  }

  function onSuccess(email) {
    alert(`We sent an email to ${email}. Check you spam folder as well.`);
    navigate("/login");
  }

  return (
    <div className="recover-password">
      <p>
        If you forgot your password, enter the email used to create the account.
      </p>
      <p>Check also your spam folder.</p>
      <form onSubmit={onRecover}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <button>Recover account</button>
      </form>
      <Link to="/login">Go back to login</Link>
    </div>
  );
}
