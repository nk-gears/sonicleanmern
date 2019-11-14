import React from 'react'

import {Link} from 'react-router-dom'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap'
import './RegisterSubmitModal.scss'
import { REQUEST_STATUS } from '_config/constants'

const RegisterSubmitModal = ({ modal, toggleModal, state, history }) => {

    return (
        <div className="">
            <Modal isOpen={modal} toggle={()=>toggleModal(false)}
                className={'modal-primary modal-md'}>
                <ModalHeader toggle={()=>toggleModal(false)}>
                { state===REQUEST_STATUS.SUCCESS && 'Success' }
                { state===REQUEST_STATUS.FAIL && 'Error' }
                </ModalHeader>
                <ModalBody>
                    {
                        <Row>
                            <Col className="RegisterSubmitModal">
                                {
                                    state===REQUEST_STATUS.SUCCESS &&
                                    <>
                                    <h5>
                                        Your Soniclean Dealer registration form has been successfully submitted. 
                                        Please allow up to 24 to 48 hours for account approval. Once your account is approved, 
                                        you will receive an activation email with your login credentials. 
                                        If you have any questions, you can contact Soniclean's dealer department. <br />
                                    </h5> 
                                    <br />
                                    <p className="text-success"><h5>A verification email has been sent to your email address </h5> </p>
                                    </>
                                }
                                {
                                    state===REQUEST_STATUS.FAIL && 
                                    <h5>
                                        Unfortunately, we are having trouble processing your dealer registration. For further assistance, please contact Soniclean's dealer support department.
                                    </h5>
                                }
                                <h5 className="font-weight-bold mt-4">Phone: (954) 228-9100</h5>
                                <h5 className="font-weight-bold mt-2">Email: dealers@sonicleanusa.com</h5>
                            </Col>
                        </Row>
                    }
                </ModalBody>
                <ModalFooter className="text-center">
                { state===REQUEST_STATUS.SUCCESS &&<Link to="/"> <Button color="success" onClick={()=>toggleModal(false)} className="mr-auto ml-auto">Return to Login</Button></Link> }    
                { state===REQUEST_STATUS.FAIL && <Button color="danger" onClick={()=>toggleModal(false)} className="mr-auto ml-auto">Close</Button> }
                </ModalFooter>
            </Modal>
        </div>
    )
}

RegisterSubmitModal.propTypes = {

}

export default RegisterSubmitModal
