import axios from 'axios';

export const ACTIONS = {
    RETRIEAVE_PRODUCTS: "product/retrieve_products"
}

export const getProducts = () => dispatch => {
    const result = await axios.get();
    dispatch({
        type: RETRIEAVE_PRODUCTS,
        payload: result.data
    });
}
