
import p1 from '../views/SalesForm/images/p1.png'
import p9 from '../views/SalesForm/images/p9.png'
import p6 from '../views/SalesForm/images/p6.png'
import p8 from '../views/SalesForm/images/p8.png'
import p7 from '../views/SalesForm/images/p7.png'
import p10 from '../views/SalesForm/images/p10.png'
import p11 from '../views/SalesForm/images/p11.png'

import HH_0800 from '../assets/img/HH-0800.jpg'
import KSC_7500 from '../assets/img/KSC-7500.jpg'
import SFC_7000 from '../assets/img/SFC-7000.jpg'
import SFP_0100 from '../assets/img/SFP-0100.jpg'
import SHF_0800 from '../assets/img/SHF-0800.jpg'
import SUF_0520 from '../assets/img/SUF-0520.jpg'

const orderTypeList = [
    {
        id:3,
        name: 'REFERRAL SALE',
        bannerinsalesform: 'Refer your customer and get credit towards purchases of Soniclean products',
        longdescription: ''
    }
]

const DirectShipProducts = [
    {
        _id: '00001',
        price: '24500',
        unit: 'unit',
        tooltip: 'Karastan Soft Carpet Upright Vacuum',
        name: 'Karastan Soft Carpet Upright Vacuum',
        description: '(Model: KSC-7500)',
        image: KSC_7500,
        multiples: 2
    },
    {
        _id: '00002',
        price: '23500',
        unit: 'unit',
        tooltip: 'Soft Carpet Upright Vacuum',
        name: 'Soft Carpet Upright Vacuum',
        description: '(Model: SFC-7000)',
        image: SFC_7000,
        multiples: 2
    },
    {
        _id: '00003',
        price: '8500',
        unit: 'unit',
        tooltip: 'Soniclean Handheld Vacuum',
        name: 'Soniclean Handheld Vacuum',
        description: '(Model: HH-0800)',
        image: HH_0800,
        multiples: 2
    },
    {
        _id: '00004',
        price: '2150',
        unit: 'unit',
        tooltip: 'Upright HEPA Filter Bags',
        name: 'Upright HEPA Filter Bags',
        description: '(Model: SUF-0520)',
        image: SUF_0520,
        multiples: 2
    },
    {
        _id: '00005',
        price: '1650',
        unit: 'unit',
        tooltip: 'Sonicfresh Fragrance Pods',
        name: 'Sonicfresh Fragrance Pods',
        description: '(Model: SFP-0100)',
        image: SFP_0100,
        multiples: 2
    },
    {
        _id: '00006',
        price: '1650',
        unit: 'unit',
        tooltip: 'Handheld HEPA Filter Bags',
        name: 'Handheld HEPA Filter Bags',
        description: '(Model: SHF-0800)',
        image: SHF_0800,
        multiples: 2
    },
]

const products = [
    {
        _id: '00001',
        price: '235.00',
        unit: 'unit',
        tooltip: 'Soniclean Soft Carpet Vacuum',
        name: 'Soniclean Soft Carpet Vacuum',
        description: '(Model: SFC-7000)',
        image: p1,
        multiples: 2,
    },
    {
        _id: '00002',
        price: '21.50',
        unit: 'package',
        tooltip: 'Upright HEPA Filter Bags',
        name: 'Upright HEPA Filter Bags',
        description: '(8 Pack)',
        image: p9,
        multiples: 4
    },
    {
        _id: '00003',
        price: '16.50',
        unit: 'package',
        tooltip: 'Sonicfresh Fragrance Pods',
        name: 'Sonicfresh Fragrance Pods',
        description: '(8 Pack)',
        image: p6,
        multiples: 4
    },
    {
        _id: '00004',
        price: '85.00',
        unit: 'package',
        tooltip: 'Soniclean Handheld Vacuum',
        name: 'Soniclean Handheld Vacuum',
        description: '(Model: HH-0800)',
        image: p8,
        multiples: 2
    },
    {
        _id: '00005',
        price: '16.50',
        unit: 'package',
        tooltip: 'Handheld HEPA Filter Bags',
        name: 'Handheld HEPA Filter Bags',
        description: '(8 Pack)',
        image: p7,
        multiples: 4
    }
] 


const orderType = [
    {
        title: 'BUY INVENTORY',
        description: 'Order Soniclean products in bulk to keep stock in your showroom/warehouse',
        detail: 'This form allows you to order inventory for your store. Vacuum are sold in multiples of 2 and accessories are sold by the case; one case contains 4 packages of accessories. For pricing and shipping information, click the <i className="fa fa-info-circle fa-md text-info ProductCard__info"></i> in the top right corner of the product listing.'
    },
    {
        title: 'DIRECT SHIP',
        description: 'Order 1 vacuum at a time to be shipped to directly to your customer or store',
        detail: "This order form allows you place an order containing a maximum of 1 of each type of vacuum and a maximum of 1 package of each type of accessory. Direct ship orders can be shipped to your customers or to your store location. You will need your company's credit/ debit card information to process this order.All prices include freight for orders with shipping addresses within the contiguous US."
    },
    {
        title: 'REFERRAL SALE',
        description: 'Refer your customer and get credit towards purchases of Soniclean products',
        detail: ''
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
    DirectShipProducts,
    products,
    orderType,
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