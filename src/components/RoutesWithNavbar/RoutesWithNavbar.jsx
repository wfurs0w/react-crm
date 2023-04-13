import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountPage } from "../../pages/AccountPage";
import { CustomersPage } from "../../pages/CustomersPage/CustomersPage";
import { HistoryPage } from "../../pages/HistoryPage";
import { NewTripPage } from "../../pages/NewTripPage";
import { SearchTripPage } from "../../pages/SearchTripPage";
import { StatisticPage } from "../../pages/StatisticPage";
import { TripsListPage } from "../../pages/TripsListPage";
import { BurgerWithNavbar } from "../BurgerWithNavbar/BurgerWithNavbar";

import './RoutesWithNavbar.scss';

export function RoutesWithNavbar() {
  const [titleText, setTitleText] = useState(localStorage.getItem('titleText') || "Account");

  useEffect(() => {
    localStorage.setItem('titleText', titleText);
  }, [titleText]);

  const updateTitleText = (text) => {
    setTitleText(text);
  };

  return (
    <>
      <BurgerWithNavbar updateTitleText={updateTitleText} />
      <div className="pages-container">
        <div className="pages-container__title">
          {titleText}
        </div>
        <div>
          <Routes>
            <Route
              path="/account"
              element={<AccountPage />}
            />
            <Route
              path="/new-trip"
              element={<NewTripPage />}
            />
            <Route
              path="/customers"
              element={<CustomersPage />}
            />
            <Route
              path="/trips-list"
              element={<TripsListPage />}
            />
            <Route
              path="/history"
              element={<HistoryPage />}
            />
            <Route
              path="/search"
              element={<SearchTripPage />}
            />
            <Route
              path="/statistics"
              element={<StatisticPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
