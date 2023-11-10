// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import der zugehoerigen CSS-Datei
import "../../css/App.scss";

// Import eigener Komponenten
import Layout from "./Layout";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import UserInfo from "./UserInfo";
import LogoutScreen from "./LogoutScreen";
import PrivateRoute from "../services/PrivateRoute";
import UsersTable from "./UsersTable";
import RegisterUserForm from "./userComponents/RegisterUserForm.jsx";
import RegisterOrgaForm from "./organizerComponents/RegisterOrgaForm.jsx";
import AddEventForm from "./event/AddEventForm.jsx";
import EventOverview from "./event/EventOverview.jsx";

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
          <Route path="/api/event" element={<AddEventForm />} />
          <Route path="/api/events" element={<EventOverview />} />
          <Route element={<PrivateRoute />}>
            <Route path="/users" element={<UsersTable />} />

            <Route path="/users/:userId" element={<UserInfo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
