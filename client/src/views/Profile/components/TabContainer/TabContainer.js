import React from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap'
import Account from '../Account'
import Company from '../Company'
import PaymentMethods from '../PaymentMethods'
import Users from '../Users'
import StoreLocations from '../StoreLocations'

import './TabContainer.scss'

const TabContainer = ({location}) => {

    const isPath = (path) => location.pathname.substr(0, path.length) === path

    return (
        <div className="TabContainer">
            <Card className="pt-2">
                <CardBody>
                    <section>
                        <Nav pills className="Tabs text-info">
                            <NavItem>
                                <NavLink tag={Link} to="/profile/account" active={true} active={isPath('/profile/account')}>
                                    My Account
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile/company" active={isPath('/profile/company')} >
                                    Company Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile/users" active={isPath('/profile/users')} >
                                    Users
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile/store" active={isPath('/profile/store')} >
                                    Store Locations
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile/billing" active={isPath('/profile/billing')} >
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
                        <Redirect exact from="/profile" to="/profile/account" />
                        <Route exact path="/profile/account" component={Account} />
                        <Route exact path="/profile/company" component={Company} />
                        <Route exact path="/profile/billing" component={PaymentMethods} />
                        <Route exact path="/profile/users" component={Users} />
                        <Route exact path="/profile/store" component={StoreLocations} />
                    </Switch>
                </CardBody>
            </Card>
        </div>
    )
}

export default withRouter(TabContainer)
