import React, { Component } from 'react';
import classNames from 'classnames'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ProductInformationModal from '../ProductInformationModal'
import { PriceType } from '../../../../_config/constants'
import './ProductCard.scss'

class ProductCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            quantity: 0,
            modal: false,
            price: -1,
            sellfactor: -1
        }
    }

    componentDidMount = () => {
        if (this.props.type === PriceType.BUYINVENTORY)
            this.getQuantity()
        else
            this.getStatus()
    }

    componentWillUnmount() {
        this.setState({
            selected: false,
            quantity: 0,
            modal: false,
            price: -1,
            sellfactor: -1,
        })
    }

    getStatus = () => {
        let shipIndex = this.props.ship
        const exists = shipIndex.some(v => v.selectedIndex === this.props.productIndex);
        if (exists) this.setState({ selected: true })
        else this.setState({ selected: false })
    }

    getQuantity = () => {
        var arr = this.props.inventory.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});
        if (arr[this.props.productIndex] !== undefined) {
            var sellfactor = this.state.sellfactor == -1 ? this.props.data.prices[0].sellfactor : this.state.sellfactor;
            const quantity = arr[this.props.productIndex] * sellfactor;          
            let price = this.getPriceDetail(quantity);
            this.setState({
                quantity: quantity,
                selected: true,
                price: price.price,
                sellfactor: price.sellfactor,
            })
        } else {
            this.setState({
                quantity: 0,
                selected: false,
                price: this.props.data.prices.length > 0 ? this.props.data.prices[0].price : 0,
            })
        }
    }

    onSelect = (index) => {
        if (this.props.type == PriceType.DIRECTSHIP) {
            const productData = this.props.data;         
            this.setState({ selected: !this.state.selected })
            const selectedvalue = { selectedIndex: index, id: productData.id, name: productData.name, measure: productData.measure, quantity: productData.prices[0].sellfactor, img: productData.mainpicture, price: productData.prices[0].price, baseurl: productData.baseurl, sku: productData.prices[0].sku, item_id: productData.prices[0].item_id }
            this.props.onSelectProduct(index, 0, !this.state.selected, selectedvalue)
        }
    }

    onPlus = (index) => {
        const productData = this.props.data;
        let sellfactor = -1;
        let price = -1;
        let sku = '';
        let item_id = '';
        let counts = 0;
        if (productData.prices.length > 0) {
            sellfactor = this.state.sellfactor == -1 ? productData.prices[0].sellfactor : this.state.sellfactor;
            counts = this.state.quantity + sellfactor;
            let priceData = this.getPriceDetail(counts);
       
            price = priceData.price;
            sku = priceData.sku;
            item_id = priceData.item_id;
        }
        this.setState({ quantity: counts, price: price })
        const selectedvalue = { id: productData.id, name: productData.name, measure: productData.measure, quantity: counts, img: productData.mainpicture, price: price, baseurl: productData.baseurl, sku: sku, item_id: item_id }
        this.props.onSelectProduct(index, counts, 'plus', selectedvalue)
        if (this.state.quantity === 0) {
            this.setState({ selected: true })
        }
    }

    onMinus = (index) => {
        let counts;
        if (this.state.quantity !== 0) {
            counts = this.state.quantity - this.state.sellfactor
            let price = this.getPriceDetail(counts);
            this.setState({ quantity: counts })
            const selectedvalue = { id: this.props.data.id, name: this.props.data.name, measure: this.props.data.measure, quantity: counts, img: this.props.data.mainpicture, price: price.price, baseurl: this.props.data.baseurl, sku: price.sku, item_id: price.item_id }
            this.props.onSelectProduct(index, counts, 'minus', selectedvalue)
        }
        if (this.state.quantity === this.state.sellfactor) {
            this.setState({ selected: false })
        }
    }

    getPriceDetail = (quantity) => {
        const prices = this.props.data.prices;
        let priceData = prices[0];
        for (var i = 0; i < prices.length; i++) {
            if (prices[i].applyminimun <= quantity && prices[i].applymaximun >= quantity) {
                priceData = prices[i];
                break;
            }
        }
        return priceData;
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    componentWillReceiveProps = (prevProps, nextProps) => {
        if (this.props.type === PriceType.BUYINVENTORY)
            this.getQuantity()
        else
            this.getStatus()
    }

    render() {
        const { productIndex, data, type } = this.props;
        const { selected, modal } = this.state;
        let price = 0;
        if (data.prices.length > 0) {
            price = this.state.price == -1 ? data.prices[0].price : this.state.price;
        }
        return (
            <div className="ProductCard w-100" >
                        <Card className={classNames('w-100 h-100', selected ? "card-accent-primary" : "")}>
                            <CardHeader className="text-left" >
                                <span className="h5">${price}/{data.measure}</span>
                                <div className="card-header-actions">
                                    <i className="fa fa-info-circle fa-lg text-info ProductCard__info" id={"info" + productIndex} onClick={this.toggleModal} ></i>
                                    <Modal isOpen={modal} toggle={this.toggleModal}
                                        className={'modal-primary ' + 'modal-lg'}>
                                        <ModalHeader toggle={this.toggleModal}>Product Information</ModalHeader>
                                        <ModalBody>
                                            <ProductInformationModal data={data} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </CardHeader>
                            <CardBody onClick={() => this.onSelect(productIndex)} className="align-middle">
                                <div className="ProductCard__imagebox d-flex align-items-center justify-content-center mt-3">
                                    <img src={data.baseurl + data.mainpicture} alt="data.name" className="img-fluid" />
                                </div>
                                <div className="mt-4">
                                    <h5 >{data.name}</h5>
                                    <h6 className="mt-2">{data.subtitle}</h6>
                                </div>
                            </CardBody>
                            <CardFooter className="d-flex align-items-center justify-content-center">
                                {
                                    type === PriceType.DIRECTSHIP ?
                                        <>
                                            <AppSwitch className={'mx-1'} color={'success'} checked={selected} onChange={() => this.onSelect(productIndex)} label dataOn={'selected'} dataOff={'select'} />
                                        </> :
                                        <>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <Button type="button" color="primary" onClick={() => this.onMinus(productIndex)}><i className="fa fa-minus fa-sm"></i></Button>
                                                </InputGroupAddon>
                                                <Input type="text" editable="false" className="text-center font-weight-bold" value={this.state.quantity} id="input3-group2" name="input3-group2" placeholder="0" readOnly />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="primary" onClick={() => this.onPlus(productIndex)}><i className="fa fa-plus fa-sm"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </>
                                }
                            </CardFooter>
                        </Card>

            </div>
        );
    }
}

export default ProductCard;
