import Inferno from 'inferno';
import Component from 'inferno-component';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper">
            <div class="brand-logo left">FAQ</div>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="#">Users</a></li>
              <li><a href="#">Threads</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
