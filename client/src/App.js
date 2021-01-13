import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import DebtState from './context/debts/DebtState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import Dashboard from './views/Dashboard';
import DebtCalculator from './views/DebtCalculator';
import UpdateDebtPage from './views/UpdateDebtPage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';

import './app.css';
import Alerts from './components/Alerts/Alerts';
import Navigation from './components/Navigation/Navigation';
import { Container } from 'reactstrap';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <DebtState>
        <AlertState>
          <Router>
            <Navigation />
            <Container>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <Route exact path='/debts' component={DebtCalculator} />
                <Route
                  exact
                  path='/debts/:id/update'
                  component={UpdateDebtPage}
                />
                <Route exact path='/signup' component={RegisterPage} />
                <Route exact path='/login' component={LoginPage} />
              </Switch>
            </Container>
          </Router>
        </AlertState>
      </DebtState>
    </AuthState>
  );
};

export default App;
