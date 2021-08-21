import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
class ShoppingCart extends Component{
    constructor(props){
        super(props);
    }

    handleAddItem(type_id){
        let productIndex = this.props.products.map((p)=>p.type_id).indexOf(type_id)
        let product = this.props.products[productIndex];
        this.props.addProductToShoppingCart(product);
    }

    handleReduceItemAmonut(type_id){
        let productIndex = this.props.products.map((p)=>p.type_id).indexOf(type_id)
        let product = this.props.products[productIndex];
        this.props.deleteProductFromShoppingKart(product);
    }

    renderShoppingCartItems(products){
        let mapOfShoppingCartItems = new Map();
        this.props.products.forEach((product)=>{
            if(mapOfShoppingCartItems.has(product.type_id)){
                const quantity = mapOfShoppingCartItems.get(product.type_id)
                mapOfShoppingCartItems.set(product.type_id, quantity+1)
            }else{
                mapOfShoppingCartItems.set(product.type_id, 1)
            }
        })
        let renderItemArray = []
        for (const [key, value] of mapOfShoppingCartItems) {
            renderItemArray.push(
                <div key={key} className="container">
                    <ListGroupItem>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                {key}
                            </div>
                            <div className="col-4 col-md-2">
                                <Button color="warning" onClick={()=>this.handleReduceItemAmonut(key)}>-</Button>
                            </div>
                            <div className="col-4 col-md-2">{value}</div>
                            <div className="col-4 col-md-2">
                                <Button color="success" onClick={()=>{this.handleAddItem(key)}}>+</Button>
                            </div>
                        </div>
                        
                    </ListGroupItem>
                </div>
        )}
        return renderItemArray;
    }

    render(){
        let price = 0;
        this.props.products.forEach((p)=>{
            price = price + p.price
        })

        const shoppingCartList = this.renderShoppingCartItems(this.props.products)

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 shoppingCartTable">
                        <ListGroup>
                            {shoppingCartList}
                        </ListGroup>
                    </div>
                    <div className="col-12 col-md-6"/>
                    <div className="col-12 col-md-6">
                        <Alert color="light">
                            <h3>
                                {"Total: $" + price.toString() + " dollars."}
                            </h3>
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;