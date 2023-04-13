import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { 
  BiLogOut, 
  BiSearchAlt,
  BiTable } from "react-icons/bi";
import { 
  BsPeopleFill, 
  BsBarChartFill, 
  BsClockFill, 
  BsPlusCircleFill, 
  BsPersonFill } 
from 'react-icons/bs';

import './Navbar.scss';

export const Navbar = ({ updateTitleText }) => {
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleTextClick = (text) => {
    updateTitleText(text);
  };

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          }
        }
      } catch (error) {
        setErrorMessage('Error getting user role');
      }
    }

    getUserRole();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.clear();
        window.location.href = "/";
      })
      .catch((error) => {
        setErrorMessage('Error when logging out');
      });
  };

  return (
    <div className="menu">
      {errorMessage && <div>{errorMessage}</div>}
      <nav className="nav">
        {userRole === 'passenger' && (
          <>
            <Link 
              to="/account" 
              className="nav-link d-flex"
              onClick={() => handleTextClick("Account")}
            >
              <BsPersonFill className="nav-icon" />
              <div className="tooltip">Account</div>
            </Link>
            <Link 
              to="/search" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Search Trip")}
            >
              <BiSearchAlt className="nav-icon" />
              <div className="tooltip">Search Trip</div>
            </Link>
            <Link 
              to="/history" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("History")}
            >
              <BsClockFill className="nav-icon" />
              <div className="tooltip">History</div>
            </Link>
            <div className="nav-link d-flex" title="Logout" onClick={handleLogout}>
              <BiLogOut className="nav-icon" />
              <div className="tooltip">Logout</div>
            </div>
          </>
        )}
        {userRole === 'driver' && (
          <>
            <Link 
              to="/account" 
              className="nav-link d-flex"
              onClick={() => handleTextClick("Account")}
            >
              <BsPersonFill className="nav-icon" />
              <div className="tooltip">Account</div>
            </Link>
            <Link 
              to="/new-trip" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("New Trip")}
            >
              <BsPlusCircleFill className="nav-icon" />
              <div className="tooltip">New Trip</div>
            </Link>
            <Link 
              to="/history" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("History")}
            >
              <BsClockFill className="nav-icon" />
              <div className="tooltip">History</div>
            </Link>
            <Link 
              to="/trips-list" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Trips List")}
            >
              <BiTable className="nav-icon" />
              <div className="tooltip">Trips List</div>
            </Link>
            <div className="nav-link d-flex" onClick={handleLogout}>
              <BiLogOut className="nav-icon" />
              <div className="tooltip">Logout</div>
            </div>
          </>
        )}
        {userRole === 'dispatcher' && (
          <> 
            <Link 
              to="/account" 
              className="nav-link d-flex"
              onClick={() => handleTextClick("Account")}
            >
              <BsPersonFill className="nav-icon" />
              <div className="tooltip">Account</div>
            </Link>
            <Link 
              to="/trips-list" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Trips List")}
            >
              <BiTable className="nav-icon" />
              <div className="tooltip">Trips List</div>
            </Link>
            <Link 
              to="/new-trip" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("New Trip")}
            >
              <BsPlusCircleFill className="nav-icon" />
              <div className="tooltip">New Trip</div>
            </Link>
            <Link 
              to="/search" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Search Trip")}
            >
              <BiSearchAlt className="nav-icon" />
              <div className="tooltip">Search Trip</div>
            </Link>
            <div className="nav-link d-flex" onClick={handleLogout}>
              <BiLogOut className="nav-icon" />
              <div className="tooltip">Logout</div>
            </div>
          </>
        )}
        {userRole === 'admin' && (
          <>
            <Link
              to="/account" 
              className="nav-link d-flex"
              onClick={() => handleTextClick("Account")}
            >
              <BsPersonFill className="nav-icon" />
              <div className="tooltip">Account</div>
            </Link>
            <Link 
              to="/customers" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Customers")}
            >
              <BsPeopleFill className="nav-icon" />
              <div className="tooltip">Customers</div>
            </Link>
            <Link 
              to="/trips-list" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Trips List")}
            >
              <BiTable className="nav-icon" />
              <div className="tooltip">Trips List</div>
            </Link>
            <Link 
              to="/new-trip" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("New Trip")}
            >
              <BsPlusCircleFill className="nav-icon" />
              <div className="tooltip">New Trip</div>
            </Link>
            <Link 
              to="/search" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Search Trip")}
            >
              <BiSearchAlt className="nav-icon" />
              <div className="tooltip">Search Trip</div>
            </Link>
            <Link 
              to="/history" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("History")}
            >
              <BsClockFill className="nav-icon" />
              <div className="tooltip">History</div>
            </Link>
            <Link 
              to="/statistics" 
              className="nav-link d-flex" 
              onClick={() => handleTextClick("Statistics")}
            >
              <BsBarChartFill className="nav-icon" />
              <div className="tooltip">Statistics</div>
            </Link>
            <div className="nav-link d-flex" onClick={handleLogout}>
              <BiLogOut className="nav-icon" />
              <div className="tooltip">Logout</div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
