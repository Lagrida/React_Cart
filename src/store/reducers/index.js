import {combineReducers} from "redux";
import ProductReducer from "./ProductReducer";
import CartReducer from "./CartReducer";

const reducers =  combineReducers({
    productState: ProductReducer,
    cartState: CartReducer
});

export default reducers;
