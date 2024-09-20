import { useContext } from 'react';
import { CartContext } from '../../Context';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { OrderCard } from '../../Components/OrderCard';
import { Layout } from '../../Components/Layout';
import { totalPrice } from '../../Utils';

function MyOrder() {

    const { order } = useContext(CartContext); 

    
    const lastOrder = order.length > 0 ? order[order.length - 1] : null;
    const currentPath = window.location.pathname;
    const index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // Si la URL es '/last', usamos la última orden
    let selectedOrder = null;
    let thankYouText = null;
    if (index === 'last') {
        selectedOrder = lastOrder;
        thankYouText = (
            <div className='gap-6'>            
                <h1 className='text-xl text-center font-semibold p-3'>Thank you for your purchase! 🎉</h1>
                <p className='text-md text-center font-normal mb-6 p-3 px-6'>
                   
                    Your order has been placed successfully. <br /> 
                    Feel free to review your purchase, or browse around to find more items to add!
                    <Link to='/' className='flex items-center justify-center text-green-700 underline text-sm px-2'>
                     Here
                    </Link>
                </p>
            </div>
        );
    } else {
        // Convertir el índice de la URL a número
        const parsedIndex = parseInt(index);
        selectedOrder = order[parsedIndex] ? order[parsedIndex] : null;
        thankYouText = (
            <h1 className='text-xl text-center font-semibold mb-6 p-3'>My Order</h1>
        );
    }

    // Si no hay una última orden o una orden seleccionada, mostrar mensaje de error
    if (!selectedOrder) {
        return (
            <Layout>
                <h1>No order available</h1>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className='min-w-[360px] max-w-[500px] rounded-lg w-full'>

                    {thankYouText}

                <div className='flex relative w-full justify-between items-center border-t border-b p-3 '>
                    <Link to='/my-orders' className='flex items-center justify-center text-green-700 underline text-sm px-2'>
                        <ChevronLeftIcon className='w-4 h-4 mr-2'/> My Orders 
                    </Link>
                    <p className='text-sm font-xs text-black'>
                        {selectedOrder.date}
                    </p>
                </div>

                <div className='px-6 pt-2 mt-4 overflow-y-auto w-full max-w-lg'>
                    {selectedOrder.products.length > 0 ? (
                        selectedOrder.products.map(product => (
                            <OrderCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.image}
                                price={product.price}
                                quantity={product.quantity}
                                isInSidebar={false}
                            />
                        ))
                    ) : (
                        <p>No products found in your latest order.</p>
                    )}
                </div>
                <div className='px-6 pt-2 w-full max-w-lg bg-white'>
                    <p className='flex justify-between items-center pb-3 px-3'>
                        <span className='text-md font-medium text-black'>Total: </span>
                        <span className='text-lg font-medium text-black'> $ {totalPrice(selectedOrder.products)}</span>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default MyOrder;
