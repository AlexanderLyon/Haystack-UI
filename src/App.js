import React from 'react';
import ReactDOM from 'react-dom';
import Haystack from 'haystack-search';
import { Suggestions } from './Suggestions';

export class HaystackUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: "",
      showSuggestions: false,
      prediction: null,
      showClear: false,
      currentFocus: -1
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clear = this.clear.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.autocomplete = this.autocomplete.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.suggestionClick = this.suggestionClick.bind(this);
    this.settings = this.props.settings;
    this.haystack = new Haystack({
      caseSensitive: this.settings.caseSensitive,
      flexibility: this.settings.flexibility,
      stemming: this.settings.stemming,
      exclusions: this.settings.exclusions,
      ignoreStopWords: this.settings.ignoreStopWords
    });
    let suggestionList;
  }

  handleKeyDown(e) {
    // Listens mainly for arrow key presses

    if (this.settings.inlineSuggestions && this.state.prediction) {
      // Tab pressed
      if (e.keyCode === 9) {
        e.preventDefault();
        document.getElementById('searchBar').value = this.state.prediction;
        this.setState({ prediction: null, showSuggestions: false });
      }
    }

    if (this.suggestionList) {
      let newFocus;

      if (e.keyCode === 40) {
        // Down pressed
        e.preventDefault();

        if (this.state.currentFocus < (this.suggestionList.length - 1) || this.state.currentFocus == -1) {
          newFocus = this.state.currentFocus + 1;
          const elements = document.querySelectorAll('#Haystack-UI li');
          if (elements.length) {
            for(let i=0; i<elements.length; i++){
              elements[i].classList.remove('active');
            }
            document.getElementById('s' + newFocus).classList.add('active');
            document.getElementById('searchBar').value = this.suggestionList[newFocus];
          }
        }
        else if (this.state.currentFocus == (this.suggestionList.length - 1)) {
          newFocus = 0;
          const elements = document.querySelectorAll('#Haystack-UI li');
          if (elements.length) {
            for(let i=0; i<elements.length; i++){
              elements[i].classList.remove('active');
            }
            document.getElementById('s' + newFocus).classList.add('active');
            document.getElementById('searchBar').value = this.suggestionList[newFocus];
          }
        }
      }
      else if (e.keyCode === 38) {
        // Up pressed
        e.preventDefault();

        if ((this.state.currentFocus) > 0) {
          newFocus = this.state.currentFocus - 1;
          const elements = document.querySelectorAll('#Haystack-UI li');
          if (elements.length) {
            for(let i=0; i<elements.length; i++){
              elements[i].classList.remove('active');
            }
            document.getElementById('s' + newFocus).classList.add('active');
            document.getElementById('searchBar').value = this.suggestionList[newFocus];
          }
        }
        else if (this.state.currentFocus == 0 || this.state.currentFocus == -1) {
          newFocus = this.suggestionList.length - 1;
          const elements = document.querySelectorAll('#Haystack-UI li');
          if (elements.length) {
            for(let i=0; i<elements.length; i++){
              elements[i].classList.remove('active');
            }
            document.getElementById('s' + newFocus).classList.add('active');
            document.getElementById('searchBar').value = this.suggestionList[newFocus];
          }
        }
      }
      this.setState({ currentFocus: newFocus, prediction: null });
    }
  }

  handleKeyUp(e) {
    if (e.target.value) {
      if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 9) {
        this.setState({
          userQuery: e.target.value,
          showSuggestions: true,
          prediction: this.autocomplete(e.target.value),
          showClear: true,
          currentFocus: -1
        });
      }
    } else {
      this.setState({
        userQuery: "",
        showSuggestions: false,
        prediction: null,
        currentFocus: -1,
        showClear: false
      });
      this.suggestionList = null;
    }
  }

  handleBlur(e) {
    let currentTarget = e.currentTarget;
    /* suggestionClick may potentially be running, wait 100ms for finish */
    setTimeout( () => {
      if ( !currentTarget.contains(document.activeElement) ) {
        this.setState({ showSuggestions: false, prediction: null });
      }
    }, 100);

  }

  getSuggestions() {
    // Search for similar words using Haystack
    let results;

    if (this.settings.source) {
      results = this.haystack.search(this.state.userQuery, this.settings.source, this.settings.suggestionLimit);
    }

    if (results) {
      const resultList = results.map( (value, i) =>
        <li key={'s'+i} id={'s'+i} onClick={this.suggestionClick}>
          {value}
        </li>
      );
      this.suggestionList = results;
      return resultList;
    }
    else {
      return <h4>No Results</h4>;
    }
  }

  autocomplete(text) {
    const pool = this.settings.source;

    // For pool as an array:
    if (typeof pool === 'object' && pool.constructor === Array) {
      for (let i=0; i<pool.length; i++) {
        const word = this.settings.caseSensitive ? pool[i] : pool[i].toLowerCase();
        if (word.startsWith(text)) {
          return word;
        }
      }
    }

    // For pool as an object
    else if (typeof pool === 'object' && pool.constructor === Object) {
      for (let key in pool) {
        const word = this.settings.caseSensitive ? pool[key] : pool[key].toLowerCase();
        if (word.startsWith(text)) {
          return word;
        }
      }
    }

    return null;
  }

  suggestionClick(e) {
    const text = e.target.innerText;
    document.getElementById('searchBar').value = text;
    this.setState({ userQuery: text, showSuggestions: false, prediction: null, showClear: true });
    this.submitSearch();
  }

  submitSearch(e) {
    if (e) {
      e.preventDefault();
    }
    if (document.getElementById('searchBar').value) {
      document.querySelector('#Haystack-UI form').submit();
    }
  }

  clear() {
    document.getElementById('searchBar').value = "";
    this.setState({ userQuery: "", showSuggestions: false, prediction: null, showClear: false });
    this.suggestionList = null;
  }

  render() {
    return (
      <div id="Haystack-UI" className={'theme-' + this.settings.theme.toLowerCase()} onFocus={this.handleKeyUp} onBlur={this.handleBlur}>
        <form method="GET" action={this.settings.submitLocation} onSubmit={this.submitSearch}>
          <input id="searchBar" type="search" autoComplete="off" name="query"
            placeholder={this.settings.placeholder}
            className={(this.state.showSuggestions && this.settings.showSuggestions) ? "expanded" : ""}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
          />
          { this.settings.inlineSuggestions &&
            <label for="searchBar" id="prediction-text">{this.state.prediction}</label>
          }
        </form>
        { this.state.showClear &&
          <span id="clear" onClick={this.clear}>{String.fromCharCode(215)}</span>
        }
        { this.settings.showSuggestions &&
          <Suggestions show={this.state.showSuggestions} getSuggestions={this.getSuggestions()}/>
        }
      </div>
    );
  }
}
