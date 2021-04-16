import {Route, Switch} from 'react-router-dom';
import Body from '../views/Body';
import ErrorPage from '../views/ErrorPage';
import AddProduct from '../views/AddProduct';
import UpdateProduct from '../views/UpdateProduct';
import CartView from '../views/Cart';

function Routers(){
    return(
        <Switch>
            <Route path={`/`} exact component={Body} />
            <Route path={`/add_product`} exact component={AddProduct} />
            <Route path={`/update_product/:id`} exact component={UpdateProduct} />
            <Route path={`/cart`} exact component={CartView} />
            <Route>
                <ErrorPage errorMessage="Error 404 : Page Not Found" />
            </Route>
        </Switch>
    );
}
export default Routers;
