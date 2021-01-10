import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Joe Lynn',
    email: "josephlynn@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Sierra Lynn',
    email: "sierralynn@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'David Lynn',
    email: "davidlynn@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Stephen Lynn',
    email: "stephenlynn@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  },
]

export default users