import { NavLink, Outlet } from "react-router-dom";
// import { AuthStoreProvider, useAuthStore } from "../hooks/useAuthStore";
import { AuthStoreProvider } from "../hooks/useAuthStore";

import Header from "./Layout/Header.jsx";

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
