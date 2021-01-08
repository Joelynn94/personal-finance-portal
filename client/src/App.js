import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DebtsContextProvider from './context/DebtsContext';
import Dashboard from './views/Dashboard';
import DebtCalculator from './views/DebtCalculator';
import UpdateDebtPage from './views/UpdateDebtPage';
import Signup from './views/SignupPage';

import './app.css';
import Navigation from './components/Navigation/Navigation';
import { Container } from 'reactstrap';

const App = () => {
  return (
    <DebtsContextProvider>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/debts' component={DebtCalculator} />
            <Route exact path='/debts/:id/update' component={UpdateDebtPage} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Container>
      </Router>
    </DebtsContextProvider>
  );
};

export default App;
