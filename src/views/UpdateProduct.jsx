import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { URL_BACKEND } from '../backend';
import { getProducts } from '../store/actions/ProductActions';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import {Alert, AlertTitle} from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { CssBaseline } from '@material-ui/core';
import {Redirect, useParams} from 'react-router-dom';
import ProductForm from './components/ProductForm';

const useStyles = makeStyles((theme) => ({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    paper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "25px"
    },
    avatar:{
        textAlign: 'center',
        background:'#008B8B',
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

function UpdateProductComponent({ getProducts }) {
    const { id } = useParams();
    const classes = useStyles();
    const initProduct = {
        title: '',
        image: '',
        price: 1
    }
    const initHelper = {
        loading: false,
        isAdded: false
    }
    const initHelper2 = {
        loading: true,
        isAdded: false
    }
    const errorInit = {
        message: "",
        errors: {
        }
    }
    const [product, setProduct] = useState(() => initProduct);
    const [helper, setHelper] = useState(() => initHelper);
    const [helper2, setHelper2] = useState(() => initHelper2);
    const [errorObj, setErrorObj] = useState(() => errorInit);
    const [errorMessage, setErrorMessage] = useState(() => '');

    const updateProduct = async event => {
        event.preventDefault();
        setErrorObj(errorInit);
        setHelper(d => ({ ...d, loading: true }));
        await axios.patch(URL_BACKEND + 'products/' + id, product)
            .then(response => {
                return getProducts();
            })
            .then(response => {
                setHelper(d => ({ ...d, isAdded: true }));
            })
            .catch(error => {
                if(error.response){
                    let theErrorObj = errorInit;
                    let errorData = error.response.data;
                    theErrorObj.message = errorData?.message || "Error";
                    if(errorData.errors){
                        theErrorObj.errors = errorData.errors;
                    }
                    setErrorObj(d => theErrorObj);
                }else{
                    setErrorObj(d => ({...d, message: error.message}));
                }
            })
            .finally(() => {
                setHelper(d => ({ ...d, loading: false }));
            });
    }
    const findError = name => {
        if (name in errorObj.errors) {
            return {
                match: true,
                message: "* " + errorObj.errors[name].join(" ")
            }
        }
        return {
            match: false,
            message: ""
        }
    }
    useEffect(() => {
        (async () => {
            await axios.get(URL_BACKEND + 'products/' + id)
            .then(response => {
                setProduct(response.data);
                setHelper2(d => ({...d, isAdded:true, loading:false}));
            })
            .catch(error => {
                if(error.response){
                    const errorMsg = error.response.data?.message;
                    setErrorMessage(errorMsg);
                }else{
                    setErrorMessage(error.message);
                }
            })
            .finally(() => {
                setHelper2(d => ({...d, loading:false}));
            });
        })();
    }, []);
    return (
        <Container component="main" maxWidth="md" style={{marginTop: 25}}>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={12} sm={10} md={8}>
                    {helper.isAdded && 
                        <Redirect to={`/`} />
                    }
                    {helper2.loading && 
                        <div style={{ textAlign: "center" }}><CircularProgress size={28} color="primary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                    {errorMessage != '' && 
                                    <Box>
                                        <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                                            <AlertTitle><b>{errorMessage}</b></AlertTitle>
                                        </Alert>
                                    </Box>
                                }
                    {helper2.isAdded && 
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AddIcon style={{ fontSize:'40px'}} />
                        </Avatar>
                        <Typography component="h3" variant="h4" align="center">
                            Modify Product {id}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                {helper.isAdded && 
                                    <Redirect to={`/`} />
                                }
                                {errorObj.message != "" && 
                                    <Box>
                                        <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                                            <AlertTitle><b>{errorObj.message}</b></AlertTitle>
                                        </Alert>
                                    </Box>
                                }
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box>
                                    <form onSubmit={updateProduct}>
                                        <ProductForm product={product} setProduct={setProduct} findError={findError} />
                                    <CssBaseline />
                                                <Grid container spacing={3} justify="center" alignItems="center">
                                                    <Grid item xs={6}>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                    <Button disabled={helper.loading} variant="contained" type="submit" color="primary" fullWidth>
                                        Modify Product
                                    </Button>
                                    {helper.loading && <div style={{ textAlign: "center", marginTop: '20px' }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                                        </Grid>
                                        </Grid>
                                </form>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}
const UpdateProduct = connect(
    state => ({

    }),
    {
        getProducts
    }
)(UpdateProductComponent);
export default UpdateProduct;
