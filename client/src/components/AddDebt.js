import React, { useState, useContext } from 'react';
import DebtFinder from '../utils/API';
import { DebtsContext } from '../context/DebtsContext';

const AddDebt = () => {
  const { addDebts } = useContext(DebtsContext);
  const [balance, setBalance] = useState('');
  const [minPayment, setMinPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await DebtFinder.post('/debts', {
        balance: balance,
        min_payment: minPayment,
        interest: interestRate,
        account_type: accountType,
      });
      addDebts(response.data.debt);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action=''>
        <label htmlFor='balance'>Balance Owed</label>
        <input
          id='balance'
          type='number'
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <label htmlFor='min-payment'>Minimum Payment</label>
        <input
          id='min-payment'
          type='number'
          value={minPayment}
          onChange={(e) => setMinPayment(e.target.value)}
        />
        <label htmlFor='interest-rate'>Interest Rate</label>
        <input
          id='interest-rate'
          type='number'
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <label htmlFor='account-type'>Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value='1'>Student Loan</option>
          <option value='4'>Credit Card</option>
        </select>
        <button onClick={handleSubmit} type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDebt;
