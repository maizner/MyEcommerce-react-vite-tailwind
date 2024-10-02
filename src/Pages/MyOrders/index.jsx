import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { OrdersCard } from '../../Components/OrdersCard';

function MyOrders() {
    const { order } = useContext(CartContext);

    if (!order || order.length === 0) {
        return (
            <Layout>
            <h1>No orders available</h1>
            </Layout>
        );
    }

    return (
    <Layout>
        <h1>My Orders</h1>
        {
        order.map((ordr, index) => {

            return (
                <Link key={index} to={`/my-orders/${index}`}>

                    <OrdersCard 
                        index={index} 
                        totalPrice={ordr.totalPrice} 
                        totalProducts={ordr.totalProducts} 
                        date={ordr.date }
                    />
                    
                </Link>
            );
        })
        }
    </Layout>
    );
}

export { MyOrders };
