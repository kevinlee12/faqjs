import Inferno from 'inferno';
import Component from 'inferno-component';

class ResultPreview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div class="section">
          <h4> { this.props.question } </h4>
          <div> { this.props.answer } </div>
        </div>
        <div class="divider"></div>
      </div>
    )
  }
}

ResultPreview.defaultProps = {
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
        <ResultPreview question={ item.question } answer={ item.answer } />
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
