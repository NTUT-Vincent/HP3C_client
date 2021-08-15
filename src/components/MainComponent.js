import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from './HeaderComponent';
import Product from './ProductComponent';

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
    }

    componentDidMount(){
        this.props.fetchProducts();
    }

    render(){
        const productsByType = ({match})=>{
            return(
                <Product products={this.props.products.products.filter((product) => product.type.toLowerCase() === match.params.productType.toLowerCase())} productType={match}/>
            );
        };

        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch location={this.props.location}>
                        <Route exact path='/product/' component={()=><Product products={this.props.products.products}/>} />
                        <Route path='/product/:productType' component={productsByType} />
                    </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));