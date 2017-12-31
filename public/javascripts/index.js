import 'hammerjs';
import 'materialize-css';

import Inferno from 'inferno';
import Component from 'inferno-component';

import Navbar from './navbar.js';
import SearchBar from './searchBar.js'
import Results from './result.js'

const queryUrlPrefix = '/search';

class SearchPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      results: []
    };
  }
  setQueryTextAndSearch(text) {
    this.setState({
      q: text
    });
    this.search();
  }
  search() {
    var queryUrl = queryUrlPrefix + '?q=' + this.state.q;
    $.get(queryUrl, function(data) {
      this.setState({
        results: data
      });
    }.bind(this));
  }
  render() {
    return (
      <div>
        <Navbar />
        <div class="container" style="margin-top: 10px;">
          <SearchBar onChange={ this.setQueryTextAndSearch.bind(this) } />
          <Results results={ this.state.results } />
        </div>
      </div>
    )
  }
}

Inferno.render(<SearchPageApp />, document.getElementById('app'));
