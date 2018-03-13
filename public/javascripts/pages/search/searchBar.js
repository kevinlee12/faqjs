import { Component, linkEvent } from 'inferno';

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
  /*
    The following initiates a search whenever the user presses on the
    Enter/Return key.
  */
  handleKeyboardInitiatedSearch(instance, event) {
    var key = event.which;
    if (key === 13) {
      instance.handleSearch(instance);
    }
  }
  render() {
    return (
      <div class="row">
        <div class="input-field col s10">
          <input id="icon_prefix" type="text"
                 class="validate" value={ this.state.q }
                 onInput={ linkEvent(this, this.handleChange) }
                 onKeyDown={ linkEvent(this, this.handleKeyboardInitiatedSearch )} />
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
