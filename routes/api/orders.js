const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const axios = require("axios")

const User = require("../../models/User");
const Orders = require("../../models/Orders")

/* GET Orders List method */
router.get('/orderslist', passport.authenticate('jwt', {session: false}), (req, res) => {
    

    var _pageNumber = parseInt(req.query.page) || 1,
        _pageSize = parseInt(req.query.size);

    Orders.countDocuments({createdBy: req.user._id}).then(totalCount=> {
        Orders.find({createdBy: req.user._id})
        .limit(_pageSize)
        .skip(_pageSize * (_pageNumber - 1))
        .then(orders=> {
    
            Promise.all(
                orders.map(async order => {
                    let p = await axios.get(
                        `https://api.cartrover.com/v1/cart/orders/${order.cust_ref}?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`
                    )
    
                    let pd = await p.data
    
                    let l = await axios.get(
                        `https://api.cartrover.com/v1/cart/orders/status/${order.cust_ref}?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`
                    )
    
                    let ld = await l.data
    
                    let ordersdata = {}
                    ordersdata._id = order._id
                    ordersdata.success_code = pd.success_code
                    ordersdata.cust_ref = pd.response.cust_ref
                    ordersdata.created = pd.response.created_date_time
                    ordersdata.ship_company = pd.response.ship_company
                    ordersdata.sub_total = pd.response.sub_total
                    ordersdata.ship_first_name = pd.response.ship_first_name
                    ordersdata.ship_last_name = pd.response.ship_last_name
                    ordersdata.ship_address_1 = pd.response.ship_address_1
                    ordersdata.ship_address_2 = pd.response.ship_address_2
                    ordersdata.ship_city = pd.response.ship_city
                    ordersdata.ship_state = pd.response.ship_state
                    ordersdata.ship_zip = pd.response.ship_zip
                    ordersdata.ship_phone = pd.response.ship_phone,
                    ordersdata.ship_e_mail = pd.response.ship_e_mail,
                    ordersdata.order_status = ld.response.order_status
                    return ordersdata
                })
            ).then(response => {
                var totalPages = Math.ceil(totalCount / _pageSize)
                var data = {"data" : response, "pages": totalPages, currentPage: _pageNumber, sizePerPage: _pageSize };
                res.json(data)
            })
        })
    })
})

/* GET a Order by ID method */
router.get('/order/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(req.params.id)

    Orders.findOne({_id: req.params.id})
        .then( async order=> {
            
            let cust_ref = await order.cust_ref;

            let p = await axios.get(
                        `https://api.cartrover.com/v1/cart/orders/${cust_ref}?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`
                    )

            let pd = await p.data

            let l = await axios.get(
                `https://api.cartrover.com/v1/cart/orders/status/${order.cust_ref}?api_user=${keys.CartRoverApiUser}&api_key=${keys.CartRoverApiKey}`
            )

            let ld = await l.data

            var data = {"orderData" : pd.response, "orderStatus": ld.response.order_status};
            res.json(data)
        })
        .catch(err=> {
            return res.status(400).json({message: 'Cannot find the Order.'})
        })
})


module.exports = router;