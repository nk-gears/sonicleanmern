import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap'
import './PaymentMethods.scss'
import AddPaymentMethodModal from 'components/AddPaymentMethodModal/AddPaymentMethodModal'
import ConfirmModal from 'components/ConfirmModal/ConfirmModal'
import LoadingIndicator from 'components/common/LoadingIndicator'
import { fetchCards, endCards } from "../../../../modules/Cards";

import Visa from '../../images/visa.png'
import Mastercard from '../../../SalesForm/images/Mastercard.png'
import AMEX from '../../../SalesForm/images/AMEX.jpg'
import Discover from '../../../SalesForm/images/discover.jpg'
import Diners from '../../../SalesForm/images/Diners.jpg'
import JCB from '../../../SalesForm/images/jcb.png'
import VisaElectron from '../../../SalesForm/images/visaelectron.png'
import { REQUEST_STATUS } from '_config/constants'


const PaymentMethods = ({ isSubmitSuccess, fetchCards, cardsData, state, endfetchCards, accountData}) => {

    const [modal, setModal] = useState(false)
    useEffect(() => {
        setModal(false)
        fetchCards(accountData._id)
    }, [])

    const toggleModal = () => {
        setModal(!modal)
    }

    const getCardType = (param) => {
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
            default: return ;
        }
        return cardtypeImg;
    }

        return (
            <div className="PaymentMethods mt-5 mb-5">
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-normal">Saved Credit Cards</h5>
                                <AddPaymentMethodModal toggleModal={toggleModal} customerId={'1'} id={accountData._id} />
                            </CardHeader>
                            <CardBody>
                                {
                                    state===REQUEST_STATUS.PENDING ? 
                                    <LoadingIndicator /> :
                                        <Table responsive className="table-hover ">
                                            <thead>
                                                <tr>
                                                    <th>Card</th>
                                                    <th>Card Number</th>
                                                    <th>Exp. Date</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                   cardsData && cardsData.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><img src={getCardType(item.cardtype)} alt="visa" /></td>
                                                                <td>•••• {item.cardnumber}</td>
                                                                <td>{item.expdate}</td>
                                                                <td className="text-right">
                                                                    <ConfirmModal type={"cardDelete"} id={item._id} dealer={accountData._id} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}

const mapStateToProps = ({ card, account }) => {
    const { cardsData, state, isSubmitSuccess } = card;
    const {accountData} = account
    return { cardsData, state, isSubmitSuccess, accountData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: (id) => {
            dispatch(fetchCards(id));
        },
        endfetchCards: () => {
            dispatch(endCards())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethods);
