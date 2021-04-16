import {connect} from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getCart} from '../store/actions/CartActions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { getProducts } from '../store/actions/ProductActions';
import axios from 'axios';
import { URL_BACKEND } from '../backend';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Cart from '../cart';
const useStyles = makeStyles(theme => ({
    root: {
      width: 250,
      margin: 10
    },
    media: {
      height: 100
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
  }));
function BodyComponent({productState, getCart, getProducts}){
    const classes = useStyles();
    const [inputs, setInputs] = useState(() => ({values: []}));
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const updateProductCount = () => {
        let values = Array.from({length: productState.count}, () => 1);
        setInputs(d => ({values: values}));
    }
    const handleChange = (event, position) => {
        let values = inputs.values;
        values[position] = Number(event.target.value);
        setInputs(d => ({values: values}));
        console.log(inputs)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }
    const addToCart = event => {
        event.preventDefault();
        Cart.addToCart(Number(event.target.product_id.value), Number(event.target.quantitie.value));
        getCart();
        setSnackbarMessage('Added to cart');
        setOpen(true);
    }
    useEffect(() => {
        if(productState.loaded){
            updateProductCount();
        }
    }, [productState.loaded]);
    const deleteProduct = async id => {
        setOpen2(true);
        await axios.delete(URL_BACKEND + 'products/' + id)
            .then(response => {
                return getProducts();
            })
            .then(response => {
                setSnackbarMessage('Product is removed');
                setOpen(true);
            })
            .catch(error => {
                let errorData;
                if(error.response){
                    errorData = error.response.data?.message;
                }else{
                    errorData = error.message;
                }
                setSnackbarMessage('Error : ' + errorData);
                setOpen(true);
            })
            .finally(() => {
                setOpen2(false);
            });
    }
    const clickDeleteProduct = id => {
        const msg = "Are you sure to delete this product ?";
        if(window.confirm(msg)){
            deleteProduct(id);
        }
    }
    return(
    <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Backdrop className={classes.backdrop} open={open2}>
            <CircularProgress color="inherit" />
        </Backdrop>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={open}
                autoHideDuration={800}
                onClose={handleClose}
                message={snackbarMessage}
                action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </>
                }
            />
        {!productState.loaded && 
            <div style={{ textAlign: "center" }}><CircularProgress size={28} color="primary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
        {productState.products.map((product, index) => 
            <form onSubmit={addToCart} key={index}>
                <input type="hidden" name="product_id" value={product.id} />
                <Card className={classes.root}>
                        <Box style={{ height: 100 }}>
                            <img style={{ width:'100%', height:'100%' }} src={product.image} />
                        </Box>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3">
                                {product.title}
                            </Typography>
                            <Typography component="h2" style={{ color:'green' }}>
                                {product.price} $
                            </Typography>
                            <Typography component="span" style={{ color:'green' }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="quantitie"
                                    variant="outlined"
                                    name="quantitie"
                                    value={inputs.values[index]}
                                    onChange={event => handleChange(event, index)}
                                />
                            </Typography>
                        </CardContent>
                        <CardActions>
                                <Button type="submit" size="small" color="primary">
                                    Add to Cart
                                </Button> &nbsp; &nbsp;
                                <Tooltip title="Edit" placement="top" component={Link} to={`/update_product/${product.id}`}>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top" onClick={() => clickDeleteProduct(product.id)}>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                        </CardActions>
                </Card>
            </form>
        )}
    </Box>
    )
}
const Body = connect(
    state => ({
        productState: state.productState,
    }),
    {
        getCart,
        getProducts
    }
)(BodyComponent);
export default Body;
