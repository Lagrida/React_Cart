import React, {useEffect} from 'react';
import {connect} from 'react-redux'

function FooterComponent({productState}){
    return(
        <div style={{ background:'#ffffff', borderRadius: 30, padding: 1, width:'60%', textAlign:'center', margin:'15px auto 15px auto' }}><h3>Total : {productState.count} products</h3></div>
    )
}

const Footer = connect(
    state => ({
        productState: state.productState
    }),
    {
        
    }
)(FooterComponent);
export default Footer;
