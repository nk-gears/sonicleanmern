
const orderTypeList = [
    {
        id:3,
        name: 'REFERRAL SALE',
        bannerinsalesform: 'Refer your customer and get credit towards purchases of Soniclean products',
        longdescription: ''
    }
]

const PriceType = {
    DIRECTSHIP: 1,
    BUYINVENTORY: 2,
    REFERRALSALE: 3
}

const shippinginforType = [
    {
        id:1,
        name: 'SHIP TO CUSTOMER',
        bannerinsalesform: ''
    },
    {
        id:2,
        name: 'SHIP TO STORE',
        bannerinsalesform: ''
    }
]

const ShippingType={
    SHIPTOCUSTOMER:1,
    SHIPTOSTORE:2
}

export {
    orderTypeList,
    shippinginforType,
    PriceType,
    ShippingType
}

export const REQUEST_STATUS = {
    INITIAL: 'request_initial',
    PENDING: 'request_pending',
    SUCCESS: 'request_success',
    FAIL: 'request_fail',
}

export const mohawkBrands = [
    {
        label: 'Mohawk',
        value: 'Mohawk',
    },
    {
        label: 'Karastan',
        value: 'Karastan'
    }
]