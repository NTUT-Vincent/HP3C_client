import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchProducts = () => (dispatch) => {

    return fetch(baseUrl + 'api/product/')
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
    .then(dishes => dispatch(addProducts(dishes)))
    .catch(error => dispatch(productsFailed(error.message)));
}

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const fetchUserById = (userId) => (dispatch) => {

  return fetch(baseUrl + 'user/' + userId.toString())
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
  .then(dishes => dispatch(addProducts(dishes)))
  .catch(error => dispatch(productsFailed(error.message)));
}

export const getUserById = (user) => ({
  type: ActionTypes.GET_USER_BY_ID,
  payload: user
});

export const getUserByIdFailed = (errmess) => ({
  type: ActionTypes.GET_USER_BY_ID_FAIL,
  payload: errmess
});
