import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Route } from 'react-router';
import mapDispatchToProps from '../actions';
import Head from '../../components/Head';
import { Menu } from './Partial';
import {
  Header,
  LeftSideDrawer,
  Footer
} from './Common';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import '../styles/Admin.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLeftSideDrawerOpen: false
    };
  }
  componentWillMount() {
    const {
      fetchActiveUser
    } = this.props;

    fetchActiveUser();
    document.body.className = '';
    document.body.classList.add('admin-page');
  }
  handleLeftSideDrawerRender() {
    const { isLeftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              isLeftSideDrawerOpen={matches ? isLeftSideDrawerOpen : true}
              noOverlay={matches ? false : true}
            >
              <Menu handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent} />
            </LeftSideDrawer>
          )
        }}
      </MediaQuery>
    )
  }
  handleLeftSideDrawerToggleEvent(openTheDrawer=false) {
    this.setState({isLeftSideDrawerOpen: openTheDrawer});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({isLeftSideDrawerOpen: state.isOpen});
  }
  handleComponentRender(matchProps) {
    const {
      component: Content,
      title,
      user
    } = this.props;

    return (
      <div className="admin-section">
        <Head title={"Chat App " + (title.length > 0 ? '| ' + title : '')} />
        {
          !user.fetchActive.loading && user.fetchActive.success
            ?
            <div>
              {::this.handleLeftSideDrawerRender()}
              <Header handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}>
                <div className="page-title">
                  {title}
                </div>
              </Header>
              <div className="admin-content">
                <Content {...matchProps} />
              </div>
              <Footer />
            </div>
            :
            <LoadingAnimation name="ball-pulse-sync" color="#26a69a" fullScreen />
        }
      </div>
    )
  }
  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={::this.handleComponentRender} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  title: PropTypes.string
}

Layout.defaultProps = {
  title: ''
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
