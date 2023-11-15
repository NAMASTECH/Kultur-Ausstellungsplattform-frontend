import { Outlet } from "react-router-dom";
// import { AuthStoreProvider, useAuthStore } from "../hooks/useAuthStore";
import { AuthStoreProvider } from "../../hooks/useAuthStore";

import { Footer } from "./Footer.jsx";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <AuthStoreProvider>
      <div className="app">
        <Header />
        <p>------------------------</p>
        <main>
          <p>Hello main</p>
          {/* Unteransichten bzw. Kindrouten */}
          <Outlet />
        </main>
        <p>------------------------</p>
        <Footer />
      </div>
    </AuthStoreProvider>
  );
}