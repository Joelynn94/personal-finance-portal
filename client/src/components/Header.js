import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DebtFinder from '../APIs/DebtFinder';
import { DebtsContext } from '../context/DebtsContext';

const Header = (props) => {
  const { debts, setDebts } = useContext(DebtsContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DebtFinder.get('/');
        console.log(response.data.debts);
        setDebts(response.data.debts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [setDebts]);

  const handleDelete = async (id) => {
    try {
      const response = await DebtFinder.delete(`/${id}`);
      console.log(response);
      setDebts(
        debts.filter((debt) => {
          return debt.debt_id !== id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
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
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {debts &&
            debts.map((debt) => (
              <tr key={debt.debt_id}>
                <td>{`$${debt.balance}`}</td>
                <td>{`$${debt.min_payment}`}</td>
                <td>{`${debt.interest}%`}</td>
                <td>{debt.account_type}</td>
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
      </table>
    </div>
  );
};

export default Header;
