// import Home from '../Home/Index'
import Home  from '../Home/Index';
import MyAccount from '../MyAccount/Index';
import MyOrder from '../MyOrder/Index';
import MyOrders from '../MyOrders/Index';
import SignIn from '../SignIn/Index';
import NotFound from '../NotFound/Index';

import './App.css'

function App() {


    return (
        <div >
        
            <Home />
            <MyAccount  />
            <MyOrder />
            <MyOrders />
            <SignIn />
            <NotFound />
        
        
        </div>
    )
}

export default App
