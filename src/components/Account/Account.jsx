import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import './Account.scss';

export const Account = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    email: '',
  });

  const fetchUserData = async () => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      const doc = await db.collection('users').doc(userId).get();

      if (doc.exists) {
        const userDataFromFirestore = doc.data();
        setUserData(userDataFromFirestore);
      } else {
        setErrorMessage('Document not found');
      }
    } catch (error) {
      setErrorMessage('Error when getting user data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection('users').doc(userId).update(userData);
      setSuccessMessage('User data updated successfully');
    } catch (error) {
      setErrorMessage('Error while updating user data in Firestore:', error);
    }
  };

  return (
    <div className='container'>
      <form className='account-form' onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="lastName">Full Name:</label>
          <input type="text" className="form-control" id="lastName" name="lastName" defaultValue={userData.displayName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="text" className="form-control" id="age" name="age" defaultValue={userData.age} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" defaultValue={userData.phoneNumber} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" id="email" name="email" defaultValue={userData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <p>Role: <span className='text-success'>{userData.role}</span></p>
        </div>
        <div className='d-flex justify-content-center'>
        <button type="submit" className="btn btn-primary w-25">Save</button>
        </div>
      </form>
      <div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </div>
    </div>
  )
}
