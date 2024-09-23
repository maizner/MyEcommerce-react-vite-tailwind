import { useContext } from 'react';
import { CartProvider, CartContext } from '../../Context';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Home } from '../Home';
import MyAccount from '../MyAccount/index';
import MyOrder from '../MyOrder/index';
import MyOrders from '../MyOrders/index';
import SignIn from '../SignIn/index';
import NotFound from '../NotFound/index';
import { Navbar } from '../../Components/Navbar/index';
import { Sidebar } from '../../Components/Sidebar/index';

import './App.css';

const AppRoutes = () => {
    const { getUniqueCategories } = useContext(CartContext);
    const categories = getUniqueCategories();

    // Crea rutas dinámicas para categorías
    const categoryRoutes = categories.map(category => ({
        path: `/${category.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`,
        element: <Home /> 
       
    }));

    // Rutas estáticas
    const routes = [
        { path: '/', element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <NotFound /> },
        ...categoryRoutes 
    ];

    // Utiliza useRoutes con todas las rutas combinadas
    return useRoutes(routes);
}

const App = () => {
    return (    
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                <AppRoutes />
                <Sidebar />
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;
