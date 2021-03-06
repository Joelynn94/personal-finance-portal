import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DebtsContextProvider from './context/DebtsContext';
import Dashboard from './routes/Dashboard';
import DebtCalculator from './routes/DebtCalculator';
import UpdateDebtPage from './routes/UpdateDebtPage';

const App = () => {
  return (
    <DebtsContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/debts' component={DebtCalculator} />
          <Route exact path='/debts/:id/update' component={UpdateDebtPage} />
        </Switch>
      </Router>
    </DebtsContextProvider>
  );
};

export default App;
