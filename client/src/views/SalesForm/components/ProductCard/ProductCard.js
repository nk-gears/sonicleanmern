import React, { Component } from 'react';
import classNames from 'classnames';
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
  ModalFooter,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import ProductInformationModal from '../ProductInformationModal';

import './ProductCard.scss';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      quantity: 0,
      modal: false,
    };
  }

  componentDidMount = () => {
    if (this.props.type === 'multiple') this.getQuantity();
    else this.getStatus();
  };

  getStatus = () => {
    let shipIndex = this.props.ship;
    var index = shipIndex.indexOf(this.props.productIndex);
    if (index !== -1) this.setState({ selected: true });
    else this.setState({ selected: false });
  };

  getQuantity = () => {
    var arr = this.props.inventory.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    if (arr[this.props.productIndex] !== undefined) {
      this.setState({
        quantity: arr[this.props.productIndex] * this.props.data.multiples,
        selected: true,
      });
    } else {
      this.setState({
        quantity: 0,
        selected: false,
      });
    }
  };

  onSelect = index => {
    if (this.props.type !== 'multiple') {
      this.setState({ selected: !this.state.selected });
      this.props.onSelectProduct(index, 0, !this.state.selected);
    }
  };

  onPlus = index => {
    let counts = this.state.quantity + this.props.data.multiples;
    this.setState({ quantity: counts });
    this.props.onSelectProduct(index, counts, 'plus');
    if (this.state.quantity === 0) {
      this.setState({ selected: true });
    }
  };

  onMinus = index => {
    let counts;
    if (this.state.quantity !== 0) {
      counts = this.state.quantity - this.props.data.multiples;
      this.setState({ quantity: counts });
      this.props.onSelectProduct(index, counts, 'minus');
    }
    if (this.state.quantity === this.props.data.multiples) {
      this.setState({ selected: false });
    }
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  componentWillReceiveProps = (prevProps, nextProps) => {
    if (this.props.type === 'multiple') this.getQuantity();
    else this.getStatus();
  };

  render() {
    const { productIndex, data, type } = this.props;
    const { selected, modal, quantity } = this.state;

    return (
      <div className="ProductCard w-100">
        <Row>
          <Col>
            <Card
              className={classNames(
                'w-100',
                selected ? 'card-accent-primary' : ''
              )}
            >
              <CardHeader className="text-left">
                <span className="h5">
                  $
                  {quantity < 10
                    ? (data.price / 100).toFixed(2)
                    : (data.discount / 100).toFixed(2)}
                  /{data.unit}
                </span>
                <div className="card-header-actions">
                  <i
                    className="fa fa-info-circle fa-lg text-info ProductCard__info"
                    id={'info' + productIndex}
                    onClick={this.toggleModal}
                  ></i>
                  <Modal
                    isOpen={modal}
                    toggle={this.toggleModal}
                    className={'modal-primary modal-lg'}
                  >
                    <ModalHeader toggle={this.toggleModal}>
                      Product Information
                    </ModalHeader>
                    <ModalBody>
                      <ProductInformationModal />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={this.toggleModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardHeader>
              <CardBody
                onClick={() => this.onSelect(productIndex)}
                className="align-middle"
              >
                <div className="ProductCard__imagebox d-flex align-items-center justify-content-center mt-3">
                  <img src={data.image} alt="data.name" className="img-fluid" />
                </div>
                <div className="mt-4">
                  <h5>{data.name}</h5>
                  <h6 className="mt-2">{data.description}</h6>
                </div>
              </CardBody>
              <CardFooter className="d-flex align-items-center justify-content-center">
                {type === 'check' ? (
                  <>
                    <AppSwitch
                      className={'mx-1'}
                      color={'success'}
                      checked={selected}
                      onChange={() => this.onSelect(productIndex)}
                      label
                      dataOn={'selected'}
                      dataOff={'select'}
                    />
                  </>
                ) : (
                  <>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button
                          type="button"
                          color="primary"
                          onClick={() => this.onMinus(productIndex)}
                        >
                          <i className="fa fa-minus fa-sm"></i>
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        editable="false"
                        className="text-center font-weight-bold"
                        value={this.state.quantity}
                        id="input3-group2"
                        name="input3-group2"
                        placeholder="0"
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          type="button"
                          color="primary"
                          onClick={() => this.onPlus(productIndex)}
                        >
                          <i className="fa fa-plus fa-sm"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductCard;
