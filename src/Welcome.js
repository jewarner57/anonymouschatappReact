import React from 'react';
import Button from './Button';
import './App.css';

class Welcome extends React.Component {
  render() {
    return (
      <div className='page-body'>
        <Button
          buttonClicked={this.props.buttonClicked}
          destination='create'
          title='Create Chatroom'
        ></Button>

        <Button
          destination='join'
          buttonClicked={this.props.buttonClicked}
          title='Join Chatroom'
        ></Button>
      </div>
    );
  }
}

export default Welcome;
