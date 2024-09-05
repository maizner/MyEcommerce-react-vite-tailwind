import { useRoutes, BrowserRouter } from 'react-router-dom';
import { CartProvider, CartContext  } from '../../Context'
import{ Home } from '../Home/Index';
import MyAccount from '../MyAccount/Index';
import MyOrder from '../MyOrder/Index';
import MyOrders from '../MyOrders/Index';
import SignIn from '../SignIn/Index';
import NotFound from '../NotFound/Index';
import  { Navbar } from '../../Components/Navbar';

import './App.css'

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/',element: <Home /> },
        { path: '/my-account',element: <MyAccount /> },
        { path: '/my-order',element: <MyOrder /> },
        { path: '/my-orders',element: <MyOrders /> },
        { path: '/sign-in',element: <SignIn /> },
        { path: '/*',element: <NotFound /> }
    ]); 
    return routes;
}

const App = () => {

    return (    
       
        < CartProvider >

            <BrowserRouter>
                    
                <Navbar />  
                <AppRoutes />

            </BrowserRouter>

       </CartProvider>

    )
}

export default App
