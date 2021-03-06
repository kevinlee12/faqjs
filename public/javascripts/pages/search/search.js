import 'hammerjs';
import 'materialize-css';

import { render, Component } from 'inferno';

import Navbar from './navbar.js';
import SearchBar from './searchBar.js'
import Results from './result.js'
import ModalContainer from './modalContainer.js'

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
  setQueryText(text) {
    this.setState({
      q: text
    });
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
      ready: function(modal, trigger)  {
        location.hash = modal.attr('id');
      },
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
          <SearchBar onChange={ this.setQueryText.bind(this) }
                     onSearchBtnClick={ this.search.bind(this) } />
          <Results results={ this.state.results } />
        </div>
        <ModalContainer results={ this.state.results } />
      </div>
    )
  }
}

render(<SearchPageApp />, document.getElementById('app'));
