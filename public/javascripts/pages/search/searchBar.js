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
  handleSearch() {
    if (this.props.onSearchBtnClick) {
      this.props.onSearchBtnClick();
    }
  }
  componentDidUpdate() {
    $('input').on('keypress', function(e) {
      var key = e.which;
      console.log(key);
      if (key === 13) {
        this.handleSearch();
      }
    }.bind(this));
  }
  render() {
    return (
      <div class="row">
        <div class="input-field col s10">
          <input id="icon_prefix" type="text"
                 class="validate" value={ this.state.q }
                 onInput={ this.handleChange.bind(this) } />
          <label for="icon_prefix">How can we help you?</label>
        </div>
        <div class="col s2">
          <button class="btn waves-effect waves-light"
                  style="margin-top:20px;width:70%"
                  onClick={ this.handleSearch.bind(this) }>
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
