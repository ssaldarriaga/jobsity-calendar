import moment from 'moment';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

// Components
import { GlobalStyles } from './globalStyles';
import { MonthScreen } from './pages/MonthScreen';

const date = moment();

export const App = () => (
  <>
    <GlobalStyles />
    <Router basename="">
      <Switch>
        <Route exact path="/month/:year/:month/:day" component={MonthScreen} />
        <Redirect to={`/month/${date.year()}/${date.month() + 1}/${date.date()}`} />
      </Switch>
    </Router>
  </>
);
