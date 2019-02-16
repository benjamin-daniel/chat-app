import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { UserForm } from '../Partial';
import { MenuButton } from '../../components/MenuButton';
import { Alert } from '../../../components/Alert';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    ::this.handleFetchSelectedtUser();
  }
  handleFetchSelectedtUser() {
    const {
      match,
      fetchSelectedUser
    } = this.props;
    const userID = match.params.userID;

    fetchSelectedUser(userID);
  }
  render() {
    const { user } = this.props;

    return (
      <div className="create-user-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <MenuButton label="Create New" link="/create-user" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              {
                ( user.edit.success || user.edit.error ) &&
                <Alert label={user.edit.message} type={(user.edit.success ? 'success' : 'error')} />
              }
            </Col>
          </Row>
          <UserForm mode="edit" />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
