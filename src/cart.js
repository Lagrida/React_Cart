
const CART_LOCAL_STORAGE = 'products_cart';

class Cart {
    cartExists(){
        return localStorage.getItem(CART_LOCAL_STORAGE) !== null;
    }
    getCart(){
        if(this.cartExists()){
            const theCart = localStorage.getItem(CART_LOCAL_STORAGE);
            return JSON.parse(theCart);
        }
        return [];
    }
    updateCart(theCart){
        localStorage.setItem(CART_LOCAL_STORAGE, theCart);
    }
    addToCart(id, quantitie){
        let theCart = this.getCart();
        let findProductIndex = theCart.findIndex(el => el.id == id);
        if(findProductIndex == -1){
            theCart.push({
                id: id,
                quantitie
            });
        }else{
            let theProduct = theCart[findProductIndex];
            theProduct.quantitie = theProduct.quantitie + quantitie;
            theCart[findProductIndex] = theProduct;
        }
        this.updateCart(JSON.stringify(theCart));
    }
    removeFromCart(id){
        let theCart = this.getCart();
        theCart = theCart.filter(el => el.id !== id);
        this.updateCart(JSON.stringify(theCart));
    }
    getCartCount(){
        return this.getCart().length;
    }
}
export default new Cart();
