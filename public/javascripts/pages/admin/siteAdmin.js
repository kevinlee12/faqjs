import { Component } from 'inferno';

class SiteAdmin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> Elastic Managment </h3>
        <button class="btn-flat btn-flat waves-effect waves-green green lighten-5">
          Create Thread Index
        </button>
      </div>
    )
  }
}

module.exports = SiteAdmin;
