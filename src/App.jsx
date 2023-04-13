import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutesWithNavbar } from "./components/RoutesWithNavbar";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { RolesPage } from "./pages/RolesPage/RolesPage";

import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={<AuthPage />}
        />
        <Route
          path="/roles"
          element={<RolesPage />}
        />
        <Route
          path="/*"
          element={<RoutesWithNavbar />}
        />
      </Routes>
    </div>
  );
}

export default App;


