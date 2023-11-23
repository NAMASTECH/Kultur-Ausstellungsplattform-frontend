import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore.jsx";
import "../../../styles/header.scss";


function Header() {
  const { userData, isOnline } = useAuthStore();

  return (
    <header>
      <div className="logo">
        <div className="first__line">
          <h1>KUNST</h1>
          <span>KSH</span>
        </div>
        <div className="second__line">
          <h1>IM BLICK</h1>
        </div>
      </div>
      <nav className="nav-container">
        { <NavLink to="/">Events</NavLink>}
        {isOnline() && userData.role == "organizer" && <NavLink to="/event">Add Event</NavLink>}
        {isOnline() && <NavLink to={`/users/`}>My Data</NavLink>}
        {isOnline() && <NavLink to="/users">Users</NavLink>}
        {!isOnline() && <NavLink to="/login">Log In</NavLink>}
        {isOnline() && <NavLink to="/logout">Sign Out</NavLink>}
        {!isOnline() && <NavLink to="/kontakt">Kontakt</NavLink>}
        {isOnline() && <h3>Hallo, {userData.username}!</h3>}
      </nav>

    </header>
  );
}

export default Header;
