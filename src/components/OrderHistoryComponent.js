import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';
import { List } from 'reactstrap';

class OrderHistory extends Component{
    constructor(props){
        super(props);

        this.fetchOrderList = this.fetchOrderList.bind(this);

        this.state = {
            orderList:[],
            rendered: false
        }
    }

    componentDidMount(){
        this.fetchOrderList();
    }

    fetchOrderList(){
        return fetch(baseUrl + 'api/transaction/order/user/'+ this.props.userInfo.user_id +'/')
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
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                orderList: response,
                rendered : true
            });
        })
        .catch(error =>  { console.log('get comment', error.message); alert('This page has not been construsted\nError: '+error.message); })
    }

    renderOrder(order){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-7">
                        <h3>Order Number: {order.order_id}</h3>
                    </div>
                    <List type="unstyled">
                        <li>Price: {order.price}</li>
                        <li>Status: {order.status}</li>
                        <li>Order Date: {order.order_date_time.toString()}</li>
                        <li>Address: {order.address}</li>
                        <li>Delivered By: {order.deliver_type}</li>
                        <li>Items: 
                            <ul>
                                {order.items.map((item)=><li>{item.type_id}*{item.quantity}</li>)}
                            </ul>
                        </li>
                    </List>
                </div> 
            </div>
        );
    }

    render(){
        const orders = this.state.orderList.map((order)=>{
            return(
                <div key={order.order_id} className="col-12">
                    {this.renderOrder(order)}
                </div>
            );
        })

        return(
            <div>
                <div>{orders}</div>
            </div>
            
        );
    }
}

export default OrderHistory;