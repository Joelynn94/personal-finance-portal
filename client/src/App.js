import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DebtsContextProvider from "./context/DebtsContext"
import Dashboard from "./routes/Dashboard"
import DebtCalculator from "./routes/DebtCalculator"

const App = () => {
  return (
    <DebtsContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/debts" component={DebtCalculator} />
        </Switch>
      </Router>
    </DebtsContextProvider>
  );
}

export default App;
