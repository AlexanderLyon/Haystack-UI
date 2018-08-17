import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

export const Suggestions = (props) => {
  let boxContent;

  if (props.show) {
    boxContent = (
      <div id="suggestions">
        <ul id="suggestion-list"> {props.getSuggestions} </ul>
      </div>
    );
  }

  return (
    <CSSTransitionGroup transitionName="slideDown"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}>
      {boxContent}
    </CSSTransitionGroup>
  );
}
