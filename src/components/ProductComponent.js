import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
// import Card from 'reactstrap'

class Product extends Component{
    constructor(props){
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount(){

    }

    renderProductItem(productItem){
        return(
            <Card className="container">
                <CardImg top height="100%" src={productItem.product_picture} alt="Card image cap" />
                <CardBody height="40%">
                    <CardTitle tag="h5">{productItem.type_id}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                    <CardText>{'NT.' + productItem.price.toString()}</CardText>
                    <Button>Add to cart</Button>
                </CardBody>
            </Card>
        );
    }

    render() {

        const products = this.props.products.map((product)=>{
            return(
                <div key={product.type_id} className="col-12 col-md-5 m-1">
                    {this.renderProductItem(product)}
                </div>
            );
        })

        return (
            <div className="container">
                <div className="row">
                    {products}
                </div>
            </div>
            // <div>Products will be at here</div>
        )
    }
}

export default Product;