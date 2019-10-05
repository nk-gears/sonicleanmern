import React, { Component } from 'react'
import { connect } from "react-redux";
import { Col, Row } from 'reactstrap';
import parse from 'html-react-parser';
import Stats from '../Stats'
import ProductCard from '../ProductCard'
import { selectInventory, selectShip, selectedInventoryData } from '../../../../modules/salesForm'
import { fetchPricelist, fetchPerPriceList } from "../../../../modules/PriceList";
import './SelectProduct.scss'
import { PriceType } from '../../../../_config/constants'


class SelectProduct extends Component {

    constructor(props) {
        super(props)
        this.props.fetchPerPriceList(this.props.orderType);
        this.props.fetchPricelist();
        this.state = {
            selectedDirectShipIndex: [],
            inventoryIndex: [],
            shipIndex: [],
            inventoryvalue: []
        }
    }

    componentWillMount = () => {
        this.setState({
            inventoryIndex: this.props.inventory,
            shipIndex: this.props.ship
        })
    }

    onSelectProduct = (selectedIndex, counts, clickType, selectedvalue) => {      
        const { orderType } = this.props      
        if (orderType === PriceType.DIRECTSHIP) {           
            if (clickType === true || clickType === false) {
                let shipIndex = this.props.ship
                const exists = shipIndex.some(v => v.id === selectedvalue.id);
                if (exists == false) {
                    shipIndex.push(selectedvalue)
                    this.props.onSelectShip(shipIndex)
                    this.setState({ shipIndex: shipIndex })
                }
                else {
                    let index = shipIndex.findIndex(x => x.id === selectedvalue.id);
                    if (index > -1) {
                        shipIndex.splice(index, 1);
                        this.props.onSelectShip(shipIndex)
                        this.setState({ shipIndex: shipIndex })
                    }
                }
            }
        } else if (orderType === PriceType.BUYINVENTORY) {
            if (clickType === 'plus') {
                let inventoryIndex = this.props.inventory;
                let inventoryvalue = this.props.inventoryData;
                inventoryIndex.push(selectedIndex);
                this.props.onSelectInventory(inventoryIndex)
                this.setState({ inventoryIndex: inventoryIndex })

                const exists = inventoryvalue.some(v => v.id === selectedvalue.id);
                if (exists == false) {
                    inventoryvalue.push(selectedvalue)
                    this.props.onSelectedInventory(inventoryvalue)
                    this.setState({ inventoryvalue: inventoryvalue })
                }
                else {
                    let index = inventoryvalue.findIndex(x => x.id === selectedvalue.id);
                    if (index > -1) {
                        inventoryvalue.splice(index, 1);
                        inventoryvalue.push(selectedvalue)
                        this.props.onSelectedInventory(inventoryvalue)
                        this.setState({ inventoryvalue: inventoryvalue })
                    }
                }
            } else {
                let inventoryIndex = this.props.inventory;
                var index = inventoryIndex.lastIndexOf(selectedIndex);
                if (index !== -1) inventoryIndex.splice(index, 1);
                this.props.onSelectInventory(inventoryIndex)
                this.setState({ inventoryIndex: inventoryIndex })
                const exists = inventoryIndex.some(v => v === selectedIndex);
                let inventoryvalue = this.props.inventoryData;
                if (exists == false) {
                    let index = inventoryvalue.findIndex(x => x.id === selectedvalue.id);
                    if (index > -1) {
                        inventoryvalue.splice(index, 1);
                        this.props.onSelectedInventory(inventoryvalue)
                        this.setState({ inventoryvalue: inventoryvalue })
                    }
                }
                else if (exists == true) {
                    let index = inventoryvalue.findIndex(x => x.id === selectedvalue.id);
                    if (index > -1) {
                        inventoryvalue.splice(index, 1);
                        inventoryvalue.push(selectedvalue)
                        this.props.onSelectedInventory(inventoryvalue)
                        this.setState({ inventoryvalue: inventoryvalue })
                    }
                }
            }
        }
    }

    _renderTopContent = (orderType) => {
        const { priceListItem } = this.props;
        let index = priceListItem.findIndex(x => x.id === orderType);
        return (
            <>
                <Row className="align-items-center mt-4">
                    <Col>
                        <h2 className="font-weight-bold text-black">{priceListItem[index] && priceListItem[index].name}</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col lg="9" sm="12" >
                        <h5 className="font-weight-normal" >
                            {priceListItem[index] && parse(priceListItem[index].longdescription)}
                        </h5>
                    </Col>
                </Row>
            </>
        )
    }

    _renderProductsContent = (orderType) => {
        const { perPriceListItem } = this.props;
        return (
            <Row className="justify-content-center mt-3" >
                <Col sm="12" md="9" >
                    <Row className="row-eq-height">
                        {
                            perPriceListItem.map((item, index) => {
                                return (
                                    <Col xs="12" sm="6" md="6" lg="4" className="mt-4" key={index}>
                                        <ProductCard
                                            onSelectProduct={this.onSelectProduct}
                                            inventory={this.state.inventoryIndex}
                                            ship={this.state.shipIndex}
                                            productIndex={item.id}
                                            data={item}
                                            type={orderType}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        const { orderType } = this.props;
        return (
            <div className="text-center SelectProduct mx-auto " >
                {this._renderTopContent(orderType)}
                {this._renderProductsContent(orderType)}
                <Stats
                    step={2}
                    {...this.props}
                    activeNextStep={
                        orderType === PriceType.DIRECTSHIP ? this.state.shipIndex && this.state.shipIndex.length === 0 :
                            orderType === PriceType.BUYINVENTORY ? this.state.inventoryIndex && this.state.inventoryIndex.length === 0 : false
                    }
                />
            </div>
        )
    }
}
const mapStateToProps = ({ salesform, priceList }) => {
    const { orderType, inventory, ship, inventoryData } = salesform;
    const { perPriceListItem, priceListItem } = priceList;
    return { orderType, inventory, ship, inventoryData, priceListItem, perPriceListItem };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectInventory: (data) => {
            dispatch(selectInventory(data));
        },
        onSelectShip: (data) => {
            dispatch(selectShip(data))
        },
        onSelectedInventory: (data) => {
            dispatch(selectedInventoryData(data))
        },
        fetchPerPriceList: (orderType) => {
            dispatch(fetchPerPriceList(orderType));
        },
        fetchPricelist: () => {
            dispatch(fetchPricelist());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectProduct);

