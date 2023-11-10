import { NavLink, Outlet } from "react-router-dom";
import { AuthStoreProvider, useAuthStore } from "../hooks/useAuthStore";

export default function Layout() {
  return (
    <AuthStoreProvider>
      <div className="app">
        <Header />
        <main>
          {/* Unteransichten bzw. Kindrouten */}
          <Outlet />
        </main>
      </div>
    </AuthStoreProvider>
  );
}

function Header() {
  const { userData, isOnline } = useAuthStore();

  return (
    <header>
      <nav className="nav-container">
        <NavLink to="/">Home</NavLink>
        {!isOnline() && <NavLink to="/register">Sign Up</NavLink>}
        {!isOnline() && <NavLink to="/register/user">Sign Up user</NavLink>}
        {!isOnline() && <NavLink to="/register/organizer">Sign Up organization</NavLink> }
        {isOnline() && <NavLink to="/api/event">Add Event</NavLink>}
        {!isOnline() && <NavLink to="/api/events">Event Table</NavLink>}
        {isOnline() && <NavLink to={`/users/${userData.id}`}>My Data</NavLink>}
        {isOnline() && <NavLink to="/users">Users</NavLink> }
        {!isOnline() && <NavLink to="/login">Log In</NavLink>}
        {isOnline() && <NavLink to="/logout">Sign Out</NavLink>}
        {isOnline() && <h3>Hallo, {userData.username}!</h3>}
      </nav>
     
    </header>
  );
}
