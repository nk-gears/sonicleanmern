import React, { useEffect, useState, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, loginResetState } from 'modules/auth';
import { Link } from 'react-router-dom';

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
import officialnav from '../../_officialnav';
// routes config
import routes from '../../Routes/routes';
import { getUploadedImage } from '_helpers/helper';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = ({
  accountData,
  uploadState,
  userPhoto,
  user,
  userLogout,
  resetState,
}) => {
  // class DefaultLayout extends Component {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  const [nav, setNav] = useState(navigation);

  useEffect(() => {
    let n = navigation.items.map(item => {
      if (item.name === 'Sales') {
        item.url = `/sales/${user.id}`;
      }
      if (item.name === 'Settings') {
        item.url = `/profile/account/${user.id}`;
      }
      if (item.name === 'Orders') {
        item.url = `/orders/${user.id}`;
      }
      return item;
    });
    let dn = {};
    dn.items = n;
    setNav(dn);
  }, []);

  const signOut = e => {
    e.preventDefault();
    userLogout();
  };

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader>
            <img
              src={
                user.userPhoto === undefined
                  ? require('../../assets/img/emptylogo.png')
                  : getUploadedImage(user.userPhoto)
              }
              className="img-avatar"
              alt="Avatar"
            ></img>
            <div>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </div>
            <h6 className="text-muted font-weight-normal">
              {user.companyName}
            </h6>
          </AppSidebarHeader>
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav
              navConfig={user.roles === 'official' ? officialnav : nav}
            />
            <Link
              style={{ width: '100%' }}
              to="#"
              className="nav-link"
              onClick={e => signOut(e)}
            >
              {' '}
              <i className="nav-icon fa fa-lock"></i> Logout{' '}
            </Link>
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container fluid className="mt-4 mb-4">
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect
                  from="/"
                  to={
                    user.roles === 'official' ? '/dealers' : `/sales/${user.id}`
                  }
                />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>{/* <DefaultAside /> */}</Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

const mapStateToProps = ({ account, auth }) => {
  const { accountData, uploadState, userPhoto } = account;
  const { user } = auth;
  return { accountData, uploadState, userPhoto, user };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => {
      dispatch(logout());
    },
    resetState: () => {
      dispatch(loginResetState());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null)(DefaultLayout)
);
