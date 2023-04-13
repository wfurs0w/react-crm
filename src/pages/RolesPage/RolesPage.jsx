import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../firebase';

export const RolesPage = () => {
  const navigate = useNavigate();

  const addUserRoleToFirestore = (role) => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const docRef = db.collection('users').doc(user.uid); 
    docRef.update({
      role: role
    })
    .then(() => {
      console.log("User role added to Firestore:", role);
      navigate('/account'); 
    })
    .catch((error) => {
      console.error("Error when adding user role in Firestore:", error);
    });
  };  

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <Link to="/account" className="btn btn-info mr-2" onClick={() => addUserRoleToFirestore('passenger')}> 🧳 I am passenger</Link>
      <Link to="/account" className="btn btn-info mr-2" onClick={() => addUserRoleToFirestore('driver')}> 🚘 I am driver</Link>
      <Link to="/account" className="btn btn-info" onClick={() => addUserRoleToFirestore('dispatcher')}> 📞 I am dispatcher</Link>
    </div>
  )
}


