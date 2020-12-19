import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DebtsContextProvider from "./context/DebtsContext"
import Dashboard from "./routes/Dashboard"
import DebtCalculator from "./routes/DebtCalculator"
import UpdateDebt from "./routes/UpdateDebt"

const App = () => {
  return (
    <DebtsContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/debts" component={DebtCalculator} />
          <Route exact path="/debts/:id/update" component={UpdateDebt} />
        </Switch>
      </Router>
    </DebtsContextProvider>
  );
}

export default App;
