import { useContext } from 'react';
import { CartContext } from '../../Context';
import { OrderCard } from '../../Components/OrderCard';

const ProductCart = () => {
    // Consuming context
    const { cartProducts } = useContext(CartContext); 

    return (
        <>
            <div className='flex justify-between items-center m-2'>
                <h2 className="text-lg font-medium p-2">My Order</h2>
            </div>
            <div className='px-6 pt-2 pb-4 overflow-y-auto'> 
                {
                    cartProducts?.map(product => (
                        <OrderCard  
                            key={product.id}  
                            id={product.id} 
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))
                }
            </div>
        </>
    );
}

export { ProductCart };
