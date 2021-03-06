import React, {Component} from 'react';
import Message            from './Message.jsx';

export default class MessageList extends Component {

  render() {
    const messageItem = this.props.messages.map((message, id) => {
      return <Message key={id} message={message} />
    });

    return (
      <div className="messages">
        {messageItem}
      </div>
    )
  }
}

