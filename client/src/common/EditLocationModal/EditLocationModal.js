import React, {useState} from 'react'

import { Button } from 'reactstrap'
import AddLocationModal from '../AddLocationModal'

const data = {
    storeName: "Carpet ABC(Fort Lauderdale)",
    Address: "123 Main Street, STE 4 Fort Lauderdale, FL 33432",
    Address2: "",
    city: "123 Main Street",
    zipCode: "333432",
    phonenumber: "1231231234",
    us_state: ""
}

const EditLocationModal = () => {

    const [locationModal, openAddLocationModal] = useState(false)

    const toggleNewModal = () => {
        openAddLocationModal(!locationModal)
    }

    return (
        <div>
            <Button color="primary" onClick={toggleNewModal}>Edit</Button>
            <AddLocationModal locationModal={locationModal} openAddLocationModal={toggleNewModal} initialValues={data} />
        </div>
    )
}

export default EditLocationModal
