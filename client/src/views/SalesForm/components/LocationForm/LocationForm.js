import React from 'react';
import { Card, CardHeader, CardBody, Col, CustomInput, Row } from 'reactstrap';
import AddStoreModal from 'components/AddStoreModal/AddStoreModal';
import { useRadioButtons } from 'components/common/useRadioButtons';
import LoadingIndicator from 'components/common/LoadingIndicator';

import { REQUEST_STATUS } from '_config/constants';

import './LocationForm.scss';

const SelectShippingStore = ({
  data,
  onSelectStore,
  selectedStore,
  storeLoading,
}) => {
  const [storeValue, storeInputProps] = useRadioButtons('store', value => {
    onSelectStore(value);
  });

  return (
    <div className="animated fadeIn LocationForm mt-3">
      <Card>
        <CardHeader className="text-left">
          <i className="icon-note"></i>
          <strong>Select Store Location</strong>
          <AddStoreModal />
        </CardHeader>
        <CardBody className="text-left">
          <Row>
            <Col>
              {storeLoading === REQUEST_STATUS.PENDING ? (
                <LoadingIndicator />
              ) : (
                data &&
                data.map((item, index) => {
                  return (
                    <CustomInput
                      id={item._id}
                      label={`${item.name}, ${item.address1} ${item.address2 &&
                        item.address2}, ${item.city}, ${item.us_state}, ${
                        item.zipcode
                      }`}
                      value={item._id}
                      checked={selectedStore === item._id}
                      className="mt-3"
                      {...storeInputProps}
                      key={index}
                    />
                  );
                })
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default SelectShippingStore;
