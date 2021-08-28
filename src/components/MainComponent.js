import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from './HeaderComponent';
import Product from './ProductComponent';
import UserProfile from './UserProfileComponent';
import ShoppingCart from './ShoppingCartComponent';

const mapStateToProps = state => {
    return {
      products: state.products
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchProducts: () => { dispatch(fetchProducts())}
  });

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            userInfo:{},
            shoppingCartList:[]
        }

        this.addUserInfo = this.addUserInfo.bind(this);
        this.addProductToShoppingCart = this.addProductToShoppingCart.bind(this);
        this.deleteProductFromShoppingKart = this.deleteProductFromShoppingKart.bind(this);
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    addUserInfo(user){
        this.setState({
            userInfo: user
        });
    }

    addProductToShoppingCart(product){
        const currentList = [...this.state.shoppingCartList];
        currentList.push(product);
        this.setState({
            shoppingCartList: currentList
        });
    }

    deleteProductFromShoppingKart(product){
        const currentList = [...this.state.shoppingCartList];
        let index = -1;
        let i;
        for(i = 0; i < currentList.length; i++){
            if(currentList[i].type_id === product.type_id){
                index = i;
            }
        }
        if(index != -1){
            currentList.splice(index, 1)
        }
        this.setState({
            shoppingCartList: currentList
        });
    }

    render(){
        console.log(this.state)

        const productsByType = ({match})=>{
            return(
                <Product products={this.props.products.products.filter((product) => product.type.toLowerCase() === match.params.productType.toLowerCase())} 
                productType={match}
                addProductToShoppingCart={this.addProductToShoppingCart}/>
            );
        };

        return (
            <div>
                <Header addUserInfo={this.addUserInfo} userInfo={this.state.userInfo}/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch location={this.props.location}>
                        <Route exact path='/product/' component={()=><Product products={this.props.products.products} addProductToShoppingCart={this.addProductToShoppingCart}/>} />
                        <Route path='/product/:productType' component={productsByType} />
                        <Route path='/userProfile' component={()=><UserProfile userInfo={this.state.userInfo}/>} />
                        <Route path='/shoppingCart' component={()=><ShoppingCart userInfo={this.state.userInfo} 
                            products={this.state.shoppingCartList} 
                            addProductToShoppingCart={this.addProductToShoppingCart} 
                            deleteProductFromShoppingKart={this.deleteProductFromShoppingKart}
                            userInfo={this.state.userInfo}/>} />
                    </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));