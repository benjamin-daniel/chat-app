import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'react-emojione';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plyr from 'react-plyr';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import Avatar from '../../Avatar';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  isDatesSameDay(d1, d2) {
    if (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    ) {
      return true
    }

    return false;
  }
  isMessageToday() {
    const { message } = this.props;
    const messageDate = new Date(message.createdAt);
    const todayDate = new Date();

    if ( messageDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0) ) {
      return true;
    }

    return false;
  }
  handleMessageText() {
    const {
      message,
      isSender
    } = this.props;
    var messageText = message.text;

    switch (message.messageType) {
      case 'text':
        const options = {
          style: {
            height: 25,
            width: 25
          }
        };

        messageText = messageText.replace(/ /g, "\u00a0");
        messageText = emojify(messageText, options);
        break;
      case 'file':
        messageText = '<a download="' + messageText + '" href="' + message.fileLink + '" target="_blank">' + messageText + '</a>';
        messageText = ReactHtmlParser(messageText);
        break;
      case 'image':
        messageText = '<img class="image-message" src="' + message.fileLink + '" />';
        messageText = ReactHtmlParser(messageText);
        break;
      case 'audio':
        messageText = '';
        break
    }

    return messageText;
  }
  handleChatBubbleRender() {
    const {
      index,
      message,
      isSender
    } = this.props;

    if ( message.messageType !== 'text' && message.fileLink.length === 0 ) {
      return (
        <div className="uploading-icon">
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      )
    } else {
      return (
        <div className="chat-message">
          <div
            className={(message.messageType !== 'image' ? 'chat-bubble ' : 'chat-image ') + (isSender ? 'right' : '')}
            onClick={(e) => {message.messageType === 'image' ? ::this.handleImageClick(e) : false }}
          >
            <div className="chat-text">
              {
                message.messageType === 'file' &&
                <div className="file-icon">
                  <FontAwesomeIcon icon="file" />
                </div>
              }
              {
                message.messageType === 'audio' &&
                <Plyr
                  className={"react-plyr-" + index}
                  type="audio"
                  url={message.fileLink}
                  volume={1}
                  onPlay={::this.handleAudioOnPlay}
                />
              }
              {::this.handleMessageText()}
            </div>
          </div>
        </div>
      )
    }
  }
  handleImageClick(event) {
    event.preventDefault();

    const {
      message,
      handleImageLightboxToggle
    } = this.props;

    handleImageLightboxToggle(message._id);
  }
  handleAudioOnPlay(event) {
    const {
      index,
      handleAudioPlayingToggle
    } = this.props;

    handleAudioPlayingToggle(index);
  }
  render() {
    const {
      message,
      isSender,
      previousMessageSenderID,
      nextMessageSenderID,
      previousMessageDate,
      nextMessageDate
    } = this.props;
    const d1 = new Date(message.createdAt);
    const d2 = new Date(previousMessageDate);
    const d3 = new Date(nextMessageDate);
    const isThisAndPreviousDatesSameDay = ::this.isDatesSameDay(d1, d2);
    const isThisAndNextDatesSameDay = ::this.isDatesSameDay(d1, d3);
    const isPreviousMessageSameSender = isThisAndPreviousDatesSameDay && message.user._id === previousMessageSenderID;
    const isNextMessageSameSender = isThisAndNextDatesSameDay && message.user._id === nextMessageSenderID;

    return (
      <div
        className={
          "chat-bubble-wrapper " +
          (isSender ? 'reverse ' : '') +
          (isPreviousMessageSameSender ? 'no-b-radius-top ' : '') +
          (isNextMessageSameSender ? 'no-b-radius-bottom ' : '') +
          (!isSender && isPreviousMessageSameSender ? 'no-avatar' : '')
        }
      >
        {
          !isSender &&
          !isPreviousMessageSameSender &&
          <Avatar
            image={message.user.profilePicture}
            size="35px"
            title={message.user.name}
            accountType={message.user.accountType}
            badgeCloser
          />
        }
        <div className="chat-details">
          {
            !isSender &&
            !isPreviousMessageSameSender &&
            <div className="chat-user-name">{message.user.name}</div>
          }
          {::this.handleChatBubbleRender()}
          {
            !message.isSending &&
            message.createdAt &&
            ::this.isMessageToday() &&
            <div className="chat-time">
              <TimeAgo
                date={moment(message.createdAt).format("MMM D, YYYY h:mm:ss A")}
                title={moment(message.createdAt).format("dddd - MMM D, YYYY - h:mm A")}
                minPeriod={60}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

ChatBubble.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
  isSender: PropTypes.bool.isRequired,
  previousMessageSenderID: PropTypes.string.isRequired,
  nextMessageSenderID: PropTypes.string.isRequired,
  previousMessageDate: PropTypes.string.isRequired,
  nextMessageDate: PropTypes.string.isRequired,
  handleImageLightboxToggle: PropTypes.func.isRequired,
  handleAudioPlayingToggle: PropTypes.func.isRequired
}

export default ChatBubble;
