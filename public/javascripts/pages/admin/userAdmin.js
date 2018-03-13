import { Component } from 'inferno';

import UserModalContainer from './userEditModal';

const queryUserUrlPrefix = '/admin/users';

class UserPreview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let modalHref = '#m' + this.props.identifier;
    return (
      <tr href={ modalHref } class="modal-trigger">
        <td> { this.props.userName } </td>
        <td> { this.props.email } </td>
        <td> { this.props.approved ? 'Yes' : 'No' } </td>
      </tr>
    );
  }
}

UserPreview.defaultProps = {
  identifier: '',
  userName: '',
  email: '',
  approved: false
};

class UserContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let users = this.props.users.map(function(item) {
      return (
        <UserPreview key={ item._id } identifier={ item._id }
                     userName={ item.displayName }
                     email={ item.email } approved={ item.approved } />
      );
    });
    return (
      <table class="bordered highlight">
        <thead>
          <tr>
            <th> Name </th>
            <th> Email </th>
            <th> Approved </th>
          </tr>
        </thead>

        <tbody>
          { users }
        </tbody>
      </table>
    )
  }
}

UserContainer.defaultProps = {
  users: []
};

class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.searchUsers();
  }
  searchUsers() {
    var queryUrl = queryUserUrlPrefix;
    $.get(queryUrl, function(data) {
      this.setState({
        users: data
      });
    }.bind(this));
  }
  updateUser(userObj) {
    let that = this;
    this.state.users.map(function(item, index) {
      if (item._id === userObj._id) {
        let updatedUser = {
          _id: item._id,
          displayName: userObj.displayName,
          email: userObj.email,
          approved: userObj.approved
        };
        let tempState = that.state.users;
        tempState[index] = updatedUser;
        that.setState({
          users: tempState
        });
      }
      return;
    })
  }
  deleteUser(userObj) {
    let that = this;
    this.state.users.map(function(item, index) {
      if (item._id === userObj._id) {
        let tempState = that.state.users;
        tempState.splice(index, 1);
        that.setState({
          users: tempState
        });
      }
      return;
    })
  }
  createUser(userObj) {
    let updatedStateUsers = this.state.users;
    updatedStateUsers.push(userObj);
    this.setState({
      users: updatedStateUsers
    });
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> User Managment </h3>
        <a href="#mcreateModal" class="btn-flat modal-trigger btn-flat waves-effect waves-green green lighten-5">
          Create user
        </a>
        <UserContainer users={ this.state.users } />
        <UserModalContainer users={ this.state.users }
                            updateUserCallback={ this.updateUser.bind(this) }
                            deleteUserCallback={ this.deleteUser.bind(this) }
                            createUserCallback={ this.createUser.bind(this) } />
      </div>
    )
  }
}

module.exports = UserAdmin;
