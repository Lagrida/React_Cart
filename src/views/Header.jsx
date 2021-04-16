import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store/actions/ProductActions';
import { withRouter } from 'react-router';
import {getCart} from '../store/actions/CartActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function HeaderComponent({getProducts, cart, getCart}){
    useEffect(() => {
        getCart();
        (async () => {
            await getProducts();
        })();
    }, []);
    return(<>
    <div style={{ padding: 10, margin:'15px auto 15px auto', textAlign:'center' }}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Link to={`/`}><Button><HomeIcon fontSize="small" /> Home</Button></Link>
            <Link to={`/add_product`}><Button><AddIcon fontSize="small" /> Add Product</Button></Link>
            <Link to={`/cart`}><Button><ShoppingCartIcon fontSize="small" /> Cart ({cart.count})</Button></Link>
        </ButtonGroup>
    </div>
    </>)
}
const Header = connect(
    state => ({
        product: state.productState,
        cart: state.cartState
    }),
    {
        getProducts,
        getCart
    }
)(HeaderComponent);
export default withRouter(Header);
