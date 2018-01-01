import Inferno from 'inferno';
import Component from 'inferno-component';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: ''
    };
  }
  handleChange(event) {
    this.setState({
      q: event.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }
  render() {
    return (
      <div class="row">
        <div class="input-field col s12">
          <input id="icon_prefix" type="text"
                 class="validate" value={ this.state.q }
                 onInput={ this.handleChange.bind(this) } />
          <label for="icon_prefix">How can we help you?</label>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar;
