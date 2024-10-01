import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from '../OrderCard';
import { CartContext } from '../../Context';
import { totalPrice } from '../../Utils';

const ShoppingCart = () => {
    // Consuming context
    const { 
        cartProducts,
        checkoutCompleted, 
        signOut ,
        setPendingCheckout,
        handleCheckout
    } = useContext(CartContext); 
    
    
    const navigate = useNavigate(); 

    const verifyLogin = () =>{
        if (signOut) {
            setPendingCheckout(true);
            navigate('/sign-in');
            alert('Debes loguearte primero');

        } else {
            handleCheckout(); 
            navigate('/my-orders/last')
        }
    }
    

    return (
        <>
            <div className='flex justify-between items-center m-2'>
                <h2 className="text-lg font-medium p-2">Shopping Cart</h2>
            </div>
            <div className='flex flex-col items-center justify-center text-center px-6 pt-2 pb-[120px] overflow-y-auto'> 
                {
                    cartProducts && cartProducts.length > 0 ? (
                        cartProducts?.map(product => (
                            <OrderCard  
                                key={product.id}  
                                id={product.id} 
                                title={product.title}
                                image={product.image}
                                price={product.price}
                                quantity={product.quantity}
                                isInSidebar={true} 

                            />
                        ))
                    ): (

                        checkoutCompleted ?(

                            <p className='flex text-center text-gray-500 h-full'>
                               Your cart is Empty
                            </p>

                        ) :(

                            <p className='flex text-center text-gray-500'> 
                                Oops! Your cart is feeling a little light. <br /> 
                                Start adding items to fill it up and enjoy your shopping!
                            </p>
                        )

                    )
                }
            </div>
            <div className='fixed bottom-0 w-full max-w-[358px] border-t-2 bg-white p-4 py-3 '>
                <p className='flex justify-between items-center pb-3'>
                    <span className='text-md font-medium text-black'>Total: </span>
                    <span className='text-lg font-medium text-black'> $ {parseFloat(totalPrice(cartProducts).toFixed(2))}</span>
                </p>
               
                {/* <Link to='/my-orders/last'> */}
                
                    <button className='flex justify-center items-center  bg-green-500  rounded-lg m-2 p-2 hover:bg-green-600  transition-colors duration-300 ease-in-out w-full'
                        onClick={() => verifyLogin()}>
                        Checkout
                    </button>

                {/* </Link> */}

            </div>
        </>
    );
}

export { ShoppingCart };
