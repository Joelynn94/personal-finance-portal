import mongoose from "mongoose"

const debtSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  accountName: {
    type: String,
    required: false
  },
  debtType: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  minPayment: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

const Debt = mongoose.model('Debt', debtSchema)

export default Debt