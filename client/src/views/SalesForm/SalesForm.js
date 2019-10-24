import React, { Component} from 'react'

import StepWizard from 'react-step-wizard';
import OrderType from './components/OrderType'
import SelectProduct from './components/SelectProduct'
import ShippingInformation from './components/ShippingInformation'
import Payment from './components/Payment'
import Nav from './components/Nav'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';

import './SalesForm.scss'

class SalesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {},
            activeStep: 1,
        }
    }

    onStepChange = (stats) => {
        this.setState({ activeStep: stats.activeStep})
    }

    setInstance = SW => this.setState({ SW })

    render() {
        return (
            <div className="SalesForm animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Nav activeStep={this.state.activeStep} />
                            </CardHeader>
                            <CardBody>
                                <StepWizard
                                    instance={this.setInstance}
                                    onStepChange={this.onStepChange}
                                    isHashEnabled
                                    isLazyMount={true}
                                >
                                    <OrderType hashKey={'ordertype'} {...this.props} />
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
  
}

SalesForm.propTypes = {

}

export default SalesForm
