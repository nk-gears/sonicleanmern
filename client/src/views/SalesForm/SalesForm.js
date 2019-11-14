import React, { useState, useEffect} from 'react'
import { connect } from "react-redux";
import StepWizard from 'react-step-wizard';
import OrderType from './components/OrderType'
import SelectProduct from './components/SelectProduct'
import ShippingInformation from './components/ShippingInformation'
import Payment from './components/Payment'
import Nav from './components/Nav'
import { fetchAccountData } from "modules/account";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';

import './SalesForm.scss'

const SalesForm = ({
    match,
    fetchAccount,
    ...props
}) => {

    const [activeStep, setActiveStep] = useState(1)
    const [instance, setIns] = useState()

    useEffect(() => {
        fetchAccount(match.params.id);
    }, [])

    const onStepChange = (stats) => {
        setActiveStep(stats.activeStep)
    }

    const setInstance = SW => setIns(SW)

        return (
            <div className="SalesForm animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Nav activeStep={activeStep} />
                            </CardHeader>
                            <CardBody>
                                <StepWizard
                                    instance={setInstance}
                                    onStepChange={onStepChange}
                                    isHashEnabled
                                    isLazyMount={true}
                                >
                                    <OrderType hashKey={'ordertype'} {...props} />
                                    <SelectProduct hashKey={'selectproduct'} />
                                    <ShippingInformation hashKey={'shippinginformation'} />
                                    <Payment hashKey={'payment'} />
                                </StepWizard>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}



const mapStateToProps = ({ account }) => {
    const {accountData} = account
    return { accountData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccount: (id) => {
            dispatch(fetchAccountData(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesForm);

