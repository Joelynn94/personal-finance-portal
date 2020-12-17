import React, { useEffect } from 'react'
import DebtFinder from "../APIs/DebtFinder"

const Header = () => {
  useEffect(() => {
    async function fetchData() {
      const response = await DebtFinder.get("/")
      console.log(response.data)
      return response.data
    }
    try {
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Header

