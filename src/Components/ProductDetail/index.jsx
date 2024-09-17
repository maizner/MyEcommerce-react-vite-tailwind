import { useContext } from 'react';
import { CartContext } from '../../Context';
import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';


const ProductDetail = () => {

    //consuming context
    const { selectedProduct,addProductToCart, cartProducts, openCart } = useContext(CartContext); 

    //destructuring data 
    const { id, description, image, title, price } = selectedProduct;
     

    const renderCartButton = (id) => {
        const isInCart = cartProducts.filter( prod => prod.id === id).length > 0;

        if (isInCart ){

            return(

                <button className='flex flex-row items-center justify-center bg-green-300 hover:bg-green-500 text-xs text-black font-semibold gap-2 cursor-pointer  m-2 px-3 py-2 rounded-full transition-colors duration-300 ease-in-out'
                onClick={() => openCart()}>
                See < ShoppingCartIcon className='w-4 h-4'/>
                </button>
            );
          
        } else {
            return(

                <button className='flex flex-row items-center justify-center bg-green-300 hover:bg-green-500 text-xs text-black font-semibold gap-2 cursor-pointer m-2 mr-0 px-3 py-2 rounded-full  transition-colors duration-300 ease-in-out'
                onClick={() =>addProductToCart(selectedProduct) }>
                  Add  <PlusIcon className='w-3 h-3'/> 
                </button>
            );
        }
    }

        
    return(

        <>
            <div className='flex justify-between items-center m-2'>
                <h2 className="text-lg font-medium p-2 ">Product Details</h2>
            </div>
            <div className='px-6 pt-2 pb-4 '> 
                <div className='flex flex-col items-start  '>

                    <div className='w-full flex flex-row gap-2 justify-between'>
                        <figure className='flex items-center justify-center overflow-hidden border border-black rounded-lg p-2 max-w-20 h-20'>
                            <img className='w-full h-auto p-2' src={image} alt={title} />
                        </figure>
                        
                        <div className='flex flex-row items-start justify-center'>
                          
                            
                            {renderCartButton(id)}
                        </div>
                    </div>

                    <div className='flex flex-col w-full mt-2'>
                        <span className="text-2xl font-medium pb-1" ><span className='mr-[2px] text-md leading-3'>$</span> {price} </span>
                        <p className="text-md font-medium leading-6 pt-2 pb-1" >{title}</p>
                    </div>
                </div>
        

                <p className="text-sm font-normal leading-5"> 
                    {description}
                </p>
            </div>
        </>
    );
}

export {ProductDetail};