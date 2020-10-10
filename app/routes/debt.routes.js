module.exports = (app) => {
  const debts = require('../controllers/debt.controller')

  const router = require('express').Router()

  // Create a new Debt
  router.post('/', debts.create)

  // Retrieve all Debts
  router.get('/', debts.findAll)

  // Retrieve a single Debt with id
  router.get('/:id', debts.findOne)

  // Update a Debt with id
  router.put('/:id', debts.update)

  // Delete a Debt with id
  router.delete('/:id', debts.delete)

  // Delete all Debts
  router.delete('/', debts.deleteAll)

  app.use('/api/debts', router)
}
