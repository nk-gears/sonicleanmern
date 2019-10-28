import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import * as Contants from '_config/constants'

const SubmitOrderModal = ({onSubmitOrder, state}) => {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <>
            <Button className="mt-4 font-weight-bold" color="success" size="lg" onClick={toggle} >Submit Order</Button>
            <Modal isOpen={modal} toggle={toggle}  className={'modal-primary modal-md'}>
                <ModalHeader>Confirm Order Submission?</ModalHeader>
                <ModalBody className="text-center">
                    {/* {
                        state===constants.REQUEST_STATUS.INITIAL ?   
                        <div className="mt-5 mb-5 d-flex justify-content-center align-items-center">
                            <Button color="success" className="mr-1" onClick={onSubmitOrder}>Submit Order!</Button>
                            <Button color="danger" className="ml-1" onClick={toggle}>Cancel</Button>
                        </div> : state===constants.REQUEST_STATUS.PENDING ? 
                        
                        </div> : null
                    } */}
                    {/* <div>
                        <h4 className="mt-3">Your Order is Being Processed</h4>
                        <h4 className="mt-2">Please wait...</h4>
                        <h6 className="mt-2">(Do not refresh this page)</h6>
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div> */}

                    <div>
                        <h4 className="mt-3">Your Order has Been</h4>
                        <h4 className="mt-2">Successfully Confirmed</h4>
                    </div>
                    
                </ModalBody>
            </Modal>
        </>
    )
}

export default SubmitOrderModal
