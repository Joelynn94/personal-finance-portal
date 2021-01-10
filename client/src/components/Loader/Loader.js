import React, { Fragment } from 'react';
import loader from './loader.gif';

function Loader() {
  return (
    <Fragment>
      <img
        src={loader}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
}

export default Loader;
