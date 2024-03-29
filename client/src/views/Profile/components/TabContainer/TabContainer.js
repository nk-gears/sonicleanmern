import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import Account from '../Account';
import Company from '../Company';
import PaymentMethods from '../PaymentMethods';
import Users from '../Users';
import StoreLocations from '../StoreLocations';
import './TabContainer.scss';

const TabContainer = ({ location, accountData }) => {
  const isPath = path => location.pathname.substr(0, path.length) === path;

  return (
    <div className="TabContainer">
      <Card className="pt-2">
        <CardBody>
          <section>
            <Nav pills className="Tabs text-info">
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/profile/account/${accountData._id}`}
                  active={isPath('/profile/account')}
                >
                  My Account
                </NavLink>
              </NavItem>
              {accountData.roles === 'dealer' ? (
                <>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={`/profile/company/${accountData._id}`}
                      active={isPath('/profile/company')}
                    >
                      Company Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={`/profile/users/${accountData._id}`}
                      active={isPath('/profile/users')}
                    >
                      Users
                    </NavLink>
                  </NavItem>
                </>
              ) : null}
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/profile/store/${accountData._id}`}
                  active={isPath('/profile/store')}
                >
                  Store Locations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/profile/billing/${accountData._id}`}
                  active={isPath('/profile/billing')}
                >
                  Payment Methods
                </NavLink>
              </NavItem>
              {/* <NavItem>
                                <NavLink tag={Link} to="/profile/active" active={isPath('/profile/active')} >
                                    Activity Log
                                </NavLink>
                            </NavItem> */}
            </Nav>
          </section>
          <Switch>
            <Redirect exact from="/profile/:id" to="/profile/account/:id" />
            <Route exact path="/profile/account/:id" component={Account} />
            <Route exact path="/profile/company/:id" component={Company} />
            <Route
              exact
              path="/profile/billing/:id"
              component={PaymentMethods}
            />
            <Route exact path="/profile/users/:id" component={Users} />
            <Route exact path="/profile/store/:id" component={StoreLocations} />
          </Switch>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ account }) => {
  const { accountData, state } = account;
  return { accountData, state };
};

export default withRouter(connect(mapStateToProps, null)(TabContainer));
