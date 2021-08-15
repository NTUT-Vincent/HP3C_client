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
        console.log("componentDidMount")
    }

    render(){
        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch location={this.props.location}>
                        <Route path='/product' component={()=><Product products={this.props.products}/>} />
                    </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));