import express from 'express'
import Debt from '../models/debtModel.js'
const router = express.Router()

router.get('/', async(req, res) => {
  const debts = await Debt.find({})

  res.json(debts)
})

export default router