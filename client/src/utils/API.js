import axios from 'axios';

const API = {
  getDebts: function () {
    return axios.get('http://localhost:3001/api/v1/debts');
  },
  addDebt: function () {
    return axios.post('http://localhost:3001/api/v1/debts');
  },
  getSingleDebt: function (id) {
    return axios.get(`http://localhost:3001/api/v1/debts/${id}`);
  },
  updateDebt: function (id) {
    return axios.put(`http://localhost:3001/api/v1/debts/${id}`);
  },
  deleteDebt: function (id) {
    return axios.delete(`http://localhost:3001/api/v1/debts/${id}`);
  },
  signupUser: function () {
    return axios.post('http://localhost:3001/api/v1/signup');
  },
  loginUser: function () {
    return axios.post('http://localhost:3001/api/v1/login');
  },
  getIfAuthUser: function () {
    return axios.get('http://localhost:3001/api/v1/auth');
  },
};

export default API;
