import 'hammerjs';
import 'materialize-css';

import Inferno from 'inferno';
import Component from 'inferno-component';

import Navbar from './navbar';
import ThreadAdmin from './threadAdmin';
import UserAdmin from './userAdmin';

class AdminPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: ''
    };
  }
  render() {
    let adminContent = <ThreadAdmin />;
    if (this.state.currentTab === 'users') {
      <UsersAdmin />
    }
    return (
      <div>
        <Navbar />
        <div class="container" style="margin-top: 10px;">
        { adminContent }
        </div>
      </div>
    )
  }
}

Inferno.render(<AdminPageApp />, document.getElementById('app'));
