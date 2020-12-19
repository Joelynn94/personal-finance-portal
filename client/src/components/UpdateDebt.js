import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DebtFinder from '../APIs/DebtFinder'
import { DebtsContext } from "../context/DebtsContext"

const UpdateDebt = () => {
  const { id } = useParams()
  const {debts} = useContext(DebtsContext)
  const [balance, setBalance] = useState("")
  const [minPayment, setMinPayment] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [accountType, setAccountType] = useState("")

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await DebtFinder.get(`/${id}`)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>{debts.balance}</h1>
      <form action="">
        <label htmlFor="balance">Balance Owed</label>
        <input 
          id="balance" 
          type="number" 
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <label htmlFor="min-payment">Minimum Payment</label>
        <input 
          id="min-payment" 
          type="number" 
          value={minPayment}
          onChange={(e) => setMinPayment(e.target.value)}
        />
        <label htmlFor="interest-rate">Interest Rate</label>
        <input 
          id="interest-rate" 
          type="number" 
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <label htmlFor="account-type">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="1">Student Loan</option>
          <option value="4">Credit Card</option>
        </select>
        <button 

          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default UpdateDebt
