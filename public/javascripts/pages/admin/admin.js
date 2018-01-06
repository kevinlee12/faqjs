import 'hammerjs';
import 'materialize-css';

import Inferno from 'inferno';
import Component from 'inferno-component';

import Navbar from './navbar';

import routes from './adminRouter'

class AdminPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: ''
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <div class="container">
          { routes }
        </div>
      </div>
    )
  }
}

Inferno.render(<AdminPageApp />, document.getElementById('app'));
