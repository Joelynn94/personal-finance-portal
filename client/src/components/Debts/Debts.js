import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

import debtsContext from '../../context/debts/debtContext';
import Loader from '../Loader/Loader';

const Debts = () => {
  const { debts, getDebts, loading, deleteDebt } = useContext(debtsContext);
  const history = useHistory();

  useEffect(() => {
    getDebts();
    console.log(loading);
    console.log(debts);
    // eslint-disable-next-line
  }, []);

  // if there are no debts, display a message to add debts
  if (debts !== null && debts.length === 0 && !loading) {
    return <h4>Please add a debt</h4>;
  }

  const handleDelete = async (id) => {
    deleteDebt(id);
  };

  const handleUpdate = (id) => {
    history.push(`/debts/${id}/update`);
  };

  return (
    <Table className='mt-5'>
      <thead>
        <tr>
          <th>#</th>
          <th>Balance</th>
          <th>Min Payment</th>
          <th>Interest</th>
          <th>Debt Type</th>
          <th>Account Name</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      {debts !== null && !loading ? (
        <tbody>
          {debts &&
            debts.map((debt) => (
              <tr key={debt.debt_id}>
                <td>{debt.debt_id}</td>
                <td>{`$${debt.balance}`}</td>
                <td>{`$${debt.min_payment}`}</td>
                <td>{`${debt.interest_rate}%`}</td>
                <td>{debt.debt_type}</td>
                <td>{debt.account_name}</td>
                <td>
                  <Button
                    color='warning'
                    onClick={() => handleUpdate(debt.debt_id)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    color='danger'
                    onClick={() => handleDelete(debt.debt_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      ) : (
        <Loader />
      )}
    </Table>
  );
};

export default Debts;
