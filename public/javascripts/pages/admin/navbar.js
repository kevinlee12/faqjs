import Inferno from 'inferno';
import Component from 'inferno-component';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="navbar-fixed">
        <nav class="nav-extended">
          <div class="nav-wrapper">
            <div class="brand-logo left">FAQ</div>
            <ul class="right">
              <li><a href="/admin/manage/users">Users</a></li>
              <li><a href="/admin/manage/threads">Thread</a></li>
              <li><a href="/admin/manage/elastic">Elastic Search</a></li>
              <li><a href="/logout" class="waves-effect waves-light btn blue-grey darken-2" >Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
