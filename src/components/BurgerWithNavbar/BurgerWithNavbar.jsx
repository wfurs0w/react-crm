import React, { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";

import "./BurgerWithNavbar.scss";

export const BurgerWithNavbar = ({ children, updateTitleText }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <>
      <div>
        <div className="burger-btn" onClick={handleNavbarToggle}>
          <GiHamburgerMenu />
        </div>
        {isNavbarVisible && <Navbar updateTitleText={updateTitleText} />}
      </div>
      {children}
    </>
  );
};
