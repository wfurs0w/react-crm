import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    uid: '',
    displayName: '',
    email: '',
    age: '',
    role: '',
    phoneNumber: ''
  });

  const fetchUsers = async () => {
    try {
      const usersRef = firebase.firestore().collection('users');
      const snapshot = await usersRef.get();
      const usersData = snapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    } catch (error) {
      setErrorMessage('Error when getting user data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = user => {
    setEditMode(true);
    setEditedUserData(user);
  };

  const handleDeleteClick = async uid => {
    try {
      const usersRef = firebase.firestore().collection('users');
      await usersRef.doc(uid).delete();
      fetchUsers();
    } catch (error) {
      setErrorMessage('Error when deleting a user from Firestore:', error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const usersRef = firebase.firestore().collection('users');
      await usersRef.doc(editedUserData.uid).update(editedUserData);
      setEditMode(false);
      setEditedUserData({
        uid: '',
        displayName: '',
        email: '',
        age: '',
        role: '',
        phoneNumber: ''
      });
      fetchUsers();
    } catch (error) {
      setErrorMessage('Error when saving data to Firestore:', error);
    }
  };

  return (
    <div className="container">
      {errorMessage && <div>{errorMessage}</div>}
      <div className="table-responsive">
        <table className="table table-striped my-4">
          <thead className="thead-dark">
            <tr className='text-center'>
              <th>FullName</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr className='text-center' key={user.uid}>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                    <input
                      type="text"
                      name="displayName"
                      value={editedUserData.displayName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.displayName
                  )}
                </td>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                    <input
                      type="text"
                      name="email"
                      value={editedUserData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                  <input
                    type="text"
                    name="age"
                    value={editedUserData.age}
                    onChange={handleInputChange}
                 />
                  ) : (
                  user.age
                  )}
                </td>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                  <input
                    type="text"
                    name="role"
                    value={editedUserData.role}
                    onChange={handleInputChange}
                  />
                  ) : (
                  user.role
                  )}
                </td>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedUserData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  ) : (
                  user.phoneNumber
                  )}
                </td>
                <td>
                  {editMode && editedUserData.uid === user.uid ? (
                  <div className='d-flex'>
                    <button
                      className="btn btn-success mr-2"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  ) : (
                  <div className='d-flex'>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(user.uid)}
                    >
                      Delete
                    </button>
                  </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;

