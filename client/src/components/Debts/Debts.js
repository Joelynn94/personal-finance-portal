import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DebtsContext from '../../context/debts/debtContext';
import Loader from '../Loader/Loader';

const Debts = () => {
  const { debts, getDebts, loading, deleteDebt } = useContext(DebtsContext);
  const history = useHistory();

  useEffect(() => {
    getDebts();
    console.log(debts);
    console.log(loading);
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Min Payment</th>
            <th>Interest</th>
            <th>Debt Type</th>
            <th>Account Name</th>
          </tr>
        </thead>
        {debts !== null && !loading ? (
          <tbody>
            {debts &&
              debts.map((debt) => (
                <tr key={debt.debt_id}>
                  <td>{`$${debt.balance}`}</td>
                  <td>{`$${debt.min_payment}`}</td>
                  <td>{`${debt.interest_rate}%`}</td>
                  <td>{debt.debt_type}</td>
                  <td>{debt.account_name}</td>
                  <td>
                    <button onClick={() => handleUpdate(debt.debt_id)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(debt.debt_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <Loader />
        )}
      </table>
    </div>
  );
};

export default Debts;
