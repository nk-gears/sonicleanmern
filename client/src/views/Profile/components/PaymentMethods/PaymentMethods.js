import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Card, CardHeader, CardBody, Table, Modal,Button } from 'reactstrap'
import './PaymentMethods.scss'
import AddPaymentMethodModal from '../../../SalesForm/components/AddPaymentMethodModal'
import ConfirmModal from 'common/ConfirmModal'
import LoadingIndicator from 'common/LoadingIndicator'
import { fetchCards } from "../../../../modules/Cards";

import Visa from '../../images/visa.png'
import Mastercard from '../../../SalesForm/images/Mastercard.png'
import AMEX from '../../../SalesForm/images/AMEX.jpg'
import Discover from '../../../SalesForm/images/discover.jpg'
import Diners from '../../../SalesForm/images/Diners.jpg'
import JCB from '../../../SalesForm/images/jcb.png'
import VisaElectron from '../../../SalesForm/images/visaelectron.png'
import { REQUEST_STATUS } from '_config/constants'


const PaymentMethods = ({ isSubmitSuccess, fetchCards, cardsData, state}) => {

    const [modal, setModal] = useState(false)

    useEffect(() => {

        if (isSubmitSuccess) {
            setModal(false)
            fetchCards('1')
        }
    }, [isSubmitSuccess])

    useEffect(() => {
        setModal(false)
        fetchCards('1')
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
        }
        return cardtypeImg;
    }

        return (
            <div className="PaymentMethods mt-5 mb-5">
                <Modal isOpen={modal} toggle={toggleModal}
                    className={'modal-primary ' + 'modal-md'}>
                    <AddPaymentMethodModal toggleModal={toggleModal} customerId={'1'} />
                </Modal>
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-normal">Saved Credit Cards</h5>
                                <Button size="md" className="btn-success btn-brand mr-1 mb-1 float-right" onClick={toggleModal}><i className="fa fa-plus"></i><span>Add New Card</span></Button>
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
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cardsData.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><img src={getCardType(item.cardtype)} alt="visa" /></td>
                                                                <td>•••• {item.endingon}</td>
                                                                <td>{item.expiredatemonth + '/' + item.expiredateyear}</td>
                                                                <td>
                                                                    <ConfirmModal type={"cardDelete"} index={item.id} />
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

const mapStateToProps = ({ card }) => {
    const { cardsData, state, isSubmitSuccess } = card;
    return { cardsData, state, isSubmitSuccess };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: (customerid) => {
            dispatch(fetchCards(customerid));
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethods);
