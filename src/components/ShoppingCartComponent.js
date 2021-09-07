import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';

import { baseUrl } from '../shared/baseUrl';
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

    countItemAndRetrunMap(){
        let mapOfShoppingCartItems = new Map();
        this.props.products.forEach((product)=>{
            if(mapOfShoppingCartItems.has(product.type_id)){
                const quantity = mapOfShoppingCartItems.get(product.type_id)
                mapOfShoppingCartItems.set(product.type_id, quantity+1)
            }else{
                mapOfShoppingCartItems.set(product.type_id, 1)
            }
        })
        return mapOfShoppingCartItems
    }

    renderShoppingCartItems(products){
        let mapOfShoppingCartItems = this.countItemAndRetrunMap();
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
                    <div className="col-12 col-md-3"/>
                    <div className="col-12 col-md-6">
                        <Alert color="light">
                            <h3>
                                {"Total: $" + price.toString() + " dollars."}
                            </h3>
                        </Alert>
                    </div>
                    <div className="col-12 col-md-3 shoppingCartSubmitButton">
                        <Button color="success" onClick={()=>{this.postProductsInCart()}}>Buy It!</Button>
                    </div>
                </div>
            </div>
        );
    }

    postProductsInCart(){
        let itemMap = this.countItemAndRetrunMap();
        let itemArray = [];
        for (const [key, value] of itemMap){
            itemArray.push({
                type_id: key,
                quantity: value
            })
        }

        const requestBody = {
            order_customer: this.props.userInfo.user_id,
            address: this.props.userInfo.address,
            payment: "credit card",
            deliver_type: "Home delivery",
            status: "to be handled",
            items: itemArray
        }

        return fetch(baseUrl + 'api/transaction/order_post/', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                throw error;
          })
        .then(response => response.json())
        .catch(error =>  { console.log('post order', error.message); alert('Your order could not be posted\nError: '+error.message); });
    }

    

}

export default ShoppingCart;