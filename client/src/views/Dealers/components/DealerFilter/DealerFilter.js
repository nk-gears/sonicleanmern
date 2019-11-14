import React, {useState} from 'react'
import { Row, Col, Input, Label } from 'reactstrap'

const DealerFilter = ({
    searchEmailFilter
}) => {

    const [email, setEmail] = useState('')

    const onSearchEmail = (e) => {
        setEmail(e.target.value)
        // searchEmailFilter(e.target.value)  
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchEmailFilter(e.target.value)  
        }
      }

    return (
        <Row className="orderfilter">
            <Col className="d-flex align-items-center justify-content-center" xs={4}>
                <Label className="mr-2 mb-0 text-right">Email: </Label>
                <Input type="text" value={email} onChange={(e)=> onSearchEmail(e)} placeholder="email" onKeyDown={_handleKeyDown} />
            </Col>
        </Row>
    )
}

export default DealerFilter
