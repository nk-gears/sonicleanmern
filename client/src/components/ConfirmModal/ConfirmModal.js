import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { REQUEST_STATUS } from '_config/constants';
import { deleteStoreRequest } from 'modules/Stores'
import { deleteCardRequest, endCards } from 'modules/Cards'
import { deleteUserRequest } from 'modules/Users'

const ConfirmModal = ({ 
    type, 
    onDeleteStore, 
    onDeleteCard, 
    onDeleteUser, 
    state,
    id,
 }) => {

    const [modal, setModal] = useState(false)

    useEffect(() => {
        if(state===REQUEST_STATUS.SUCCESS) {
            setModal(false)
        }
    }, [state])

    const onDelete = async (id) => {
        switch (type) {
            case 'storeDelete': await onDeleteStore(id); break;
            case 'cardDelete': await onDeleteCard(id); break;
            case 'userDelete': await onDeleteUser(id); break;
            default: return ''
        }
    }

    return (
        <>
            <Button color="danger" onClick={()=>setModal(true)}>DELETE</Button>
            <Modal isOpen={modal}
                className={'modal-primary modal-md'}>
                <ModalHeader toggle={()=>setModal(false)}>Delete</ModalHeader>
                    <ModalBody className="text-center">
                        <Row className="mb-3">
                            <Col>
                                <h5>Are you Sure?</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="primary m-1 w-100" onClick={()=>onDelete(id)} >Yes</Button>
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

const mapStateToProps = ({ card }) => {
    const { state } = card;
    return { state };
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
        endfetchCards: () => {
            dispatch(endCards())
        }
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(ConfirmModal);