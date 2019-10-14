import React, { useState } from 'react'
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { deleteStoreRequest } from 'modules/Stores'
import { deleteCardRequest, endCards } from 'modules/Cards'
import { deleteUserRequest } from 'modules/Users'

const ConfirmModal = ({ 
    type, 
    onDeleteStore, 
    onDeleteCard, 
    onDeleteUser,
    index
 }) => {

    const [modal, setModal] = useState(false)

    const onDelete = async (index) => {
        switch (type) {
            case 'storeDelete': await onDeleteStore(index); break;
            case 'cardDelete': await onDeleteCard(index); break;
            case 'userDelete': await onDeleteUser(index); break;
        }
        setModal(false)
    }

    return (
        <>
            <Button color="danger" onClick={()=>setModal(true)}>DELETE</Button>
            <Modal isOpen={modal}
                className={'modal-primary' + 'modal-md'}>
                <ModalHeader toggle={()=>setModal(false)}>Delete</ModalHeader>
                    <ModalBody className="text-center">
                        <Row className="mb-3">
                            <Col>
                                <h5>Are you Sure?</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="primary m-1 w-100" onClick={()=>onDelete(index)} >Yes</Button>
                            </Col>
                            <Col>
                                <Button color="danger m-1 w-100" onClick={()=>setModal(false)}>Cancel</Button>
                            </Col>
                        </Row>
                    </ModalBody>
            </Modal>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteStore: (id) => {
            dispatch(deleteStoreRequest(id))
        },
        onDeleteCard: (id) => {
            dispatch(deleteCardRequest(id))
        },
        onDeleteUser: (id) => {
            dispatch(deleteUserRequest(id))
        },
       
    }
}


export default connect(
    null,
    mapDispatchToProps,
    null
)(ConfirmModal);