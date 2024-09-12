import { useContext } from 'react';
import { CartContext } from '../../Context';




const ProductCart = () => {

        //consuming context
        const { cartProducts, removeProductFromCart } = useContext(CartContext); 
    
       
        //testructuring data 
        const {image, title } = cartProducts;
        

        
    return(

        <>
            <div className='flex justify-between items-center m-2'>
                <h2 className="text-lg font-medium p-2 ">Shopping Cart</h2>
            </div>
            <div className='px-6 pt-2 pb-4 '> 
                <div className='flex flex-col items-start border border-b-2 '>

                    <div className='w-full flex flex-row gap-2 justify-between'>
                        <figure className='flex items-center justify-center overflow-hidden border border-black rounded-lg p-2 max-w-20 h-20'>
                            <img className='w-full h-auto p-2' src={image} alt={title} />
                        </figure>
                        
                        <div className='flex flex-row gap-2 cursor-pointer' 
                        onClick={() => removeProductFromCart()}
                         >
                            <p>eliminar</p>
                            
                        </div>
                    </div>
                    
                </div>
        

               
            </div>
        </>
    );
}

export {ProductCart};