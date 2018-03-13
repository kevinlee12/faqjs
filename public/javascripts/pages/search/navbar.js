import { Component } from 'inferno';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  getReferrerUrl() {
    return document.referrer;
  }
  render() {
    return (
      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper">
            { this.getReferrerUrl() ?
              <a href={ this.getReferrerUrl() } class="navbar-back waves-effect waves-light btn">
                <i class="material-icons left">arrow_back</i> Back
              </a>
              : null
            }
            <div class="brand-logo right">FAQ</div>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
