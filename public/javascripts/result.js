import Inferno from 'inferno';
import Component from 'inferno-component';

class ResultPreview extends Component {
  constructor(props) {
    super(props);
  }
  openModal() {
    let modalHref = '#m' + this.props.identifier;
    $(modalHref).modal();
    $(modalHref).modal('open');

    // The following is adapted from
    // https://stackoverflow.com/a/14690177
    if (history.pushState) {
      history.pushState(null, null, modalHref);
    }
    else {
        location.hash = modalHref;
    }
  }
  render() {
    let modalHref = '#m' + this.props.identifier;
    return (
      <div>
        <div class="section">
          <a class="modal-trigger" onClick={ this.openModal.bind(this) }
             href={ modalHref }><h4> { this.props.question } </h4></a>
          <div> { this.props.answer } </div>
        </div>
        <div class="divider"></div>
      </div>
    )
  }
}

ResultPreview.defaultProps = {
  identifier: '',
  question: '',
  answer: ''
};

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var results = this.props.results.map(function(item, index) {
      return (
        <ResultPreview identifier={ item._id } question={ item.question }
                       answer={ item.answer } />
      )
    });
    return (
      <div>
        { results }
      </div>
    )
  }
}

Results.defaultProps = {
  results: []
};

module.exports = Results;
