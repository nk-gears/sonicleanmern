import React, { Component } from 'react'
import { connect } from "react-redux";
import { Col, Row } from 'reactstrap';
import parse from 'html-react-parser';
import Stats from '../Stats'
import ProductCard from '../ProductCard'
import * as Contants from '../../../../_config/constants'
import { selectInventory, selectShip } from 'modules/salesForm'

import './SelectProduct.scss'

class SelectProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDirectShipIndex:[],
            inventoryIndex: [],
            shipIndex: []
        }
    }

    componentWillMount = () => {
        this.setState({ 
            inventoryIndex: this.props.inventory,
            shipIndex: this.props.ship
        })
    }

    onSelectProduct = (selectedIndex, counts, clickType) => {
       const { orderType } = this.props
        if(orderType===1) {
            if (clickType === true) {
                let shipIndex = this.props.ship
                shipIndex.push(selectedIndex)
                this.props.onSelectShip(shipIndex)
                this.setState({shipIndex: shipIndex})
            } else {
                let shipIndex = this.props.ship;
                var index = shipIndex.indexOf(selectedIndex);
                if (index !== -1) shipIndex.splice(index, 1);
                this.props.onSelectShip(shipIndex)
                this.setState({ shipIndex: shipIndex })
            }
        } else if (orderType === 0) {
            if (clickType==='plus') {
                let inventoryIndex = this.props.inventory;
                inventoryIndex.push(selectedIndex);
                this.props.onSelectInventory(inventoryIndex)
                this.setState({ inventoryIndex: inventoryIndex })
            } else {
                let inventoryIndex = this.props.inventory;
                var index = inventoryIndex.lastIndexOf(selectedIndex);
                if (index !== -1) inventoryIndex.splice(index, 1);
                this.props.onSelectInventory(inventoryIndex)
                this.setState({ inventoryIndex: inventoryIndex })
            }
        } 
    }

    _renderTopContent = (orderType) => {
        return (
            <>
                <Row className="align-items-center mt-4">
                    <Col>
                        <h2 className="font-weight-bold text-black">{Contants.orderType[orderType] && Contants.orderType[orderType].title}</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col lg="9" sm="12" >
                        <h5 className="font-weight-normal" >
                            {Contants.orderType[orderType] && parse(Contants.orderType[orderType].detail) }
                        </h5>
                    </Col>
                </Row>
            </>
        )
    }

    _renderProductsContent = (orderType) => {
        return (
            <Row className="justify-content-center mt-3" >
                <Col sm="12" md="9" >
                    <Row className="mx-auto">
                        {
                            orderType===1 ? 
                            Contants.DirectShipProducts.map((item, index) => {
                                return (
                                    <Col xs="12" sm="6" md="6" lg="4" className="mt-4" key={index}>
                                        <ProductCard 
                                            onSelectProduct={this.onSelectProduct} 
                                            inventory={this.state.inventoryIndex}
                                            ship={this.state.shipIndex}
                                            productIndex={item._id} 
                                            data={item} 
                                            type="check"
                                        />
                                    </Col>
                                )
                            }) : 
                            Contants.products.map((item, index) => {
                                return (
                                    <Col xs="12" sm="6" md="6" lg="4" className="mt-4" key={index}>
                                        <ProductCard 
                                            onSelectProduct={this.onSelectProduct} 
                                            inventory={this.state.inventoryIndex}
                                            ship={this.state.shipIndex}
                                            productIndex={item._id} 
                                            data={item} 
                                            type="multiple"
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
                { this._renderTopContent(orderType) }
                { this._renderProductsContent(orderType) }
                <Stats 
                    step={2} 
                    {...this.props} 
                    activeNextStep = {
                        orderType === 1 ? this.state.shipIndex && this.state.shipIndex.length === 0 : 
                            orderType === 0 ? this.state.inventoryIndex && this.state.inventoryIndex.length===0: false
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = ({ salesform }) => {
    const { orderType, inventory, ship } = salesform;
    return { orderType, inventory, ship };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectInventory: (data) => {
            dispatch(selectInventory(data));
        },
        onSelectShip: (data) => {
            dispatch(selectShip(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectProduct);

