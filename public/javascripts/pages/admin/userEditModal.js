import { Component } from 'inferno';

const userEditUrl = '/admin/user/update';
const userCreateUrl = '/admin/user/create';
const userDeleteUrl = '/admin/user/delete';

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.identifier,
      displayName: this.props.displayName,
      email: this.props.email,
      approved: this.props.approved
    };
  }
  updateUser() {
    let params = {
      _id: this.state.identifier,
      displayName: this.state.displayName,
      email: this.state.email,
      approved: this.state.approved
    };
    let that = this;
    $.ajax({
      url: userEditUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        that.props.onUpdate(params);
      }
    });
  }
  deleteUser() {
    let params = {
      _id: this.state.identifier,
    };

    let that = this;
    $.ajax({
      url: userDeleteUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        that.props.onDelete(params);
      }
    });
  }
  createUser() {
    let params = {
      displayName: this.state.displayName,
      email: this.state.email,
      approved: this.state.approved
    };
    let that = this;
    $.ajax({
      url: userCreateUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
        that.props.onCreate(data[0]);
      }
    });
  }
  handleDisplayNameChange(event) {
    this.setState({
      displayName: event.target.value
    })
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  handleApprovedChange(event) {
    this.setState({
      approved: !event.target.checked
    })
  }
  render() {
    let modalHref = 'm' + this.props.identifier;
    return (
      <div id={ modalHref } class="modal modal-fixed-footer">
        <div class="modal-content">
          <div class="row">
            { this.props.onUpdate ? <h4> Modify a Thread </h4>
              : <h4> Create a Thread </h4> }
            <div class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="user_display_name" type="text"
                         onInput={ this.handleDisplayNameChange.bind(this) }
                         value={ this.state.displayName } />
                  {
                    this.state.displayName ?
                    <label class="active" for="user_display_name">Name</label>
                    :
                    <label for="user_display_name">Name</label>
                  }
                </div>
                <div class="input-field col s12">
                  <input id="user_email" type="email" class="validate"
                         onInput={ this.handleEmailChange.bind(this) }
                         value={ this.state.email } />
                  {
                    this.state.email ?
                    <label class="active" for="user_email">Email</label>
                    :
                    <label for="user_email">Email</label>
                  }
                </div>
                <div class="switch">
                  <label>
                    Not Approved
                    <input type="checkbox"
                           onInput={ this.handleApprovedChange.bind(this) }
                           checked={ this.state.approved } />
                    <span class="lever"></span>
                    Approved
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          { this.props.onDelete ?
            <button class="modal-action modal-close waves-effect waves-red btn-flat red lighten-5"
                  onClick= { this.deleteUser.bind(this) }>
              Delete User
            </button>
            : null }
          <button class="modal-action modal-close waves-effect waves-grey btn-flat">
            Cancel
          </button>
          { this.props.onUpdate ?
            <button class="modal-action modal-close waves-effect waves-green btn-flat green lighten-5"
                    onClick={ this.updateUser.bind(this) }>
              Save Changes
            </button>
            : null }
          { this.props.onCreate ?
            <button class="modal-action modal-close waves-effect waves-green btn-flat green lighten-5"
                    onClick={ this.createUser.bind(this) }>
              Create User
            </button>
            : null }
        </div>
      </div>
    )
  }
}

UserModal.defaultProps = {
  identifier: '',
  displayName: '',
  email: '',
  approved: false,
  onCreate: null,
  onUpdate: null,
  onDelete: null
}

class UserModalContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    $('.modal').modal();
  }
  render() {
    let that = this;
    let resultModals = this.props.users.map(function(item, index) {
      return (
        <UserModal key={ item._id } identifier={ item._id }
                   displayName={ item.displayName }
                   email={ item.email } approved={ item.approved }
                   onUpdate={ that.props.updateUserCallback }
                   onDelete={ that.props.deleteUserCallback } />
      )
    });
    return (
      <div>
        { resultModals }
        <UserModal identifier="createModal"
                   onCreate={ that.props.createUserCallback } />
      </div>
    )
  }
}

UserModalContainer.defaultProps = {
  users: [],
  createUserCallback: null,
  deleteUserCallback: null,
  updateUserCallback: null
};

module.exports = UserModalContainer;
