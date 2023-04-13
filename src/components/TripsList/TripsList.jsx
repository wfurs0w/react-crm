import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';

const TripsList = () => {
  const [trips, setTrips] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsRef = firebase.firestore().collection('trips');
        const unsubscribe = tripsRef.onSnapshot(snapshot => {
          const tripsData = snapshot.docs.map(doc => {
            const data = doc.data();
            const departureDate = data.departureDate.toDate().toLocaleDateString();
            const arrivalDate = data.arrivalDate.toDate().toLocaleDateString();
            return {
              ...data,
              departureDate,
              arrivalDate
            };
          });
          setTrips(tripsData);
        });

        return () => unsubscribe();
      } catch (error) {
        setErrorMessage('Error while getting trip data from Firestore:', error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className='container'>
      {errorMessage && <div>{errorMessage}</div>}
      <div className="table-responsive"> {/* Оберните таблицу в div с классом table-responsive */}
        <table className="table table-striped my-4">
          <thead className="thead-dark">
            <tr>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Departure Date</th>
              <th>Arrival Date</th> 
              <th>Departure Time</th> 
              <th>Arrival Time</th> 
              <th>Seats Available</th> 
              <th>Ticket Price</th> 
              <th>Transport</th> 
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.tripId}>
                <td>{trip.departureCity}</td>
                <td>{trip.arrivalCity}</td>
                <td>{trip.departureDate}</td>
                <td>{trip.arrivalDate}</td>
                <td>{trip.departureTime}</td>
                <td>{trip.arrivalTime}</td>
                <td>{trip.seatsAvailable}</td>
                <td>{trip.ticketPrice}</td>
                <td>{trip.transportationMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsList;
