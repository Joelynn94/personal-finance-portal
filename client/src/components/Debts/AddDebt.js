import React, { useState, useContext, useEffect } from 'react';
// import NumberFormat from 'react-number-format';
import debtsContext from '../../context/debts/debtContext';

const AddDebt = () => {
  const { addDebt } = useContext(debtsContext);
  const [debt, setDebt] = useState({
    balance: '',
    interest_rate: '',
    min_payment: '',
    debt_type: '',
    account_name: '',
  });

  const { balance, interest_rate, min_payment, debt_type, account_name } = debt;

  useEffect(() => {});

  const onDebtNumberChange = (e) => {
    const { name, value } = e.target;

    console.log(name);
    if (
      name === 'balance' &&
      name === 'interest_rate' &&
      name === 'min_payment'
    ) {
    }

    setDebt({ ...debt, [name]: parseInt(value, 10) });
    console.log(debt);
  };

  const onDebtStringChange = (e) => {
    const { name, value } = e.target;
    setDebt({ ...debt, [name]: value });

    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDebt(debt);
    console.log(debt);
    setDebt({
      balance: '',
      interest_rate: '',
      min_payment: '',
      debt_type: '',
      account_name: '',
    });
  };

  return (
    <div>
      <form action=''>
        <label htmlFor='balance'>Balance Owed</label>
        <input
          type='text'
          pattern='[0-9]*'
          id='js-balance'
          name='balance'
          value={balance}
          onChange={(e) => onDebtNumberChange(e)}
        />
        <label htmlFor='min_payment'>Minimum Payment</label>
        <input
          id='js-min_payment'
          type='text'
          pattern='[0-9]*'
          name='min_payment'
          value={min_payment}
          onChange={(e) => onDebtNumberChange(e)}
        />
        <label htmlFor='interest_rate'>Interest Rate</label>
        <input
          id='js-interest_rate'
          type='text'
          pattern='[0-9]*'
          name='interest_rate'
          value={interest_rate}
          onChange={(e) => onDebtNumberChange(e)}
        />
        <label htmlFor='account_name'>Account Name</label>
        <input
          id='js-account_name'
          type='text'
          name='account_name'
          value={account_name}
          onChange={(e) => onDebtStringChange(e)}
        />
        <label htmlFor='debt_type'>Debt Type</label>
        <select
          id='js-debt_type'
          value={debt_type}
          name='debt_type'
          onChange={(e) => onDebtStringChange(e)}
        >
          <option value='Student Loan'>Student Loan</option>
          <option value='Credit Card'>Credit Card</option>
        </select>
        <button onClick={handleSubmit} type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDebt;
