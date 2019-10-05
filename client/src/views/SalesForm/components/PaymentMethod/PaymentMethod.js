import React, { Component } from 'react'
import classNames from 'classnames'

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
import { AppSwitch } from '@coreui/react'
import Visa from '../../images/visa.png'
import Mastercard from '../../images/Mastercard.png'
import AMEX from '../../images/AMEX.jpg'
import Discover from '../../images/discover.jpg'
import Diners from '../../images/Diners.jpg'
import JCB from '../../images/jcb.png'
import VisaElectron from '../../images/visaelectron.png'

import './PaymentMethod.scss'

class PaymentMethod extends Component {

  onSelect = () => {
    this.props.selectPayment(this.props.index,this.props.data.id)
  }

  getCardType = (param) => {
    let cardtypeImg = '';
    switch (param) {
      case 'visa':
        cardtypeImg = Visa;
        break;
      case 'Visa':
        cardtypeImg = Visa;
        break;
      case 'Mastercard':
        cardtypeImg = Mastercard;
        break;
      case 'AMEX':
        cardtypeImg = AMEX;
        break;
      case 'Discover':
        cardtypeImg = Discover;
        break;
      case 'Diners':
        cardtypeImg = Diners;
        break;
      case 'Diners - Carte Blanche':
        cardtypeImg = Diners;
        break;
      case 'JCB':
        cardtypeImg = JCB;
        break;
      case 'Visa Electron':
        cardtypeImg = VisaElectron;
        break;
    }
    return cardtypeImg;
  }


  render() {
    const { endingon, expiredateyear, expiredatemonth, cardtype,id } = this.props.data
    const { selectedIndex } = this.props 
    return (
      <div className="PaymentMethod mt-2">

        <Card className="border-info" onClick={this.onSelect}>
          <CardBody className={classNames('PaymentMethod__card align-items-center text-black ', selectedIndex === id ? 'PaymentMethod__selected' : '')}>
            <Row className="align-items-center">
              <Col sm={12} md={3} ><img src={this.getCardType(cardtype)} alt={cardtype} /></Col>
              <Col sm={12} md={3} >
                <h6 className="font-weight-normal"> {endingon}</h6>
                <h6 className="font-weight-normal mt-2"> {'Exp: ' + expiredatemonth + '/' + expiredateyear}</h6>
              </Col>
              <Col sm={12} md={6} className="text-md-center text-sm-left" >
                <AppSwitch className={'mx-1 mt-2'} color={'success'} checked={selectedIndex === id} disabled label dataOn={'selected'} dataOff={'select'} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default PaymentMethod