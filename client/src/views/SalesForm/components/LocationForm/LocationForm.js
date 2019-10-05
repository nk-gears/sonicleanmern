import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    CustomInput,
    Form,
    FormGroup,
    Row,
    Modal
} from 'reactstrap';
import AddLocationModal from '../AddLocationModal'

import { fetchStores } from "../../../../modules/Stores";
import { selectedShippingInfor, selectedPayment } from "../../../../modules/salesForm";
import './LocationForm.scss'

import { allSettled } from 'q';
const initialValues = {
    location0: false,
    location1: false,
    location2: false
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
    }, 2000)
}



class LocationForm extends Component {
    constructor(props) {
        super(props)
        this.props.fetchStores();
        this.state = {
            modal: false,
            customerinfo: {}
        }
    }

    onChange = (index) => {
        this.props.onselectedShippingInfor(this.props.storesData[index])
        this.setState({ customerinfo: this.props.storesData[index] })
        this.props.selectedPayment('');
    }
    toggleModal = (isSubmitSuccess) => {
        this.setState({ modal: !this.state.modal })
        if (isSubmitSuccess == true) {
            this.props.fetchStores();
        }
    }
    render() {
        const { modal } = this.state
        const { storesData, customerinfo } = this.props;
        return (
            <div className="animated fadeIn LocationForm mt-3">
                <Modal isOpen={modal} toggle={this.toggleModal}
                    className={'modal-primary ' + 'modal-lg'}>
                    <AddLocationModal toggleModal={this.toggleModal} />
                </Modal>
                <Card>
                    <CardHeader className="text-left">
                        <i className="icon-note"></i><strong>Select Store Location</strong>
                    </CardHeader>
                    <CardBody className="text-left">
                        <Row>
                            <Col>
                                {
                                    storesData.map((item, index) => {
                                        return (
                                            <FormGroup className="mt-3" key={index}>
                                                <CustomInput
                                                    key={index}
                                                    checked={customerinfo.id == item.id ? true : false}
                                                    type="radio"
                                                    id={"location" + item.id}
                                                    name="location"
                                                    label={item.name + "," + item.address1 + "," + item.city + "," + item.state + "," + item.zip}
                                                    onChange={() => this.onChange(index)}
                                                >
                                                </CustomInput>
                                            </FormGroup>
                                        )
                                    })
                                }
                                <FormGroup className="mt-5 text-center">
                                    <Button type="button" color="danger" className="mr-1" onClick={this.toggleModal}>Add Store Location</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ stores, salesform }) => {
    const { storesData } = stores;
    const { customerinfo } = salesform;
    return { storesData, customerinfo };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => {
            dispatch(fetchStores());
        },
        onselectedShippingInfor: (customerinfo) => {
            dispatch(selectedShippingInfor(customerinfo));
        },
        selectedPayment: (customerinfo) => {
            dispatch(selectedPayment(customerinfo));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationForm);

