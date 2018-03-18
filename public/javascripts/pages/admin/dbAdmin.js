import { linkEvent, Component } from 'inferno';

const COLLECTION_CREATION_URL = '/admin/db/create';
const COLLECTION_DROP_URL = '/admin/db/drop';
const ALLOWED_COLLECTIONS = [
  'threads', 'siteConfig'
];

function createCollection(collection) {
  if(ALLOWED_COLLECTIONS.indexOf(collection) > -1) {
    $.post(COLLECTION_CREATION_URL, { collectionName: collection });
  }
}
function dropCollection(collection) {
  if(ALLOWED_COLLECTIONS.indexOf(collection) > -1) {
    $.post(COLLECTION_DROP_URL, { collectionName: collection });
  }
}

class DBAdmin extends Component {
  constructor(props) {
    super(props);
  }
  createThreadsCollection(instance) {
    createCollection('threads');
  }
  dropThreadsCollection(instance) {
    dropCollection('threads');
  }
  createsSiteConfigCollection(instance) {
    createCollection('siteConfig');
  }
  dropSiteConfigCollection(instance) {
    dropCollection('siteConfig');
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> Database Managment </h3>
        <table class="bordered">
          <thead>
            <tr>
                <th>Collection</th>
                <th></th>
                <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Threads</td>
              <td>
                <button onClick={ linkEvent(this, this.createThreadsCollection) }
                        class="btn-flat btn-flat waves-effect waves-green green lighten-5">
                  Create Collection
                </button>
              </td>
              <td>
                <button onClick={ linkEvent(this, this.dropThreadsCollection) }
                        class="btn-flat btn-flat waves-effect waves-red red lighten-5">
                  Drop Collection
                </button>
              </td>
            </tr>

            <tr>
              <td>Site Config</td>
              <td>
                <button onClick={ linkEvent(this, this.createsSiteConfigCollection) }
                        class="btn-flat btn-flat waves-effect waves-green green lighten-5">
                  Create Collection
                </button>
              </td>
              <td>
                <button onClick={ linkEvent(this, this.dropSiteConfigCollection) }
                        class="btn-flat btn-flat waves-effect waves-red red lighten-5">
                  Drop Collection
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = DBAdmin;
