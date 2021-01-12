import React, { useContext, useEffect } from 'react';
import AddDebt from '../components/Debts/AddDebt';
import Debts from '../components/Debts/Debts';
import AuthContext from '../context/auth/authContext';

const Dashboard = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <AddDebt />
      <Debts />
    </>
  );
};

export default Dashboard;
