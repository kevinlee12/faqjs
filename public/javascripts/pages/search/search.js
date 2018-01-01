import 'hammerjs';
import 'materialize-css';

import Inferno from 'inferno';
import Component from 'inferno-component';

import Navbar from './navbar.js';
import SearchBar from './searchBar.js'
import Results from './result.js'
import ModalContainer from './resultModal.js'

const queryUrlPrefix = '/search';

class SearchPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      results: []
    };
    this.search();
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
  componentDidUpdate() {
    $('.modal').modal({
      complete: function() {
        location.hash = '#!';
      }
    });
    // Open the appropriate modal if it is in the URL.
    if (location.hash &&
        location.hash !== '#!') {

      let modalHref = location.hash;

      $(modalHref).modal();
      $(modalHref).modal('open');
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div class="container" style="margin-top: 10px;">
          <SearchBar onChange={ this.setQueryTextAndSearch.bind(this) } />
          <Results results={ this.state.results } />
        </div>
        <ModalContainer results={ this.state.results } />
      </div>
    )
  }
}

Inferno.render(<SearchPageApp />, document.getElementById('app'));
