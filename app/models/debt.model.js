module.exports = (sequelize, Sequelize) => {
  const Debt = sequelize.define('debt', {
    debtType: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Other',
    },
    balance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    minPayment: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    interest: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
    },
    estPayoff: {
      type: Sequelize.DATE,
    },
  })

  return Debt
}
