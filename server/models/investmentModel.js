import mongoose from "mongoose"

const investmentSchema = mongoose.Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  currentAge: {
    type: Number,
    required: true
  },
  retirementAge: {
    type: Number,
    required: true
  },
  moneySaved: {
    type: Number,
    required: true
  },
  monthlyContribution: {
    type: Number,
    required: true
  },
  annualInterest: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

const Investment = mongoose.model('Investment', investmentSchema)

export default Investment