import Inferno from 'inferno';
import Component from 'inferno-component';

import ThreadModalContainer from './threadEditModal';

const queryUrlPrefix = '/search';

class Thread extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let modalHref = '#m' + this.props.identifier;
    return (
      <tr href={ modalHref } class="modal-trigger">
        <td> { this.props.question } </td>
        <td> { this.props.answer } </td>
      </tr>
    );
  }
};

Thread.defaultProps = {
  identifier: '',
  question: '',
  answer: ''
};

class ThreadContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let threads = this.props.threads.map(function(item) {
      return (
        <Thread identifier={item._id} question={item.question}
                answer={item.answer} />
      );
    });
    return (
      <table class="bordered highlight">
        <thead>
          <tr>
            <th> Question </th>
            <th> Answer </th>
          </tr>
        </thead>

        <tbody>
          { threads }
        </tbody>
      </table>
    )
  }
};

ThreadContainer.defaultProps = {
  threads: []
};

class ThreadAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      q: ''
    };
    this.search();
  }
  search() {
    var queryUrl = queryUrlPrefix + '?q=' + this.state.q;
    $.get(queryUrl, function(data) {
      this.setState({
        threads: data
      });
    }.bind(this));
  }
  updateThread(threadObj) {
    let that = this;
    this.state.threads.map(function(item, index) {
      if (item._id === threadObj._id) {
        let updatedThread = {
          _id: item._id,
          question: threadObj.question,
          answer: threadObj.answer
        };
        let tempState = that.state.threads;
        tempState[index] = updatedThread;
        that.setState({
          threads: tempState
        });
      }
      return;
    })
  }
  deleteThread(threadObj) {
    let that = this;
    this.state.threads.map(function(item, index) {
      if (item._id === threadObj._id) {
        let tempState = that.state.threads;
        tempState.splice(index, 1);
        that.setState({
          threads: tempState
        });
      }
      return;
    })
  }
  createThread(threadObj) {
    let updatedStateThreads = this.state.threads;
    updatedStateThreads.push(threadObj);
    this.setState({
      threads: updatedStateThreads
    });
  }
  render() {
    return (
      <div>
        <h3 class="admin-header"> Thread Managment </h3>
        <a href="#mcreateModal" class="btn-flat modal-trigger btn-flat waves-effect waves-green green lighten-5">
          Create Thread
        </a>
        <ThreadContainer threads={ this.state.threads } />
        <ThreadModalContainer threads={ this.state.threads }
                              updateThreadCallback={ this.updateThread.bind(this) }
                              deleteThreadCallback={ this.deleteThread.bind(this) }
                              createThreadCallback={ this.createThread.bind(this) } />
      </div>
    )
  }
};

module.exports = ThreadAdmin;
