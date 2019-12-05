import React, { useEffect, createRef, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import XLSX from 'xlsx';
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Row,
  Col,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
} from 'react-bootstrap-table2-paginator';
import filterFactory, {
  textFilter,
  dateFilter,
  selectFilter,
  numberFilter,
} from 'react-bootstrap-table2-filter';
import { fetchOrderHistoryList } from '../../modules/OrderHistory';
import { REQUEST_STATUS } from '_config/constants';
import LoadingIndicator from 'components/common/LoadingIndicator';
import OrderFilter from './components/OrderFilter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './Orders.scss';

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <div className="btn-group" role="group">
    {options.map(option => {
      const isSelect = currSizePerPage === `${option.page}`;
      return (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? 'btn-secondary' : 'btn-primary'}`}
        >
          {option.text}
        </button>
      );
    })}
  </div>
);

const OrdersList = ({
  history,
  getOrderHistoryList,
  orderhistorylist,
  totalCount,
  currentPage,
  sizePerPage,
  accountData,
  state,
  user,
}) => {
  const BootstrapTableRef = createRef();

  const [pageSize, setPageSize] = useState(10);
  const [orderType, setOrderType] = useState('ALL');
  const [orderStatus, setOrderStatus] = useState('ALL');
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [filteredData, setFilteredData] = React.useState([]);

  function patchFilterFactory(filterFactory, onFilteredData) {
    return (...args) => {
      const { createContext, options } = filterFactory(...args);
      return {
        createContext: (...args) => {
          const { Provider: BaseProvider, Consumer } = createContext(...args);
          const Provider = class FilterProvider extends BaseProvider {
            componentDidUpdate() {
              onFilteredData(this.data);
            }
          };
          return { Provider, Consumer };
        },
        options,
      };
    };
  }

  const factory = patchFilterFactory(filterFactory, data => {
    setFilteredData(prevData => {
      if (JSON.stringify(prevData) !== JSON.stringify(data)) {
        return data;
      }

      return prevData;
    });
  });

  useEffect(() => {
    getOrderHistoryList(
      1,
      pageSize,
      orderType,
      orderStatus,
      dateFrom,
      dateTo,
      user.roles === 'dealer' ? accountData._id : null
    );
  }, []);

  const onChangeFilterOptions = (
    orderType,
    orderStatus,
    date_from,
    date_to
  ) => {
    setDateFrom(date_from);
    setDateTo(date_to);
    setOrderType(orderType);
    setOrderStatus(orderStatus);
    getOrderHistoryList(
      1,
      pageSize,
      orderType,
      orderStatus,
      date_from,
      date_to,
      accountData._id
    );
  };

  const actionFormatter = (cell, row) => {
    return (
      <>
        <Button
          onClick={() => history.push(`/order/${row._id}`)}
          color="success"
          size="sm"
        >
          Details
        </Button>
      </>
    );
  };

  const paymentFormatter = (cell, row) => {
    if (cell === 'stripe' && row.success_code) {
      return (
        <h5>
          <Badge color="primary" pill>
            Paid
          </Badge>
        </h5>
      );
    } else if (cell === 'mohawk' && row.success_code) {
      return (
        <h5>
          <Badge color="warning" pill>
            Mohawk
          </Badge>
        </h5>
      );
    }
  };

  // const onPageChange = (page, sizePerPage) => {
  //   let oldPageSize = BootstrapTableRef.current.getSizePerPage(),
  //     isActualPageChange = oldPageSize === sizePerPage;
  //   if (isActualPageChange)
  //     getOrderHistoryList(
  //       page,
  //       sizePerPage,
  //       orderType,
  //       orderStatus,
  //       dateFrom,
  //       dateTo,
  //       accountData._id
  //     );
  // };

  // const onSizePerPageList = sizePerPage => {
  //   setPageSize(sizePerPage);
  //   getOrderHistoryList(
  //     1,
  //     sizePerPage,
  //     orderType,
  //     orderStatus,
  //     dateFrom,
  //     dateTo,
  //     accountData._id
  //   );
  // };

  const shippingFormatter = (cell, row) => {
    if (cell === 'new' || cell === 'at_wms') {
      return (
        <h5>
          <Badge color="info" className="text-white">
            In Process
          </Badge>
        </h5>
      );
    } else if (cell === 'shipped') {
      return (
        <h5>
          <Badge color="success" className="text-white">
            Shipped
          </Badge>
        </h5>
      );
    } else {
      return (
        <h5>
          <Badge color="secondary" className="text-white">
            {cell}
          </Badge>
        </h5>
      );
    }
  };

  const dateFormatter = (cell, row) => {
    return moment(cell).format('MM/DD/YY HH:MM A');
  };

  const onExportFile = () => {
    let data = filteredData.length === 0 ? orderhistorylist : filteredData;
    let orders = [
      [
        'Order Number',
        'Order Date',
        'Company',
        'Mohawk Account #',
        'Promo Code',
        'Promo Code Value',
        'Total',
        'First Name',
        'Last Name',
        'Shipping Add. 1',
        'Shipping Add. 2',
        'Shipping City',
        'Shipping State',
        'Shipping Zip Code',
        'Phone Number',
        'Email',
        'Payment Status',
        'Payment Type',
        'Shipping Status',
      ],
    ];
    data.forEach(order => {
      let orderArray = [
        order.cust_ref,
        order.created,
        order.ship_company,
        accountData.mohawkAccount,
        '',
        '',
        order.sub_total,
        order.ship_first_name,
        order.ship_last_name,
        order.ship_address_1,
        order.ship_address_2,
        order.ship_city,
        order.ship_state,
        order.ship_zip,
        order.ship_phone,
        order.ship_e_mail,
        'Paid',
        'Credit/Debit Card',
        order.order_status === 'new' || order.order_status === 'at_wms'
          ? 'In Process'
          : order.order_status === 'shipped'
          ? 'Shipped'
          : order.order_status,
      ];
      orders.push(orderArray);
    });

    const wb = XLSX.utils.book_new();
    const wsAll = XLSX.utils.aoa_to_sheet(orders);

    var newDate = new Date();
    let filename =
      parseInt(newDate.getMonth() + 1) +
      '-' +
      newDate.getDate() +
      '-' +
      newDate.getFullYear() +
      '-' +
      newDate.getTime();

    XLSX.utils.book_append_sheet(wb, wsAll, 'All Users');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const PaidSelectOptionsArr = [
    {
      value: 'stripe',
      label: 'Paid',
    },
    {
      value: 'mohawk',
      label: 'Mohawk',
    },
  ];

  const ShippingSelectOptionsArr = [
    {
      value: 'new' || 'at_wms',
      label: 'In Process',
    },
    {
      value: 'shipped',
      label: 'Shipped',
    },
  ];

  const columns = [
    {
      dataField: 'cust_ref',
      text: 'Order Number#',
      headerStyle: () => {
        return { width: '15%' };
      },
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'created',
      text: 'Order Date',
      formatter: dateFormatter,
      align: 'right',
      headerAlign: 'right',
      headerStyle: () => {
        return { width: '20%' };
      },
      sort: true,
      filter: dateFilter(),
    },
    {
      dataField: 'ship_company',
      text: 'Dealer Company',
      align: 'right',
      headerAlign: 'right',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'mohawk_account',
      text: 'Mohawk Account',
      align: 'right',
      headerAlign: 'right',
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: 'payment_type',
      text: 'Payment Status',
      formatter: paymentFormatter,
      align: 'right',
      headerAlign: 'right',
      headerStyle: () => {
        return { width: '10%' };
      },
      sort: true,
      filter: selectFilter({
        options: PaidSelectOptionsArr,
      }),
    },
    {
      dataField: 'order_status',
      text: 'Shipping Status',
      formatter: shippingFormatter,
      align: 'right',
      headerAlign: 'right',
      headerStyle: () => {
        return { width: '10%' };
      },
      sort: true,
      filter: selectFilter({
        options: ShippingSelectOptionsArr,
      }),
    },
    {
      dataField: 'sub_total',
      text: 'Total',
      align: 'right',
      headerAlign: 'right',
      headerStyle: () => {
        return { width: '20%' };
      },
      sort: true,
      filter: numberFilter(),
    },
    {
      text: 'Action',
      formatter: actionFormatter,
      align: 'right',
      headerAlign: 'right',
      headerStyle: () => {
        return { width: '8%' };
      },
    },
  ];

  const options = {
    sizePerPageRenderer,
    totalSize: orderhistorylist.length,
  };

  return (
    <div className="animated fadeIn Orders">
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <Col xs={6}>
              <h5 className="font-weight-normal">Orders</h5>
            </Col>
            {/* <Col xs={8}>
              <OrderFilter changeFilterOptions={onChangeFilterOptions} />
            </Col> */}
            <Col xs={6}>
              <Button to="#" className="btn btn-sm btn-secondary float-right">
                <i className="fa fa-print"></i> Print
              </Button>
              <Button
                onClick={onExportFile}
                className="btn btn-sm btn-info mr-1 float-right"
              >
                <i className="fa fa-save"></i> Download Order Report
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {state === REQUEST_STATUS.INITIAL ||
          state === REQUEST_STATUS.PENDING ? (
            <LoadingIndicator />
          ) : (
            <>
              <PaginationProvider pagination={paginationFactory(options)}>
                {({ paginationProps, paginationTableProps }) => (
                  <div>
                    <PaginationTotalStandalone {...paginationProps} />
                    <BootstrapTable
                      bootstrap4
                      keyField="cust_ref"
                      data={orderhistorylist}
                      columns={columns}
                      filter={factory()}
                      filterPosition="top"
                      {...paginationTableProps}
                    />
                  </div>
                )}
              </PaginationProvider>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ orderhistory, account, auth }) => {
  const {
    orderhistorylist,
    totalCount,
    state,
    currentPage,
    sizePerPage,
  } = orderhistory;
  const { accountData } = account;
  const { user } = auth;
  return {
    orderhistorylist,
    totalCount,
    state,
    currentPage,
    sizePerPage,
    accountData,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistoryList: (
      page,
      size,
      orderType,
      orderStatus,
      date_from,
      date_to,
      id
    ) => {
      dispatch(
        fetchOrderHistoryList(
          page,
          size,
          orderType,
          orderStatus,
          date_from,
          date_to,
          id
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
