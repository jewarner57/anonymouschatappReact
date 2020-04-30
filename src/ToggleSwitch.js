import React from 'react';

export default class ToggleSwitch extends React.Component {
  render() {
    return (
      <div className='toggleSwitchContainer'>
        <p className='toggleSwitchTitle'>{this.props.title}</p>
        <div>
          <label className='switch'>
            <input type='checkbox' onChange={this.props.switchFlipped}></input>
            <span className='slider round'></span>
          </label>
        </div>
      </div>
    );
  }
}
