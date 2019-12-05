import React, { useState } from 'react';
import { Row, Col, Input, Label } from 'reactstrap';

const DealerFilter = ({ searchFilter }) => {
  const [search, setSearch] = useState('');

  const onSearch = e => {
    setSearch(e.target.value);
    // searchEmailFilter(e.target.value)
  };

  const _handleKeyDown = e => {
    if (e.key === 'Enter') {
      searchFilter(e.target.value);
    }
  };

  return (
    <Row className="orderfilter">
      <Col className="d-flex align-items-center justify-content-center" xs={4}>
        <Label className="mr-2 mb-0 text-right">Search: </Label>
        <Input
          type="text"
          value={search}
          onChange={e => onSearch(e)}
          placeholder="search"
          onKeyDown={_handleKeyDown}
        />
      </Col>
    </Row>
  );
};

export default DealerFilter;
