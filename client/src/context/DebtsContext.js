import React, { useState, createContext } from 'react'

export const DebtsContext = createContext()

const DebtsContextProvider = (props) => {
  const [debts, setDebts] = useState([])

  return (
    <DebtsContext.Provider value={{ debts, setDebts }}>
      {props.children}
    </DebtsContext.Provider>
  )
}

export default DebtsContextProvider
