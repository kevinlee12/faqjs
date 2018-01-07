import Inferno from 'inferno';
import Component from 'inferno-component';

const createIndexUrlPrefix = '/admin/elastic/create_index';

class ThreadAdmin extends Component {
  constructor(props) {
    super(props);
  }
  createIndex() {
    $.get(createIndexUrlPrefix);
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> Elastic Managment </h3>
        <button onClick={ this.createIndex.bind(this) } class="btn-flat btn-flat waves-effect waves-green green lighten-5">
          Create Thread Index
        </button>
      </div>
    )
  }
};

module.exports = ThreadAdmin;
