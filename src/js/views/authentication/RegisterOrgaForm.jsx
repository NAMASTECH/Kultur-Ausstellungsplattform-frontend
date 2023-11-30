// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from "react";

// Imports von benoetigten Paketen
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterOrgaUserForm.scss";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);

  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [firstname, lastname, email, organization, password, confirmPassword]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      firstname,
      lastname,
      email,
      organization,
      password,
    };


    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register/organizer`,
        userData
      );
      alert("Sie haben sich erfolgreich registriert ", resp)
    } catch (error) {
      console.error(error);
    }
  };

  const handleFirstnameChange = (evt) => {
    setFirstname(evt.target.value);
  };
  const handleLastnameChange = (evt) => {
    setLastname(evt.target.value);
  };
  const handleOrganizationChange = (evt) => {
    setOrganization(evt.target.value);
  };
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
  const validateForm = () => {
    // Pruefe, ob alle Felder befuellt und Passwortfelder gleich
    const isValid = password.length > 0 && password === confirmPassword;
    setConfirmBtnActive(isValid);
  };

  return (
    <form className="register-Orga-User-Form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <div className="group"><input type="text" required="required" onChange={handleFirstnameChange} /><span className="highlight"></span><span className="bar"></span><label>Firstname</label></div>
      <div className="group"><input type="text" required="required" onChange={handleLastnameChange} /><span className="highlight"></span><span className="bar"></span><label>Lastname</label></div>
      <div className="group"><input type="text" required="required" onChange={handleOrganizationChange} /><span className="highlight"></span><span className="bar"></span><label>Organization</label></div>
      <div className="group"><input type="text" required="required" onChange={handleEmailChange} /><span className="highlight"></span><span className="bar"></span><label>Email</label></div>
      <div className="group"><input type="password" required="required" onChange={handlePasswordChange} /><span className="highlight"></span><span className="bar"></span><label>Password</label></div>
      <div className="group"><input type="password" required="required" onChange={handleConfirmPasswordChange} /><span className="highlight"></span><span className="bar"></span><label>Confirm Password</label></div>


      <button type="submit" disabled={!isConfirmBtnActive}>
        Sign Up
      </button>

      <span>
        Bereits registriert?
        <Link to="/login">Hier anmelden </Link>
      </span>
    </form>
  );
}
