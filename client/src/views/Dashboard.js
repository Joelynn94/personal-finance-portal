import React from 'react';
import AddDebt from '../components/Debts/AddDebt';
import Debts from '../components/Debts/Debts';

const Dashboard = () => {
  return (
    <>
      <AddDebt />
      <Debts />
    </>
  );
};

export default Dashboard;
