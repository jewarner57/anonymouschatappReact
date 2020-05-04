import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './App.css';
import Welcome from './Welcome';
import Chatroom from './Chatroom';
import socket from './socketConfig';
import logo from './logo.png';
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'welcome',
      response: 0,
      socket: socket,
      myUsername: uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      }),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.setState({ activePage: page });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} alt='Logo' className='App-logo' />
          <h3 className='App-title'> No save, Anonymous Chat</h3>
        </header>
        {this.state.activePage === 'create' ? (
          <CreateRoom
            socket={this.state.socket}
            myUsername={this.state.myUsername}
          ></CreateRoom>
        ) : this.state.activePage === 'join' ? (
          <JoinRoom
            socket={this.state.socket}
            myUsername={this.state.myUsername}
          ></JoinRoom>
        ) : this.state.activePage === 'welcome' ? (
          <div>
            <Welcome buttonClicked={this.handleClick.bind(this)}></Welcome>
            <div className='page-body'>
              <Chatroom
                socket={this.state.socket}
                title='Global Chat'
                onSend='sendGlobalMessage'
                onRecieve='receiveGlobalMessage'
                roomAddress='global'
                roomID='global'
                myUsername={this.state.myUsername}
              ></Chatroom>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
