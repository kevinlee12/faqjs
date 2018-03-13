import 'hammerjs';
import 'materialize-css';

import { Component, render } from 'inferno';

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

render(<AdminPageApp />, document.getElementById('app'));
