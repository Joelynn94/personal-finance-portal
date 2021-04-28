import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
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
    console.log(value);
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
    <Form inline>
      <FormGroup>
        <Label htmlFor='balance'>Balance Owed</Label>
        <Input
          type='text'
          pattern='[0-9]*'
          id='js-balance'
          name='balance'
          value={balance}
          onChange={(e) => onDebtNumberChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='min_payment'>Minimum Payment</Label>
        <Input
          id='js-min_payment'
          type='text'
          pattern='[0-9]*'
          name='min_payment'
          value={min_payment}
          onChange={(e) => onDebtNumberChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='interest_rate'>Interest Rate</Label>
        <Input
          id='js-interest_rate'
          type='text'
          pattern='[0-9]*'
          name='interest_rate'
          value={interest_rate}
          onChange={(e) => onDebtNumberChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='account_name'>Account Name</Label>
        <Input
          id='js-account_name'
          type='text'
          name='account_name'
          value={account_name}
          onChange={(e) => onDebtStringChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='debt_type'>Debt Type</Label>
        <Input
          type='select'
          id='js-debt_type'
          value={debt_type}
          name='debt_type'
          onChange={(e) => onDebtStringChange(e)}
        >
          <option defaultValue>Select a type</option>
          <option value='Student Loan'>Student Loan</option>
          <option value='Credit Card'>Credit Card</option>
        </Input>
      </FormGroup>
      <Button
        className='mt-3'
        color='primary'
        onClick={handleSubmit}
        type='submit'
      >
        Add
      </Button>
    </Form>
  );
};

export default AddDebt;
