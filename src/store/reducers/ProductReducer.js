import {ACTIONS} from '../actions/ProductActions';

const initialState = {
    loaded: false,
    products: [],
    count: 0
}
function ProductReducer(state=initialState, action) {
    switch(action.type){
        case ACTIONS.RETRIEAVE_PRODUCTS:
            return {...state, loaded:true, products:action.payload.products, count:action.payload.count}
        case ACTIONS.GET_PRODUCTS:
            return state
        default:
            return state
    }
}
export default ProductReducer;
