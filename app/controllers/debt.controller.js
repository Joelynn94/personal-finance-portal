const db = require('../models')
const Debt = db.debts
const Op = db.Sequelize.Op

// Create and Save a new debt
exports.create = (req, res) => {
  // validate the request
  if (!req.body.debtType) {
    res.status(400).send({
      message: 'Content can not be empty, please use a valid debtType',
    })
    return
  }

  // Create the debt
  const debt = {
    debtType: req.body.debtType,
    balance: req.body.balance,
    minPayment: req.body.minPayment,
    interest: req.body.interest,
    estPayoff: req.body.estPayoff,
  }

  // Save the debt
  Debt.create(debt)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          'Some error occured while creating the debt, please try again',
      })
    })
}

// Retrieve all debts from the database.
exports.findAll = (req, res) => {
  // use req.query.debtType to get query string from the Request and consider it as the condition for findAll() method.
  const debtType = req.query.debtType
  let condition = debtType ? { debtType: { [Op.like]: `%${debtType}%` } } : null

  Debt.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          'Some error occured while retrieving all debts, please try again',
      })
    })
}

// Find a single debt with an id
exports.findOne = (req, res) => {
  Debt.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          'Some error occured while trying to retrieve this debt, please try again',
      })
    })
}

// Update a debt by the id in the request
exports.update = (req, res) => {
  Debt.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: 'Debt was updated successfully!',
        })
      } else {
        res.send({
          message: `Cannot update Debt with the id=${req.params.id}.This might not be a valid debt`,
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `There was an error updating the Debt with the id=${req.params.id}`,
      })
    })
}

// Delete a debt with the specified id in the request
exports.delete = (req, res) => {
  Debt.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: 'Debt was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Debt with the id=${req.params.id}.This might not be a valid debt. `,
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `There was an error deleting the Debt with the id=${req.params.id}`,
      })
    })
}

// Delete all debts from the database.
exports.deleteAll = (req, res) => {
  Debt.destroy({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send({
        message: `${data} Debts were deleted successfully!`,
      })
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          'Some error occured while trying to delete all debts, please try again',
      })
    })
}
