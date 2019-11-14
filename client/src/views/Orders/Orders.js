import React, { useEffect, createRef, useState } from 'react'
import { connect } from "react-redux";
import moment from 'moment'
import XLSX from 'xlsx'
import { Card, CardBody,CardHeader, Badge, Button, Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { fetchOrderHistoryList } from "../../modules/OrderHistory";
import { REQUEST_STATUS } from '_config/constants'
import LoadingIndicator from 'components/common/LoadingIndicator'
import OrderFilter from './components/OrderFilter'

import './Orders.scss'

const Orders = ({ 
    history, 
    getOrderHistoryList,
    orderhistorylist, 
    totalCount,
    currentPage,
    sizePerPage,
    accountData,
    state 
}) => {

    const BootstrapTableRef = createRef()

    const [pageSize, setPageSize] = useState(5)
    const [orderType, setOrderType] = useState('ALL')
    const [orderStatus, setOrderStatus] = useState('ALL')
    const [dateFrom, setDateFrom] = useState()
    const [dateTo, setDateTo] = useState()

    useEffect(() => {
        getOrderHistoryList(1, pageSize, orderType, orderStatus, dateFrom, dateTo, accountData._id)
    }, [])

    const onChangeFilterOptions = (orderType, orderStatus, date_from, date_to) => {
        setDateFrom(date_from)
        setDateTo(date_to)
        setOrderType(orderType)
        setOrderStatus(orderStatus)
        getOrderHistoryList(1, pageSize, orderType, orderStatus, date_from, date_to)
    }

    const actionFormatter  = (cell, row) => {
        return (
            <>
                <Button onClick={() => history.push(`/order/${row._id}`)} color="success" size="sm">view recepit</Button>
            </>
        )
    }

    const paymentFormatter = (cell, row) => {
        if(cell) {
            return  <h5><Badge color="primary" pill>Paid</Badge></h5>
        } else {
            return <h5><Badge color="danger" pill>UnPaid</Badge></h5>
        }
    }

    const onPageChange = (page, sizePerPage) => {
        let oldPageSize = BootstrapTableRef.current.getSizePerPage(),
        isActualPageChange = oldPageSize === sizePerPage
        if(isActualPageChange)
            getOrderHistoryList(page, sizePerPage, orderType, orderStatus, dateFrom, dateTo, accountData._id)
    }

    const onSizePerPageList = (sizePerPage) => {
        setPageSize(sizePerPage)
        getOrderHistoryList(1, sizePerPage, orderType, orderStatus, dateFrom, dateTo, accountData._id)
    }

    const shippingFormatter = (cell, row) => {
        if(cell==='new' || cell==='at_wms') {
            return <h5><Badge color="info" className="text-white">In Process</Badge></h5>
        } else if(cell==='shipped') {
            return <h5><Badge color="success" className="text-white">Shipped</Badge></h5>
        } else {
            return <h5><Badge color="secondary" className="text-white">{cell}</Badge></h5>
        }
    }

    const dateFormatter = (cell, row) => {
        return moment(cell).format("MM/DD/YY HH:MM a")
    }

    const onExportFile = () => {
        let orders = [[
            "Order Number", 
            "Order Date", 
            "Company", 
            "Mohawk Account #",
            "Promo Code",
            "Promo Code Value",
            "Total",
            "First Name",
            "Last Name",
            "Shipping Add. 1",
            "Shipping Add. 2",
            "Shipping City",
            "Shipping State",
            "Shipping Zip Code",
            "Phone Number",
            "Email",
            "Payment Status",
            "Payment Type",
            "Shipping Status"
        ]]
        orderhistorylist.forEach((order) => {
          let orderArray = [
                order.cust_ref, 
                order.created, 
                order.ship_company,
                accountData.mohawkAccount,
                "",
                "",
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
                "Paid",
                "Credit/Debit Card",
                order.order_status==='new' || order.order_status==='at_wms' ? 'In Process' : order.order_status==='shipped' ? 'Shipped' : order.order_status
            ]
          orders.push(orderArray)
        })
    
        const wb = XLSX.utils.book_new()
        const wsAll = XLSX.utils.aoa_to_sheet(orders)
        
        var newDate = new Date();
        let filename=parseInt(newDate.getMonth()+1)+'-'+newDate.getDate()+'-'+newDate.getFullYear()+'-'+newDate.getTime()

        XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
            XLSX.writeFile(wb, `${filename}.xlsx`)
    }

    return (
        <div className="animated fadeIn Orders">
            <Card>
                <CardHeader>
                    <Row className="align-items-center">
                        <Col xs={1}>
                            <h5 className="font-weight-normal">Orders</h5>
                        </Col>
                        <Col xs={8}>
                            <OrderFilter changeFilterOptions={onChangeFilterOptions} />
                        </Col>
                        <Col xs={3}>
                            <Button to="#" className="btn btn-sm btn-secondary float-right">
                                <i className="fa fa-print"></i> Print
                            </Button>
                            <Button onClick={onExportFile} className="btn btn-sm btn-info mr-1 float-right">
                                <i className="fa fa-save"></i> Download Order Report
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {
                        state===REQUEST_STATUS.INITIAL || state===REQUEST_STATUS.PENDING ? 
                        <LoadingIndicator /> : 
                        <BootstrapTable 
                        ref={BootstrapTableRef}
                        remote
                        bootstrap4
                        data={orderhistorylist} 
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
                            <TableHeaderColumn isKey={true} dataField="cust_ref" dataSort>Order Number#</TableHeaderColumn>
                            <TableHeaderColumn dataField="created" dataFormat={dateFormatter} dataSort>Order Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="ship_company" dataAlign='right' dataSort>Dealer Company</TableHeaderColumn>
                            <TableHeaderColumn dataField="success_code" dataAlign='right' dataFormat={paymentFormatter} dataSort>Payment Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="order_status" dataAlign='right' dataFormat={shippingFormatter} dataSort>Shipping Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="sub_total" dataSort dataAlign='right'>Total</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" dataFormat={actionFormatter} dataAlign='right' >Action</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ orderhistory, account }) => {
    const { orderhistorylist, totalCount, state, currentPage, sizePerPage } = orderhistory;
    const {accountData} = account
    return { orderhistorylist, totalCount, state, currentPage, sizePerPage, accountData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderHistoryList: (page, size, orderType, orderStatus, date_from, date_to, id) => {
            dispatch(fetchOrderHistoryList(page, size, orderType, orderStatus, date_from, date_to, id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);
