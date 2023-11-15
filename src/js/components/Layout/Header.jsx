import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore.jsx";

function Header() {
  const { userData, isOnline } = useAuthStore();

  return (
    <header>
      <nav className="nav-container">
        <NavLink to="/">Home</NavLink>
        {/* {!isOnline() && <NavLink to="/register">Sign Up</NavLink>} */}
        {!isOnline() && <NavLink to="/register/user">Sign Up user</NavLink>}
        {!isOnline() && (
          <NavLink to="/register/organizer">Sign Up organization</NavLink>
        )}
        {<NavLink to="/event">Add Event</NavLink>}
        {<NavLink to="/events">Events</NavLink>}
        {isOnline() && <NavLink to={`/users/${userData.id}`}>My Data</NavLink>}
        {isOnline() && <NavLink to="/users">Users</NavLink>}
        {!isOnline() && <NavLink to="/login">Log In</NavLink>}
        {isOnline() && <NavLink to="/logout">Sign Out</NavLink>}
        {<NavLink to="/kontakt">Kontakt</NavLink>}
        {<NavLink to="/SeitigeSuchen">SeitigeSuchen</NavLink>}
      </nav>
      <br />
      {isOnline() && <h3>Hallo, {userData.username}!</h3>}
    </header>
  );
}

export default Header;
