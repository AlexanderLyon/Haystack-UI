import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    let suggestionBox;

    if( this.props.show && this.state.mounted ){
      suggestionBox = (
        <div id="suggestions">
          <ul id="suggestion-list"> {this.props.getSuggestions} </ul>
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName="slideDown"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200} >
        {suggestionBox}
      </ReactCSSTransitionGroup>
    );
  }
}
