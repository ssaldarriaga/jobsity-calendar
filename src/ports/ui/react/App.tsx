import moment from 'moment';
import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

// Components
import { MonthScreen } from './pages/MonthScreen';

// Utils
import { THEME } from '../../../domain/styles/theme';

export const App = () => {
  const date = useMemo(moment, []);

  return (
    <ThemeProvider theme={THEME.dark}>
      <Router basename="">
        <Switch>
          <Route exact path="/month/:year/:month/:day?" component={MonthScreen} />
          <Redirect to={`/month/${date.year()}/${date.month()}/${date.date()}`} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
