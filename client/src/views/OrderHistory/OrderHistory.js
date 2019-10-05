import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Card, CardBody, Badge, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { fetchOrderHistoryList } from "../../modules/OrderHistory";
import { REQUEST_STATUS } from '_config/constants'
import LoadingIndicator from 'common/LoadingIndicator'
import data from './_data';

const table = data.rows

 const options = {
    sortIndicator: true,
    hideSizePerPage: true,
    paginationSize: 3,
    hidePageListOnlyOnePage: false,
    clearSearch: false,
    alwaysShowAllBtns: true,
    withFirstAndLast: false
}

const OrderHistory = ({ history, getOrderHistoryList, orderhistorylist, state }) => {

    useEffect(() => {
        getOrderHistoryList('', 20)
    }, [])

    const statusFormatter = (cell, row) => {
        switch(cell) {
            case 'Pending': return <Badge color="warning">Pending</Badge>; break;
            case 'Shipped': return <Badge color="success">Shipped</Badge>; break;
        }
    }

    const actionFormatter  = (cell, row) => {
        return (
            <>
                <Button onClick={() => history.push(`/order-detail/${row.ordernumber}`)} color="success" size="sm">view recepit</Button>
                <Button color="primary" size="sm" className="ml-1" >Detail</Button>
            </>
        )
    }


    return (
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    {
                        state===REQUEST_STATUS.INITIAL || state===REQUEST_STATUS.PENDING ? 
                        <LoadingIndicator /> :
                        <BootstrapTable data={orderhistorylist} version="4" striped pagination search options={options}>
                            <TableHeaderColumn isKey={true} dataField="ordernumber" dataSort>Order Number</TableHeaderColumn>
                            <TableHeaderColumn dataField="date" dataSort>Order Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="ordertype" dataAlign='right' dataSort>Order Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="status" dataAlign='right' dataSort>Payment Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="deliverystatus" dataSort dataFormat={statusFormatter} dataAlign='right' >Shipping Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="total" dataSort dataAlign='right'>Total</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" dataFormat={actionFormatter} dataAlign='right' >Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                    
                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ orderhistory }) => {
    const { orderhistorylist, state } = orderhistory;
    return { orderhistorylist, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderHistoryList: (s, p) => {
            dispatch(fetchOrderHistoryList(s, p));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(OrderHistory);
