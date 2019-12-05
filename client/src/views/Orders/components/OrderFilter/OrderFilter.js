import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Input, Label } from 'reactstrap';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import './OrderFilter.scss';

const OrderFilter = ({ changeFilterOptions }) => {
  const [orderType, setOrderType] = useState('ALL');
  const [oderStatus, setOrderStatus] = useState('ALL');
  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleOrderTypeChange = event => {
    setOrderType(event.target.value);
    if (moment(startDate).isSame(moment(endDate))) {
      changeFilterOptions(event.target.value, oderStatus);
    } else {
      changeFilterOptions(
        event.target.value,
        oderStatus,
        moment(startDate),
        moment(endDate)
      );
    }
  };

  const handleOrderStatusChange = event => {
    setOrderStatus(event.target.value);
    if (moment(startDate).isSame(moment(endDate))) {
      changeFilterOptions(orderType, event.target.value);
    } else {
      changeFilterOptions(
        orderType,
        event.target.value,
        moment(startDate),
        moment(endDate)
      );
    }
  };

  const handleChangeDate = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate !== null && endDate !== null) {
      changeFilterOptions(
        orderType,
        oderStatus,
        moment(startDate),
        moment(endDate)
      );
    }
  };

  return (
    <Row className="orderfilter">
      <Col className="d-flex align-items-center justify-content-center" xs={3}>
        <Label for="ccmonth" className="mr-2 mb-0 text-right">
          Order type:{' '}
        </Label>
        <Input
          type="select"
          name="ccmonth"
          id="ccmonth"
          onChange={handleOrderTypeChange}
          value={orderType}
        >
          <option value="ALL" defaultValue>
            All
          </option>
          <option value="DS">DS</option>
          <option value="INV">INV</option>
          <option value="DEM">DEM</option>
        </Input>
      </Col>
      <Col className="d-flex align-items-center justify-content-center" xs={4}>
        <Label className="mr-2 mb-0 text-right">Shipping Status: </Label>
        <Input
          type="select"
          name="ccmonth"
          id="ccmonth"
          onChange={handleOrderStatusChange}
        >
          <option value="ALL" defaultValue>
            All
          </option>
          <option value="In process">In Process</option>
          <option value="Shipped">Shipped</option>
        </Input>
      </Col>
      <Col className="d-flex align-items-center justify-content-center" xs={5}>
        <Label className="mr-2 mb-0 text-right">Date Range: </Label>
        <DateRangePicker
          startDate={startDate}
          startDateId="startDate"
          endDate={endDate}
          isOutsideRange={() => null}
          endDateId="endDate"
          onDatesChange={({ startDate, endDate }) =>
            handleChangeDate(startDate, endDate)
          }
          focusedInput={focusedInput}
          onFocusChange={focusedInput => setFocusedInput(focusedInput)}
          orientation={'horizontal'}
          openDirection={'down'}
        />
      </Col>
    </Row>
  );
};

export default OrderFilter;
