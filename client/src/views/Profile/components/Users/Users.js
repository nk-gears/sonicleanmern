import React, { useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { connect } from 'react-redux';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';
import AddNewUserModal from 'components/AddNewUserModal/AddNewUserModal';
import { fetchUsers, deleteUserRequest } from 'modules/Users';
import { REQUEST_STATUS } from '_config/constants';
import LoadingIndicator from 'components/common/LoadingIndicator';

import './Users.scss';

const Users = ({ fetchUsers, usersData, state, onDeleteUser, accountData }) => {
  useEffect(() => {
    fetchUsers(accountData._id);
  }, []);

  const deleteUser = (id, dealer) => {
    console.log(id, dealer);
    onDeleteUser(id, dealer);
  };

  return (
    <div className="Users mt-5 mb-5">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="font-weight-normal">User Management</h5>
              <AddNewUserModal state={state} />
            </CardHeader>
            <CardBody>
              {state === REQUEST_STATUS.PENDING ? (
                <LoadingIndicator />
              ) : (
                <Table responsive className="table-hover ">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th className="text-right">Permission Level</th>
                      <th className="text-right">Verification</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>
                          <td>{item.email}</td>
                          <td className="text-right">{item.roles}</td>
                          <td className="text-right">
                            {item.isVerified ? 'true' : 'false'}
                          </td>
                          <td className="text-right">
                            <ConfirmationModal
                              text="Delete"
                              size="md"
                              color="danger"
                              header="Activation"
                              onClickFunc={() =>
                                deleteUser(item._id, accountData._id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ users, account }) => {
  const { accountData } = account;
  const { usersData, isSubmitSuccess, addUserState, state } = users;
  return { usersData, isSubmitSuccess, addUserState, state, accountData };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: id => {
      dispatch(fetchUsers(id));
    },
    onDeleteUser: (id, dealer) => {
      dispatch(deleteUserRequest(id, dealer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Users);
