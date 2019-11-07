import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout, loginResetState } from "modules/auth";
import { Link } from 'react-router-dom'
import { 
  fetchAccountData
} from 'modules/account'
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../Routes/routes';
import {getUploadedImage} from '_helpers/helper'

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  componentDidMount = () => {
    this.props.fetchAccount()
  }

  signOut(e) {
    e.preventDefault()
    this.props.userLogout()
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader >
              <img src={this.props.userPhoto===undefined ? require('../../assets/img/emptylogo.png') : getUploadedImage(this.props.userPhoto)} className="img-avatar" alt="Avatar"></img>
              <div><strong>{this.props.accountData.firstName} {this.props.accountData.lastName}</strong></div>
              <h6 className="text-muted font-weight-normal">{this.props.accountData.companyName}</h6>
            </AppSidebarHeader>
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
              <div >
                <Link style={{ width: "100%" }} to="#" className="nav-link" onClick={e => this.signOut(e)}> <i className="nav-icon fa fa-lock" ></i> Logout </Link>
              </div>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid className="mt-4 mb-4">
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/sales" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              {/* <DefaultAside /> */}
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}


const mapStateToProps = ({ account }) => {
  const { accountData, uploadState, userPhoto } = account;
  return { accountData, uploadState, userPhoto };
}


const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => {
      dispatch(logout());
    },
    resetState: () => {
      dispatch(loginResetState())
    },
    fetchAccount: () => {
      dispatch(fetchAccountData())
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null
  )(DefaultLayout)
);
