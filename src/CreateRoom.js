import React from 'react';
import './App.css';
import Button from './Button';
import Chatroom from './Chatroom';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props,
      activePage: 'enterSettings',
      pass: '',
      mau: '10',
      roomAddress: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    let maxUsers = this.state.mau;

    if (isNaN(this.state.mau)) {
      maxUsers = 10;
    }

    this.props.socket.emit('createNewChatroom', {
      password: this.state.pass,
      maxUsers: maxUsers,
    });
  }

  componentDidMount() {
    this.props.socket.on('recieveChatroomCode', (connectInfo) => {
      this.setState(
        { roomID: connectInfo.id, roomAddress: connectInfo.roomAddress },
        () => {
          this.setState({ activePage: 'chatroom' }, () => {
            this.props.socket.emit('getRoomPopulation', {
              roomAddress: this.state.roomAddress,
              roomID: this.state.roomID,
            });
          });
        }
      );
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div className='page-body'>
        {this.state.activePage === 'enterSettings' ? (
          <div>
            <p>Create New Room</p>

            <form className='form-container'>
              <div>
                <label htmlFor='pass'>Password:</label>
                <input
                  type='text'
                  id='pass'
                  onChange={this.handleChange}
                  value={this.state.pass}
                ></input>
              </div>
              <div>
                <label htmlFor='mau'>Max Allowed Users:</label>
                <input
                  type='text'
                  id='mau'
                  onChange={this.handleChange}
                  value={this.state.mau}
                ></input>
              </div>
            </form>
            <Button
              title='Create'
              buttonClicked={this.handleClick}
              destination='chatroom'
            ></Button>
          </div>
        ) : this.state.activePage === 'chatroom' ? (
          <Chatroom
            socket={this.props.socket}
            title={this.state.roomID}
            onSend={'sendPrivateMessage'}
            roomID={this.state.roomID}
            roomAddress={this.state.roomAddress}
            onRecieve={'recieve' + this.state.roomAddress}
            myUsername={this.props.myUsername}
          ></Chatroom>
        ) : null}
      </div>
    );
  }
}

export default CreateRoom;
