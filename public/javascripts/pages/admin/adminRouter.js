import 'hammerjs';
import 'materialize-css';

import { BrowserRouter, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import UserAdmin from './userAdmin';
import ThreadAdmin from './threadAdmin';
import SiteAdmin from './siteAdmin';
import DBAdmin from './dbAdmin';
import ElasticAdmin from './elasticAdmin';

const browserHistory = createBrowserHistory();

const routes = (
  <BrowserRouter history={ browserHistory }>
    <Route>
      <div>
        <Route path="/admin/manage/users" component={ UserAdmin } />
        <Route path="/admin/manage/threads" component={ ThreadAdmin } />
        <Route path="/admin/manage/site" component={ SiteAdmin } />
        <Route path="/admin/manage/db" component={ DBAdmin } />
        <Route path="/admin/manage/elastic" component={ ElasticAdmin } />
      </div>
    </Route>
  </BrowserRouter>
);

export default routes;
