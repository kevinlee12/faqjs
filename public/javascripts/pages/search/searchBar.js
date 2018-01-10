import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: ''
    };
  }
  handleChange(instance, event) {
    instance.setState({
      q: event.target.value
    });

    if (instance.props.onChange) {
      instance.props.onChange(event.target.value);
    }
  }
  handleSearch(instance) {
    if (instance.props.onSearchBtnClick) {
      instance.props.onSearchBtnClick();
    }
  }
  componentDidUpdate() {
    $('input').on('keypress', function(e) {
      var key = e.which;
      if (key === 13) {
        this.handleSearch(this);
      }
    }.bind(this));
  }
  render() {
    return (
      <div class="row">
        <div class="input-field col s10">
          <input id="icon_prefix" type="text"
                 class="validate" value={ this.state.q }
                 onInput={ linkEvent(this, this.handleChange) } />
          <label for="icon_prefix">How can we help you?</label>
        </div>
        <div class="col s2">
          <button class="btn waves-effect waves-light"
                  style="margin-top:20px;width:70%"
                  onClick={ linkEvent(this, this.handleSearch) }>
            <i class="material-icons">search</i>
          </button>
        </div>
      </div>
    )
  }
}

SearchBar.defaultProps = {
  handleChange: null,
  onSearchBtnClick: null
};

module.exports = SearchBar;
