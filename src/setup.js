 /*
  * HaystackUI.js
  * By: Alexander Lyon
  * Version 1.0
  * https://github.com/AlexanderLyon/Haystack-UI
  * Initialization & settings
  */

 import React from 'react';
 import ReactDOM from 'react-dom';
 import {HaystackUI} from './App.js';

(function() {
  'use strict';

  window.HaystackUI = function() {
    this.theme = null;
    this.submitLocation = null;
    this.source = null;

    // Default settings
    const defaults = {
      theme: 'light',
      placeholder: 'Search',
      showSuggestions: true,
      inlineSuggestions: false,
      suggestionLimit: 4,
      submitLocation: '#',
      source: null,
      caseSensitive: false,
      flexibility: 1,
      stemming: false,
      exclusions: null,
      ignoreStopWords: false
    };

    // Override defaults with passed in options:
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    } else {
      this.options = defaults;
    }

    /*** Initialize Plugin ***/
    this.init = function() {
      ReactDOM.render(<HaystackUI settings={this.options}/>,
        document.getElementById('HaystackUIContainer'));
    };

  };

  /*** Merge defaults with user options ***/
  function extendDefaults (defaults, options) {
    for(let key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        defaults[key] = options[key];
      }
    }
    return defaults;
  };

}());
