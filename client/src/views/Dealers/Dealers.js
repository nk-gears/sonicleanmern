import React, { useEffect, createRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { REQUEST_STATUS } from '_config/constants';
import ConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DealerFilter from './components/DealerFilter';
import {
  fetchDealersList,
  deleteDealerById,
  dealerActivationRequest,
} from '../../modules/official';

import './Dealers.scss';

const Dealers = ({
  history,
  getDealersList,
  deleteDear,
  dealersList,
  dealerActivation,
  totalCount,
  currentPage,
  sizePerPage,
  state,
}) => {
  const BootstrapTableRef = createRef();

  const [pageSize, setPageSize] = useState(5);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (dealersList.length === 0) getDealersList(1, 5, email);
  }, [dealersList]);

  const actionFormatter = (cell, row) => {
    return (
      <>
        <Button
          onClick={() => history.push(`/sales/${row._id}`)}
          color="primary"
          size="sm"
        >
          Order
        </Button>
        <Button
          onClick={() => history.push(`/profile/account/${row._id}`)}
          className="ml-1 mr-1"
          color="success"
          size="sm"
        >
          Detail
        </Button>
        <ConfirmationModal
          text="Delete"
          size="sm"
          color="danger"
          header="Activation"
          onClickFunc={() => deleteDear(row._id)}
        />
      </>
    );
  };

  const onPageChange = (page, sizePerPage) => {
    let oldPageSize = BootstrapTableRef.current.getSizePerPage(),
      isActualPageChange = oldPageSize === sizePerPage;
    if (isActualPageChange) getDealersList(page, sizePerPage, email);
  };

  const verifiedFormatter = (cell, row) => {
    if (cell) {
      return (
        <h6>
          <Badge color="success" pill>
            Verified
          </Badge>
        </h6>
      );
    } else {
      return (
        <ConfirmationModal
          text={row.passwordResetToken !== '' ? 'Resend' : 'Active'}
          size="sm"
          color="danger"
          header="Activation"
          onClickFunc={() => dealerActivation(row._id)}
        />
      );
    }
  };

  const onSizePerPageList = sizePerPage => {
    setPageSize(sizePerPage);
    getDealersList(1, sizePerPage, email);
  };

  // const dateFormatter = (cell, row) => {
  //     return moment(cell).format("MM/DD/YY hh:mm A")
  // }

  const nameFormatter = (cell, row) => {
    return row.firstName + ' ' + row.lastName;
  };

  const onSearch = value => {
    setEmail(value);
    getDealersList(1, sizePerPage, value);
  };

  return (
    <div className="animated fadeIn dealers">
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <Col xs={4}>
              <h5 className="font-weight-normal">Dealers</h5>
            </Col>
            <Col>
              <DealerFilter searchEmailFilter={onSearch} />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {state === REQUEST_STATUS.INITIAL ||
          state === REQUEST_STATUS.PENDING ? (
            <LoadingIndicator />
          ) : (
            <BootstrapTable
              ref={BootstrapTableRef}
              remote
              bootstrap4
              data={dealersList}
              pagination
              options={{
                sizePerPage: sizePerPage,
                onPageChange: onPageChange,
                sizePerPageList: [5, 10, 15, 20, 25],
                page: currentPage,
                onSizePerPageList: onSizePerPageList,
              }}
              hover
              condensed
              fetchInfo={{ dataTotalSize: totalCount * sizePerPage }}
            >
              <TableHeaderColumn
                isKey={true}
                dataField="firstName"
                dataFormat={nameFormatter}
                dataSort
              >
                Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort>
                Email
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="companyName"
                dataAlign="right"
                dataSort
              >
                Company
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="mohawkAccount"
                dataAlign="right"
                dataSort
                width="10%"
              >
                Mohawk Account
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="mohawkBrand"
                dataAlign="right"
                dataSort
                width="10%"
              >
                mohawk Brand
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="isVerified"
                dataFormat={verifiedFormatter}
                dataSort
                dataAlign="right"
                width="10%"
              >
                Verified
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="action"
                dataFormat={actionFormatter}
                dataAlign="right"
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ official, account }) => {
  const { dealersList, totalCount, state, currentPage, sizePerPage } = official;
  const { accountData } = account;
  return {
    dealersList,
    totalCount,
    state,
    currentPage,
    sizePerPage,
    accountData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDealersList: (page, size, email) => {
      dispatch(fetchDealersList(page, size, email));
    },
    deleteDear: id => {
      dispatch(deleteDealerById(id));
    },
    dealerActivation: id => {
      dispatch(dealerActivationRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealers);
