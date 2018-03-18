import { Component } from 'inferno';

const links = [
  { url: '/admin/manage/threads', name: 'Thread'},
  { url: '/admin/manage/users', name: 'Users' },
  { url: '/admin/manage/site', name: 'Site Config' },
  { url: '/admin/manage/db', name: 'Database' },
  { url: '/admin/manage/elastic', name: 'Elastic Search' }
]

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var navLinks = links.map(function(item, index) {
      return (
        <li key={ index } class={ window.location.pathname === item.url ? 'active' : null }>
          <a href={ item.url }> { item.name } </a>
        </li>
      );
    });
    return (
      <div class="navbar-fixed">
        <nav class="nav-extended">
          <div class="nav-wrapper">
            <div class="brand-logo left">FAQ</div>
            <ul class="right">
              { navLinks }
              <li><a href="/logout" class="waves-effect waves-light btn blue-grey darken-2" >Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
