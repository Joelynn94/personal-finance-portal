import React, { useContext, useEffect } from 'react'
import DebtFinder from "../APIs/DebtFinder"
import { DebtsContext } from '../context/DebtsContext'

const Header = (props) => {
  const { debts, setDebts } = useContext(DebtsContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DebtFinder.get("/")
        console.log(response.data.debts)
        setDebts(response.data.debts)
        // console.log(setDebts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

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
          {debts && debts.map(debt => (
            <tr key={debt.debt_id}>
              <td>{`$${debt.balance}`}</td>
              <td>{`$${debt.min_payment}`}</td>
              <td>{`${debt.interest}%`}</td>
              <td>{debt.account_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Header

