import {applyMiddleware, createStore, compose} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers';

function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
  
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)
  
    const store = createStore(reducers, preloadedState, composedEnhancers)
  
    return store
  }

const store = configureStore();

export default store;
