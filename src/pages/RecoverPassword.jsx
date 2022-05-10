// NPM packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import form from "../data/recoverPasswordForm.json";
import { recoverUser } from "../scripts/firebaseAuth";
import { onFail } from "../scripts/onFail";
import Logo from "../assets/logo.png";
import Hero from "../assets/recoverPassword.png";

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
      <section className="hero-section">
        <img src={Hero} alt="lost-key" />
        <h2>Recover your account in one step!</h2>
      </section>
      <section className="form-section">
        <img src={Logo} alt="English World logo" />
        <p>
          Enter the email used to create your account. Check also your spam
          folder.
        </p>
        <form className="form" onSubmit={onRecover}>
          <InputField setup={form.email} state={[email, setEmail]} />
          <button className="button">Recover account</button>
        </form>
        <Link className="link" to="/login">
          Go back to login
        </Link>
      </section>
    </div>
  );
}
