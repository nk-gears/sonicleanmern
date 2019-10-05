import React, { Component } from 'react'

import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
} from 'reactstrap';

import './AddPaymentMethod.scss'

class AddPaymentMethod extends Component {
  render() {
    return (
        <div className="AddPaymentMethod text-center text-primary">
        <Card>
            <CardBody className="AddPaymentMethod__add">
              <h3 className="text-uppercase font-weight-bold"><i className="fa fa-plus-circle fa-md mr-3"></i>Add New Payment Method</h3>
            </CardBody>
        </Card>
      </div>
    )
  }
}

export default AddPaymentMethod
