import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormFeedback } from 'reactstrap';
import { Input } from 'reactstrap';
import { onSetEmployeeName } from 'modules/salesForm';

const PaymentShipping = ({
  type,
  storesData,
  selectedStore,
  shippinginfor,
  setEmployeeName,
  employeeName,
  customerInformation,
  ...props
}) => {
  const [requireName, setRequireName] = useState(false);
  const [store, setStore] = useState('');

  useEffect(() => {
    let result = storesData.filter(item => item._id === selectedStore);
    setStore(result[0]);
  }, [selectedStore]);

  const handleChange = e => {
    setEmployeeName(e.target.value);
    if (e.target.value === '') {
      setRequireName(true);
    } else {
      setRequireName(false);
    }
  };

  const handleBlur = e => {
    if (e.target.value === '') {
      setRequireName(true);
    } else {
      setRequireName(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="font-weight-normal text-black">
          {shippinginfor === 1
            ? 'Store Shipping Information'
            : 'Customer Shipping Information'}
        </h3>
      </div>
      {shippinginfor === 1 && (
        <div>
          <h6 className="text-black font-weight-normal">
            Enter name of company owner/employee that this order will be
            addressed to
          </h6>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-50 mt-2"
            value={employeeName}
            invalid={requireName}
          />
          <FormFeedback>Employee Name is required</FormFeedback>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-2">
        {shippinginfor === 1 ? (
          <div>
            <h6 className=".text-muted font-weight-normal pr-5">
              {store.name}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {store.address1}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {store.address2}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {store.city}, {store.us_state}, {store.zipcode}
            </h6>
          </div>
        ) : (
          <div>
            <h6 className=".text-muted font-weight-normal pr-5">
              {customerInformation.firstName} {customerInformation.lastName}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {customerInformation.address1}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {customerInformation.address2}
            </h6>
            <h6 className=".text-muted font-weight-normal pr-5">
              {customerInformation.city}, {customerInformation.us_state},{' '}
              {customerInformation.zipcode}
            </h6>
          </div>
        )}
        <Button color="primary" onClick={props.SW}>
          {' '}
          Edit{' '}
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ salesform, stores }) => {
  const {
    shippinginfor,
    selectedStore,
    employeeName,
    customerInformation,
  } = salesform;
  const { storesData } = stores;
  return {
    shippinginfor,
    selectedStore,
    storesData,
    employeeName,
    customerInformation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEmployeeName: name => {
      dispatch(onSetEmployeeName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentShipping);
