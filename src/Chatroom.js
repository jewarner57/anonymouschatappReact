import React from 'react';
import './App.css';
import Button from './Button';
import ToggleSwitch from './ToggleSwitch';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: '',
      messageList: [],
      users: 0,
      maxUsers: '-',
      myUsername: this.props.myUsername,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitchFlip = this.handleSwitchFlip.bind(this);
  }

  sendMessage() {
    if (this.state.messageValue.trim() !== '') {
      this.props.socket.emit(this.props.onSend, {
        roomAddress: this.props.roomAddress,
        body: this.state.messageValue,
        username: this.state.myUsername,
      });

      let recievedMessageList = this.state.messageList;

      recievedMessageList.push({
        message: this.state.messageValue,
        type: 'outgoing',
        username: this.state.myUsername,
      });

      this.setState({ messageList: recievedMessageList, messageValue: '' });
    }
  }

  componentDidMount() {
    let messageList = this.state.messageList;

    this.props.socket.on(this.props.onRecieve, (message) => {
      messageList.push({
        message: message.body,
        type: 'incoming',
        username: message.username,
      });
      this.updateMessageList(messageList);
    });

    this.props.socket.on('recieveRoomPopulation', (population) => {
      this.setState({ users: population.users, maxUsers: population.maxUsers });
    });

    this.props.socket.on('updateRoomPopulation', () => {
      this.props.socket.emit('getRoomPopulation', {
        roomAddress: this.props.roomAddress,
        roomID: this.props.roomID,
      });
    });
  }

  componentWillUnmount() {
    this.props.socket.off();
  }

  updateMessageList(newMessageList) {
    this.setState({ messageList: newMessageList });
  }

  handleSwitchFlip(event) {
    this.setState({ toggleSwitchValue: event.target.checked });
  }

  handleChange(event) {
    this.setState({ messageValue: event.target.value }, () => {
      let message = this.state.messageValue;
      let finalChar = message.substring(message.length - 1);

      if (
        (finalChar === '.' || finalChar === '?' || finalChar === '!') &&
        this.state.toggleSwitchValue === true
      ) {
        this.sendMessage();
      }
    });
  }

  render() {
    return (
      <div className='chatbox-body'>
        <div className='chat-title-containter'>
          <h4 className='chatTitle'>Room ID: {this.props.title}</h4>
          <p>
            Users in chat: ({this.state.users}/{this.state.maxUsers})
          </p>
        </div>
        <div className='message-list-container' id='message-list-container'>
          <div className='message-list'>
            {this.state.messageList.map((value, index) => {
              return (
                <div
                  key={'container' + index}
                  className={[
                    value.type + 'Container',
                    'messageContainer',
                  ].join(' ')}
                >
                  <p
                    className={[value.type + 'Username', 'username'].join(' ')}
                  >
                    {value.username}
                  </p>
                  <p
                    key={index}
                    className={[value.type + 'Message', 'message'].join(' ')}
                  >
                    {value.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='text-form-container'>
          <textarea
            onChange={this.handleChange}
            value={this.state.messageValue}
            className='messageBox'
            placeholder='Type stuff here'
          ></textarea>
          <div className='input-container'>
            <Button
              buttonClicked={this.sendMessage.bind(this)}
              destination='NA'
              title='Send'
            ></Button>
            <ToggleSwitch
              switchFlipped={this.handleSwitchFlip}
              title='Auto Send After: ". ? !"'
            ></ToggleSwitch>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatroom;
