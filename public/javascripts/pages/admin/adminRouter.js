import 'hammerjs';
import 'materialize-css';

import Inferno from 'inferno';
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ThreadAdmin from './threadAdmin';
import UserAdmin from './userAdmin';
import ElasticAdmin from './elasticAdmin';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={ browserHistory }>
    <Route>
      <Route path="/admin/manage/users" component={ UserAdmin } />
      <Route path="/admin/manage/threads" component={ ThreadAdmin } />
      <Route path="/admin/manage/elastic" component={ ElasticAdmin } />
    </Route>
  </Router>
);

export default routes;
