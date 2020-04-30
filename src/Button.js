import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button
        className='Button'
        onClick={this.props.buttonClicked.bind(this, this.props.destination)}
      >
        {this.props.title}
      </button>
    );
  }
}
