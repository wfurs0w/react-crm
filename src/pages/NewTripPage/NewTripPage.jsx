import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { CreateTripForm } from '../../components/CreateTripForm';

export const NewTripPage = () => {
  return (
    <div className='container'>
      <CreateTripForm />
    </div>
  )
};

export default NewTripPage;
