import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  localLogin,
  facebookLogin,
  googleLogin,
  twitterLogin,
  instagramLogin,
  linkedinLogin
} from "../../actions";
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';
import {
  LocalLogin,
  FacebookLogin,
  GoogleLogin,
  TwitterLogin,
  InstagramLogin,
  LinkedInLogin,
  GitHubLogin
} from '../../components';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLocalLogin = this.handleLocalLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleTwitterLogin = this.handleTwitterLogin.bind(this);
    this.handleInstagramLogin = this.handleInstagramLogin.bind(this);
    this.handleLinkedInLogin = this.handleLinkedInLogin.bind(this);
  }
  handleLocalLogin(data) {
    this.props.dispatch(localLogin(data));
  }
  handleFacebookLogin() {
    this.props.dispatch(facebookLogin());
  }
  handleGoogleLogin() {
    this.props.dispatch(googleLogin());
  }
  handleTwitterLogin() {
    this.props.dispatch(twitterLogin());
  }
  handleInstagramLogin() {
    this.props.dispatch(instagramLogin());
  }
  handleLinkedInLogin() {
    this.props.dispatch(linkedinLogin());
  }
  render() {
    const {
      handleLocalLogin,
      handleFacebookLogin,
      handleGoogleLogin,
      handleTwitterLogin,
      handleInstagramLogin,
      handleLinkedInLogin
    } = this;

    return (
      <div className="login-form">
        <Container fluid={true}>
          <Row>
            <Col md="4" md-offset="4" sm="8" sm-offset="2">
              <Row>
                <Col md="12">
                  <h1 className="mui--text-center">Chat App</h1>
                </Col>
                <Col md="12">  
                  <LocalLogin handleLocalLogin={handleLocalLogin} />
                </Col>  
                <Col md="12">
                  <FacebookLogin handleFacebookLogin={handleFacebookLogin} />
                </Col>  
                <Col md="12">
                  <GoogleLogin handleGoogleLogin={handleGoogleLogin} />
                </Col>  
                <Col md="12">
                  <TwitterLogin handleTwitterLogin={handleTwitterLogin} /> 
                </Col>
                <Col md="12">
                  <InstagramLogin handleInstagramLogin={handleInstagramLogin} />
                </Col>
                <Col md="12">
                  <LinkedInLogin handleLinkedInLogin={handleLinkedInLogin} />
                </Col>
                <Col md="12">
                  <GitHubLogin />
                </Col>
                <Col md="12">
                  <Divider className="line" />
                </Col>
                <Col md="12">
                  <Link to="/register">
                    <Button
                      className="button button-register"
                      color="primary"
                      size="large"
                      variant="raised"
                    >
                      Register
                    </Button>
                  </Link>  
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>  
    ) 
  }
}

const mapStateToProps = (state) => {  
  return {
    localLogin: state.localLogin,
    facebookLogin: state.facebookLogin,
    googleLogin: state.googleLogin,
    twitterLogin: state.twitterLogin,
    instagramLogin: state.instagramLogin,
    linkedinLogin: state.linkedinLogin
  }
}

export default connect(
  mapStateToProps
)(Login);