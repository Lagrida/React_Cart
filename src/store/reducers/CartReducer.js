import {ACTIONS} from '../actions/CartActions';

const initialState = {
    loaded: false,
    cart: [],
    cartProducts: [],
    count: 0
}
function CartReducer(state=initialState, action) {
    switch(action.type){
        case ACTIONS.RETRIEAVE_CART:
            return {...state, cart: action.payload.cart, count: action.payload.count}
        default:
            return state
    }
}
export default CartReducer;
