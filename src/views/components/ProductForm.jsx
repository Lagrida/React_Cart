import React from 'react';
import TextField from '@material-ui/core/TextField';
import handleChange from '../../handleChange';

function ProductForm({product, setProduct, findError}) {
    return (
        <>
            <TextField
                margin="normal"
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={product.title}
                onChange={event => handleChange(event, setProduct)}
                error={findError("title").match}
                helperText={findError("title").message}
            />
            <TextField
                margin="normal"
                fullWidth
                label="image"
                variant="outlined"
                name="image"
                value={product.image}
                onChange={event => handleChange(event, setProduct)}
                error={findError("image").match}
                helperText={findError("image").message}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Price"
                variant="outlined"
                name="price"
                value={product.price}
                onChange={event => handleChange(event, setProduct)}
                error={findError("price").match}
                helperText={findError("price").message}
            />
        </>
    );
}
export default ProductForm;
