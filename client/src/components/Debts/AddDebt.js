import React, { useState, useContext } from 'react';
import API from '../../utils/API';
import DebtsContext from '../../context/debts/debtContext';

const AddDebt = () => {
  const { addDebts } = useContext(DebtsContext);
  const [debt, setDebt] = useState({
    balance: 0,
    interestRate: 0,
    minPayment: 0,
    debtType: '',
    accountName: '',
  });

  const { balance, interestRate, minPayment, debtType, accountName } = debt;

  const onChange = (e) => {
    setDebt({ ...debt, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      DebtsContext.addDebt();
      const response = await API.post('/debts', {
        balance: balance,
        interest_rate: interestRate,
        min_payment: minPayment,
        debt_type: debtType,
        account_type: accountName,
      });
      addDebts(response.data.debt);
      console.log(response);
      setDebt({
        balance: 0,
        interestRate: 0,
        minPayment: 0,
        debtType: '',
        accountName: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action=''>
        <label htmlFor='balance'>Balance Owed</label>
        <input
          id='js-balance'
          type='number'
          name='balance'
          value={balance}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor='minPayment'>Minimum Payment</label>
        <input
          id='js-minPayment'
          type='number'
          name='minPayment'
          value={minPayment}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor='interestRate'>Interest Rate</label>
        <input
          id='js-interestRate'
          type='number'
          name='interestRate'
          value={interestRate}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor='accountName'>Account Name</label>
        <input
          id='js-accountName'
          type='text'
          name='accountName'
          value={accountName}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor='debtType'>Debt Type</label>
        <select
          id='js-debtType'
          value={debtType}
          name='debtType'
          onChange={(e) => onChange(e.target.value)}
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
