import React, { Component } from 'react'
import Parser from 'html-react-parser';
import {
    Col,
    Row,
    Carousel,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import './ProductInformationModal.scss'

class ProductInformationModal extends Component {

    constructor(props) {
        super(props);

        this.state = { activeIndex: 1, activeTab: new Array(4).fill('1'), imagesforslider: [] };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
    componentDidMount = () => {
        this._storesliderImage();
    }
    onExiting() {
        this.animating = true;
    };

    _storesliderImage = () => {
        const { data } = this.props;
        let sliderpicture = [];
        if (data.sliderpicture1 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture1 })
        }
        if (data.sliderpicture2 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture2 })
        }
        if (data.sliderpicture3 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture3 })
        }
        if (data.sliderpicture4 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture4 })
        }
        if (data.sliderpicture5 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture5 })
        }
        if (data.sliderpicture6 != null) {
            sliderpicture.push({ src: data.baseurl + data.sliderpicture6 })
        }
        this.setState({ imagesforslider: sliderpicture })
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.imagesforslider.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.imagesforslider.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    toggle = (tabPane, tab) => {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    {Parser(this.props.data.longdescription)}
                </TabPane>
                <TabPane tabId="2">
                    {Parser(this.props.data.specifications)}
                </TabPane>
                <TabPane tabId="3">
                    {Parser(this.props.data.pricing)}
                </TabPane>
            </>
        );
    }

    render() {
        const { activeIndex, imagesforslider } = this.state;
        const { data } = this.props;


        const slides2 = imagesforslider.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img style={{height:250}} className="d-block w-100" src={item.src} alt={'slide'} />
                    <CarouselCaption />
                </CarouselItem>
            );
        });

        return (
            <div className="">
                <Row className="flex-column-reverse flex-md-row" >
                    <Col sm={12} md={6} className="mt-2 " >
                        <h5>{data.name}</h5>
                        <h6>{data.subtitle}</h6>
                        <h5 className="mt-3">Direct Ship Cost: $235.00</h5>
                        <h5>Retail Map Price: $359.99</h5>

                        <h6 className="mt-3 font-weight-normal">What's included</h6>
                        <h6 className="font-weight-normal">  {Parser(data.whatsincluded)}</h6>


                    </Col>
                    <Col sm={12} md={6} className="mt-2">
                        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                            <CarouselIndicators items={imagesforslider} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                            {slides2}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-5">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    Description
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    Specifications
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '3'}
                                    onClick={() => { this.toggle(0, '3'); }}
                                >
                                    Pricing
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProductInformationModal