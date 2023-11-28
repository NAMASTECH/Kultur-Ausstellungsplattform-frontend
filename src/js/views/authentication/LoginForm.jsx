// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.scss"
// Imports von benoetigten Paketen
import axios from "axios";

// Import eigener Module
import { useAuthStore } from "../../hooks/useAuthStore";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMail, setIsMail] = useState(false);
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hole Setterfunktion fuer global gespeicherte Userdaten aus Custom Hook fuer AuthStoreContext
  const { setUserData } = useAuthStore();

  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [username, password]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const reqBody = isMail
      ? { email: username, password }
      : { username: username, password };

    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        reqBody,
        {
          withCredentials: true,
        }
      );

      // Speichere erhaltene Userdaten im globalen UserStore (Context)
      setUserData({
        id: resp.data.id,
        username: resp.data.username,
        role: resp.data.role,
        organizerId: resp.data.organizerId,
      });

      if (resp.data.role == "organizer") {
        navigate("/mydata");
      } else {
        navigate("/");
      }
      // Wenn im location State eine Ursprungsroute hinterlegt wurde, navigiere zurueck dahin
      if (location.state?.from) navigate(location.state.from);
    } catch (error) {
      console.error(error);
    }
  };
  const isEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
    if (isEmail(evt.target.value)) {
      setIsMail(true);
    } else {
      setIsMail(false);
    }
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
  const validateForm = () => {
    // Pruefe, ob alle Felder befuellt und Passwortfelder gleich
    const isValid = username.length > 0 && password.length > 0;
    setConfirmBtnActive(isValid);
  };

  return (
    <>
    
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="group">
          <input type="text" required="required" value={username} onChange={handleUsernameChange} autoComplete="off"/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Email</label>
        </div>
        <div className="group">
          <input type="password" required="required"value={password} onChange={handlePasswordChange} autoComplete="off" />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Password</label>
        </div>


      <button type="submit" disabled={!isConfirmBtnActive}>
        Sign In!
      </button>

      <span>Noch kein account?</span>
      {/* // TO DO: redirect zu nur einer Form, wo dann ausgewählt wird, ob als user oder als organizer */}
      {/* <Link to="/register/user">Hier registrieren (als user)</Link> */}
      <Link to="/register/organizer">Hier registrieren (als Organizer)</Link>

      {/* {
            confirmedUsername && <h3>Welcome {confirmedUsername}!</h3>
        } */}
    </form>
    </>
  );
}
