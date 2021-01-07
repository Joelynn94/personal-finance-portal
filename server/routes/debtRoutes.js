const express = require('express');
const router = express.Router();
const {
  getAllDebts,
  createDebt,
  getDebtById,
  updateDeptById,
  deleteDebt,
} = require('../controllers/debtsController');

router.route('/debts').get(getAllDebts);
router.route('/debts').post(createDebt);
router.route('/debts/:id').get(getDebtById);
router.route('/debts/:id').put(updateDeptById);
router.route('/debts/:id').delete(deleteDebt);

module.exports = router;
