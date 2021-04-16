import {connect} from 'react-redux';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import {getCart} from '../store/actions/CartActions';
import Cart from '../cart';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CartComponent({cart, products, getCart}){
    const [cartProducts, setCartProducts] = useState(() => []);
    const [total, setTotal] = useState(() => 0);
    const displayCartProducts = () => {
        let theTotal = 0;
        const cartList = cart.cart;
        const allProducts = products.products;
        if(allProducts.length > 0){
            const totalProducts = allProducts.map(el => {
                const productInCart = cartList.find(a => a.id === el.id);
                if(productInCart !== undefined){
                    theTotal += productInCart.quantitie*el.price;
                    return {
                        ...el,
                        quantitie: productInCart.quantitie
                    }
                }
            }).filter(el => el !== undefined);
            setCartProducts(totalProducts);
            setTotal(theTotal);
        }
    }
    const removeFromCart = id => {
        if(cartProducts.length == 1){
            setTotal(0);
        }
        setCartProducts(cartProducts.filter(el => el.id !== id));
        Cart.removeFromCart(id);
        getCart();
    }
    useEffect(() => {
        if(products.loaded && cart.count > 0){
            displayCartProducts();
        }
    }, [products.loaded, cart.count]);
    return(
        <div>
        <div style={{ background:'#ffffff', borderRadius: 30, padding: 1, width:'60%', textAlign:'center', margin:'15px auto 15px auto' }}><h3>Total : <b>{total} $</b></h3></div>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
        {cartProducts.map((product, index) => 
            <Card style={{ width: 250, margin: 10 }}>
                        <Box style={{ height: 100 }}>
                            <img style={{ width:'100%', height:'100%' }} src={product.image} />
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3">
                                {product.title}
                            </Typography>
                            <Typography gutterBottom component="h2" style={{ color:'green' }}>
                                {product.price} $
                            </Typography>
                            <Typography gutterBottom component="h4">
                                Quantity : <b>{product.quantitie}</b>
                            </Typography>
                            <Typography gutterBottom component="h4">
                                Total : <b style={{ color:'green' }}>{product.quantitie*product.price} $</b>
                            </Typography>
                        </CardContent>
                        <CardActions>
                                <Button type="submit" size="small" color="secondary" onClick={() => removeFromCart(product.id)}>
                                    Remove from Cart
                                </Button>
                        </CardActions>
                </Card>
            )
        }
        </Box>
        </div>
    );
}
const CartView = connect(
    state => ({
        products: state.productState,
        cart: state.cartState,
    }),
    {
        getCart
    }
)(CartComponent);
export default withRouter(CartView);
