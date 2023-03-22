import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <Spinner
      className='spinner'
      style={{ width: '3rem', height: '3rem' }}
      // type='grow'
      color='primary'
    />
  );
};

export default Loader;
