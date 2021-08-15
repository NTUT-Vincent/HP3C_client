import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Products } from './products';
// import { Comments } from './comments';
// import { Promotions } from './promotions';
// import { Leaders } from './leaders';
// import { InitialFeedback } from './forms';
// import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products: Products
            }
        ),
        applyMiddleware(thunk, logger)
    );

    return store;
}