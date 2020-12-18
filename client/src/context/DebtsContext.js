import React, { useState, createContext } from 'react'

export const DebtsContext = createContext()

const DebtsContextProvider = (props) => {
  const [debts, setDebts] = useState([])

  const addDebts = (debt) => {
    setDebts([...debts, debt])
  }

  return (
    <DebtsContext.Provider value={{ debts, setDebts, addDebts }}>
      {props.children}
    </DebtsContext.Provider>
  )
}

export default DebtsContextProvider
