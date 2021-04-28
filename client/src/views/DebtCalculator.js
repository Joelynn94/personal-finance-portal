import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';

const DebtCalculator = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return <div>Debt Calculator</div>;
};

export default DebtCalculator;
