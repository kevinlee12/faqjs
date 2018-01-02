import Inferno from 'inferno';
import Component from 'inferno-component';

const threadEditUrl = '/admin/thread';
const threadCreateUrl = '/admin/thread/create';
const threadDeleteUrl = '/admin/thread/delete';

class ThreadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.identifier,
      question: this.props.question,
      answer: this.props.answer
    };
  }
  sendEdits() {
    let params = {
      _id: this.state.identifier,
      question: this.state.question,
      answer: this.state.answer
    };
    let that = this;
    $.ajax({
      url: threadEditUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        that.props.onChange(params);
      }
    });
  }
  deleteThread() {
    let params = {
      _id: this.state.identifier,
    };

    let that = this;
    $.ajax({
      url: threadDeleteUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        that.props.onDelete(params);
      }
    });
  }
  createThread() {
    let params = {
      question: this.state.question,
      answer: this.state.answer
    };
    let that = this;
    $.ajax({
      url: threadCreateUrl,
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
        that.props.onCreate(data[0]);
      }
    });
  }
  handleQuestionChange(event) {
    this.setState({
      question: event.target.value
    })
  }
  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value
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
                  <input id="thread_question" type="text"
                         onInput={ this.handleQuestionChange.bind(this) }
                         value={ this.state.question } />
                  {
                    this.state.question ?
                    <label class="active" for="thread_question">Question</label>
                    :
                    <label for="thread_question">Question</label>
                  }
                </div>
                <div class="input-field col s12">
                  <textarea id="thread_answer" type="text"
                            onInput={ this.handleAnswerChange.bind(this) }
                            class="materialize-textarea"
                            value={this.state.answer}></textarea>
                  {
                    this.state.answer ?
                    <label class="active" for="thread_answer">Answer</label>
                    :
                    <label for="thread_answer">Answer</label>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          { this.props.onDelete ?
            <button class="modal-action modal-close waves-effect waves-red btn-flat red lighten-5"
                  onClick= { this.deleteThread.bind(this) }>
              Delete Thread
            </button>
            : null }
          <button class="modal-action modal-close waves-effect waves-grey btn-flat">
            Cancel
          </button>
          { this.props.onUpdate ?
            <button class="modal-action modal-close waves-effect waves-green btn-flat green lighten-5"
                    onClick={ this.sendEdits.bind(this) }>
              Save Changes
            </button>
            : null }
          { this.props.onCreate ?
            <button class="modal-action modal-close waves-effect waves-green btn-flat green lighten-5"
                    onClick={ this.createThread.bind(this) }>
              Create Thread
            </button>
            : null }
        </div>
      </div>
    )
  }
}

ThreadModal.defaultProps = {
  identifier: '',
  question: '',
  answer: '',
  onCreate: null,
  onUpdate: null,
  onDelete: null
}

class ThreadModalContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    $('.modal').modal();
  }
  render() {
    let that = this;
    let resultModals = this.props.threads.map(function(item, index) {
      return (
        <ThreadModal identifier={ item._id } question={ item.question }
                     answer={ item.answer }
                     onUpdate={ that.props.updateThreadCallback }
                     onDelete={ that.props.deleteThreadCallback } />
      )
    });
    return (
      <div>
        { resultModals }
        <ThreadModal identifier="createModal"
                     onCreate={ that.props.createThreadCallback } />
      </div>
    )
  }
}

ThreadModalContainer.defaultProps = {
  threads: [],
  createThreadCallback: null,
  deleteThreadCallback: null,
  updateThreadCallback: null
};

module.exports = ThreadModalContainer;
