// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import der zugehoerigen CSS-Datei
import "./css/App.scss";

// Import eigener Komponenten
import Layout from "./js/components/Layout/Layout";
import RegisterForm from "./js/components/RegisterForm";
import LoginForm from "./js/components/LoginForm";
import UserInfo from "./js/components/UserInfo";
import LogoutScreen from "./js/components/LogoutScreen";
import PrivateRoute from "./js/services/PrivateRoute";
import UsersTable from "./js/components/UsersTable";
import RegisterUserForm from "./js/components/userComponents/RegisterUserForm.jsx";
import RegisterOrgaForm from "./js/components/organizerComponents/RegisterOrgaForm.jsx";
import AddEventForm from "./js/components/event/AddEventForm.jsx";
import EventOverview from "./js/components/event/EventOverview.jsx";
import KontaktFrom from "./js/components/Contact/kontaktFrom.jsx";
import { Footer } from "./js/components/Layout/Footer.jsx";

// Definition einer Komponente
// Am besten gleich als export Statement schreiben, um es nachher nicht zu vergessen.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Definiere Standard Unteransicht fuer die root-Route */}
          <Route index element={<h1>Home</h1>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register/user" element={<RegisterUserForm />} />
          <Route path="/register/organizer" element={<RegisterOrgaForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route path="/event" element={<AddEventForm />} />
          <Route path="/events" element={<EventOverview />} />
          <Route path="/kontakt" element={<KontaktFrom />} />

          <Route element={<PrivateRoute />}>
            <Route path="/users" element={<UsersTable />} />
            <Route path="/users/:userId" element={<UserInfo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
