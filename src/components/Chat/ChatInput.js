import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'muicss/react';
import { Input } from 'muicss/react';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      typing: false
    };
  }
  onMessageChange(event) {
    event.preventDefault();

    const { 
      userData,
      activeChatRoom,
      socket
    } = this.props;
    const { typing } = this.state;
    const messageValue = event.target.value;

    this.setState({message: messageValue});

    if ( (messageValue.length > 0) && (!typing) ) {
      socket.emit('typing', userData.username, activeChatRoom);
      this.setState({typing: true});
    }

    if ( (messageValue.length === 0) && (typing) ) {
      socket.emit('not typing', userData.username, activeChatRoom);
      this.setState({typing: false});
    }
  }
  handleSendMessage(event) {
    const { 
      userData,
      activeChatRoom,
      socket,
      handleSendMessage
    } = this.props;
    const { message } = this.state
    const data = {
      text: message.trim(),
      userID: userData._id,
      chatRoomID: activeChatRoom._id
    };

    if ( event.key === 'Enter' ) {
      handleSendMessage(data);
      socket.emit('new message', data, activeChatRoom);
      socket.emit('not typing', userData.username, activeChatRoom);
      this.setState({
        message: '',
        typing: false
      });
    }
  }
  render() {
    const { 
      message,
      typing
    } = this.state

    return (
      <div className="chat-input">
        <Container fluid={true}>
          <Input 
            hint="Type here"
            value={message}
            onChange={::this.onMessageChange}
            onKeyDown={::this.handleSendMessage}
          />
        </Container>
      </div>
    )
  }
}

ChatInput.propTypes={
  userData: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.bool.isRequired,
  socket: PropTypes.object.isRequired,
  handleSendMessage: PropTypes.func.isRequired
}

export default ChatInput;