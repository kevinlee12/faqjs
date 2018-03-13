import { linkEvent, Component } from 'inferno';

const PREVIEW_LENGTH = 250;

// Given a text, shortens the preview to a specified length.
function shortenPreviewText(text) {
  if (text.length < PREVIEW_LENGTH) {
    return text;
  }
  return text.substring(0, PREVIEW_LENGTH) + '...';
}

class ResultPreview extends Component {
  constructor(props) {
    super(props);
  }
  openModal(instance) {
    let modalHref = '#m' + instance.props.identifier;

    // The following is adapted from
    // https://stackoverflow.com/a/14690177
    if (history.pushState) {
      history.pushState(null, null, modalHref);
    } else {
      location.hash = modalHref;
    }
  }
  answerPreviewRender() {
    return (
      <div>
        { shortenPreviewText(this.props.answer) }
      </div>
    );
  }
  render() {
    let modalHref = '#m' + this.props.identifier;
    return (
      <div>
        <div class="section">
          <a class="modal-trigger" onClick={ linkEvent(this, ResultPreview.openModal) }
             href={ modalHref }>
            <h4> { this.props.question } </h4>
          </a>
          <div> { this.answerPreviewRender() } </div>
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
        <ResultPreview key={ 'p' + item._id } identifier={ item._id }
                       question={ item.question } answer={ item.answer } />
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
