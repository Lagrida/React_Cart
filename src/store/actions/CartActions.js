import axios from 'axios';
import {URL_BACKEND} from '../../backend';
import Cart from '../../cart';

export const ACTIONS = {
    RETRIEAVE_CART: "cart/retrieve_cart"
}
export const getCart = () => ({
    type: ACTIONS.RETRIEAVE_CART,
    payload: {
        cart: Cart.getCart(),
        count: Cart.getCart().length
    }
});
