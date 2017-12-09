import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import {
  fetchChatRooms,
  createChatRoom
} from '../../actions/chat-room';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoom from '../../components/SideDrawer/ChatRoom';
import CreateChatRoomModal from '../../components/SideDrawer/CreateChatRoomModal';
import '../../styles/SideDrawer.scss';

class SideDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }
  componentWillMount() {
    const {
      user,
      fetchChatRooms
    } = this.props;

    fetchChatRooms(user.userData._id);
  }
  handleComponent() {
    const { chatRoom } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      return (
        <div className="chat-room-list">
          {
            chatRoom.chatRooms.map((chatRoomData, i) =>
              <ChatRoom
                key={i}
                chatRoomData={chatRoomData}
              />
            )
          }
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  handleActivateModal() {
    this.setState({showModal: true});
  }
  handleDeactivateModal() {
    this.setState({showModal: false});
  }
  render() {
    const {
      user,
      chatRoom,
      fetchChatRooms,
      createChatRoom,
      isOpen
    } = this.props;
    const { showModal } = this.state;

    return (
      <Menu isOpen={isOpen}>
        <div className="side-drawer">
          <h1 className="title">Chat App</h1>
          <div className="chat-rooms-options">
            <h3>Chat Rooms</h3>
            <div className="add-chat-room-icon" onClick={::this.handleActivateModal}>
              <FontAwesome name="plus-circle" />
            </div>
          </div>
          {::this.handleComponent()}
        </div>
        {
          showModal &&
          <CreateChatRoomModal
            handleDeactivateModal={::this.handleDeactivateModal}
            handleAddChatRoom={createChatRoom}
            userData={user.userData}
            isLoading={chatRoom.isLoading}
          />
        }
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchChatRooms,
    createChatRoom
  }, dispatch);
}

SideDrawer.propTypes = {
  isOpen: PropTypes.bool
}

SideDrawer.defaultProps = {
  isOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);