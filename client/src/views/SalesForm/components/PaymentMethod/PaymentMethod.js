import React from 'react';
import classNames from 'classnames';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import Visa from '../../images/visa.png';
import Mastercard from '../../images/Mastercard.png';
import AMEX from '../../images/AMEX.jpg';
import Discover from '../../images/discover.jpg';
import Diners from '../../images/Diners.jpg';
import JCB from '../../images/jcb.png';
import VisaElectron from '../../images/visaelectron.png';

import './PaymentMethod.scss';

const PaymentMethod = ({ selectedIndex, selectPayment, data }) => {
  const onSelect = () => {
    selectPayment(data._id);
  };

  const getCardType = param => {
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
      default:
        return;
    }
    return cardtypeImg;
  };

  return (
    <div className="PaymentMethod mt-2">
      <Card className="border-info" onClick={onSelect}>
        <CardBody
          className={classNames(
            'PaymentMethod__card align-items-center text-black ',
            selectedIndex === data._id ? 'PaymentMethod__selected' : ''
          )}
        >
          <Row className="align-items-center">
            <Col sm={12} md={3}>
              <img src={getCardType(data.cardtype)} alt="visa" />
            </Col>
            <Col sm={12} md={3}>
              <h6 className="font-weight-normal"> •••• {data.cardnumber}</h6>
              <h6 className="font-weight-normal mt-2"> {data.expdate}</h6>
            </Col>
            <Col sm={12} md={6} className="text-md-center text-sm-left">
              <AppSwitch
                className={'mx-1 mt-2'}
                color={'success'}
                checked={selectedIndex === data._id}
                disabled
                label
                dataOn={'selected'}
                dataOff={'select'}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentMethod;
