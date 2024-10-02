import { useContext } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider, CartContext } from '../../Context';
import { Navbar } from '../../Components/Navbar';
import { Sidebar } from '../../Components/Sidebar';
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrder } from '../MyOrder';
import { MyOrders } from '../MyOrders';
import { SignIn } from '../SignIn';
import { NotFound } from '../NotFound';
import 'react-toastify/dist/ReactToastify.css';


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
                <ToastContainer />
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;
