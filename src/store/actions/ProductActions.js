import axios from 'axios';
import {URL_BACKEND} from '../../backend';

export const ACTIONS = {
    RETRIEAVE_PRODUCTS: "product/retrieve_products",
    GET_PRODUCTS: "product/get_products"
}
export const getProducts = () => async dispatch => {
    const result = await axios.get(URL_BACKEND + 'products');
    dispatch({
        type: ACTIONS.RETRIEAVE_PRODUCTS,
        payload: {
            products: result.data,
            count: result.data.length
        }
    });
}
