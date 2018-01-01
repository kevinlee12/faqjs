import Inferno from 'inferno';
import Component from 'inferno-component';

class ResultModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let modalHref = 'm' + this.props.identifier;
    return (
      <div id={ modalHref } class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4> { this.props.question } </h4>
          <div> { this.props.answer } </div>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    )
  }
}

ResultModal.defaultProps = {
  identifier: '',
  question: '',
  answer: ''
};


class ModalContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let resultModals = this.props.results.map(function(item, index) {
      return (
        <ResultModal identifier={ item._id } question={ item.question }
                     answer={ item.answer } />
      )
    });
    return (
      <div>
        { resultModals }
      </div>
    )
  }
}

ModalContainer.defaultProps = {
  results: []
};

module.exports = ModalContainer;
