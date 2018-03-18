import { Component, linkEvent } from 'inferno';

const siteConfigViewUrl = '/admin/site/view';
const siteConfigEditUrl = '/admin/site/edit';

class SiteAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: '',
      motherSite: ''
    };
  }
  componentWillMount() {
    $.get(siteConfigViewUrl, function(data) {
      this.setState({
        siteName: data.siteName,
        motherSite: data.motherSite
      });
    }.bind(this));
  }
  handleSiteNameChange(instance, event) {
    instance.setState({
      siteName: event.target.value
    });
  }
  handleMotherSiteUrlChange(instance, event) {
    instance.setState({
      motherSite: event.target.value
    });
  }
  updateSiteConfig(instance) {
    let params = {
      siteConfig: instance.state
    };
    $.ajax({
      url: siteConfigEditUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    });
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> Site Managment </h3>
        <button onClick={ linkEvent(this, this.updateSiteConfig) }
                class="btn-flat btn-flat waves-effect waves-green green lighten-5">
          Save
        </button>
        <div class="row">
          <div class="input-field col s10">
            <input id="site-admin-site-name" type="text"
                   onInput={ linkEvent(this, this.handleSiteNameChange ) }
                   class="validate" value={ this.state.siteName }/>
            {
              this.state.siteName ?
              <label class="active" for="site-admin-site-name">Site Name</label>
              :
              <label for="site-admin-site-name">Site Name</label>
            }
          </div>
          <div class="input-field col s10">
            <input id="site-admin-mother-site-url" type="url"
                   onInput={ linkEvent(this, this.handleMotherSiteUrlChange ) }
                   class="validate" value={ this.state.motherSite }/>
            {
              this.state.motherSite ?
              <label class="active" for="site-admin-mother-site-url">Mother Site Url</label>
              :
              <label for="site-admin-mother-site-url">Mother Site Url</label>
            }
          </div>
        </div>
      </div>
    )
  }
}

module.exports = SiteAdmin;
