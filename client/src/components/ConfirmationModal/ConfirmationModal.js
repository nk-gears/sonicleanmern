import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { REQUEST_STATUS } from '_config/constants';

const ConfirmationModal = ({
  state,
  text,
  size,
  color,
  onClickFunc,
  header,
}) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (state === REQUEST_STATUS.SUCCESS) {
      setModal(false);
    }
  }, [state]);

  return (
    <>
      <Button color={color} size={size} onClick={() => setModal(true)}>
        {text}
      </Button>
      <Modal isOpen={modal} className={'modal-primary modal-md'}>
        <ModalHeader toggle={() => setModal(false)}>{header}</ModalHeader>
        <ModalBody className="text-center">
          <Row className="mb-3">
            <Col>
              <h5>Are you Sure?</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button color="primary m-1 w-100" onClick={onClickFunc}>
                Yes
              </Button>
            </Col>
            <Col>
              <Button color="danger m-1 w-100" onClick={() => setModal(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
