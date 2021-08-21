import * as ActionTypes from './ActionTypes';

export const UserInfo = (state = { isLoading: true,
    errMess: null,
    user:{}}, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_BY_ID:
            return {...state, isLoading: false, errMess: null, products: action.payload};

        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products: []}

        case ActionTypes.GET_USER_BY_ID_FAIL:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};