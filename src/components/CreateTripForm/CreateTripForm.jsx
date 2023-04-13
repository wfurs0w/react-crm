import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import firebase from '../../firebase';
import './CreateTripForm.scss';

export const CreateTripForm = () => {
  const [user, setUser] = useState('');
  const [cities, setCities] = useState([]);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tripData, setTripData] = useState({
    departureCity: '',
    arrivalCity: '',
    departureDate: null,
    arrivalDate: null,
    departureTime: '',
    arrivalTime: '',
    seatsAvailable: '',
    ticketPrice: '',
    transportationMode: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setTripData({ ...tripData, [name]: date });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user) {
        setErrorMessage('User not authorized');
        return;
      }
  
      const userId = user.uid;
      const userDoc = await firebase.firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();
  
      if (userData.role === 'driver' || userData.role === 'dispatcher' || userData.role === 'admin') {
        const tripDataWithCreatedBy = { ...tripData, userId: userId };
        const tripRef = await firebase.firestore().collection('trips').doc();
        const tripId = tripRef.id;
        await tripRef.set({ ...tripDataWithCreatedBy, tripId });
        setSuccessMessage('Trip successfully created'); 
        setTripData({
          departureCity: '',
          arrivalCity: '',
          departureDate: null,
          arrivalDate: null,
          departureTime: '',
          arrivalTime: '',
          seatsAvailable: '',
          ticketPrice: '',
          transportationMode: ''
        });
      } else {
        setErrorMessage('You do not have rights to create a trip');
      }
    } catch (error) {
      setErrorMessage('Error creating trip: ' + error.message);
    }
  };

  useEffect(() => {
    const getCurrentUser = () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const docId = 'nKcENRXPtq73bIg6PK2t';
        const citiesRef = await firebase.firestore().collection('ukraineCities').doc(docId);
        const citiesData = await citiesRef.get();
        if (citiesData.exists) {
          setCities(citiesData.data().cities);
        } else {
          setErrorMessage('Cities document not found');
        }
      } catch (error) {
        setErrorMessage('Error when getting cities from Firestore:', error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchTransportationOptions = async () => {
      try {
        const transportOptionsRef = await firebase.firestore().collection('transport').doc('list').get();
        const transportOptionsData = transportOptionsRef.data();
        if (transportOptionsData) {
          setTransportationOptions(transportOptionsData.options);
        } else {
          setErrorMessage('Transport list not found');
        }
      } catch (error) {
        setErrorMessage('Error while getting transport list from Firestore:', error);
      }
    };
    fetchTransportationOptions();
  }, []);

  return (
    <div className='new-trip'>
      <h3 className='new-trip__title text-light bg-dark w-100'>Create New Trip</h3>
      <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label className='mr-2'>
            Departure City:
            <select
              name="departureCity"
              value={tripData.departureCity}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Select departure city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label>
            Arrival City:
            <select
              name="arrivalCity"
              value={tripData.arrivalCity}
              onChange={handleInputChange}
              className="form-control"
              required
              title="Please choose city"
            >
              <option value="">Select your arrival city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className='mr-2'>
            Departure Date:
            <br />
            <DatePicker
              name="departureDate"
              selected={tripData.departureDate}
              onChange={(date) => handleDateChange('departureDate', date)}
              dateFormat="dd.MM.yyyy"
              className="form-control"
              required
            />
          </label>
          <label>
            Arrival Date:
            <br />
            <DatePicker
              name="arrivalDate"
              selected={tripData.arrivalDate}
              onChange={(date) => handleDateChange('arrivalDate', date)}
              dateFormat="dd.MM.yyyy"
              className="form-control"
              required
            />
          </label>
        </div>
        <div>
          <label className='mr-2'>
            Departure Time:
            <input
              type="time"
              name="departureTime"
              value={tripData.departureTime}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </label>
          <label>
            Arrival Time:
            <input
              type="time"
              name="arrivalTime"
              value={tripData.arrivalTime}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </label>
        </div>
        <div className='d-flex flex-column'>
          <label>
            Seats Available:
            <input
              type="number"
              name="seatsAvailable"
              placeholder='4'
              value={tripData.seatsAvailable}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </label>
          <label>
            Ticket Price:
            <input
              type="number"
              name="ticketPrice"
              placeholder='(UAH)'
              value={tripData.ticketPrice}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </label>
          <label>
            Transportation Mode:
            <select
              name="transportationMode"
              value={tripData.transportationMode}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Choose a vehicle</option>
              {transportationOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-success">Create Trip</button>
      </form>
      <div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </div>
    </div>
    </div>
  );
}
