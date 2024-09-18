import {useContext} from 'react';
import { CartContext } from '../../Context';
import {PlusIcon } from '@heroicons/react/24/solid';
import {ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = (product) => {
   
    //consuming context
    const { addProductToCart, handleProductSelection, cartProducts, openCart } = useContext(CartContext); 

    //testructuring data 
    const { id, category, image, title, price } = product.data;

    const renderIcon = (id) => {
        const isInCart = cartProducts.some(prod => prod.id === id);

        if (!isInCart){
            return(

                <div className='add-cart-btn absolute right-0 top-0 flex justify-center items-center bg-white/60 w-6 h-6 rounded-full m-2 p-1 hover:bg-slate-200 transition-colors duration-300 ease-in-out'
                onClick={(e) =>{addProductToCart(product.data), e.stopPropagation()} }
                >
                    <PlusIcon className='w-6 h-6 text-black' />
                </div>
            );
        }else {
            return(

                <div className='add-cart-btn absolute right-0 top-0 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full m-2 p-1 hover:bg-green-600  transition-colors duration-300 ease-in-out'
                    onClick={(e) =>{openCart(), e.stopPropagation()} }
                    >
                        <ShoppingCartIcon className='w-6 h-6 text-white'/>
                    </div>



            );
        }
    }
  
  


    return (

        <div 
        className='card bg-white cursor-pointer w-full h-60 overflow-hidden  scale-100 hover:scale-105 transform transition-transform duration-300'
        onClick={() => handleProductSelection(product.data)}

        > 
            <figure className='relative mb-2 w-full h-4/5 '>

                <span className='absolute left-0 top-1/4 z-10 bg-white/60 rounded-xl text-black uppercase text-[9px] m-2 py-[5px] px-3'>
                    {category}
                </span>

                <div className='flex items-center justify-center w-full h-full max-h-[192px] overflow-hidden border border-black rounded-lg p-6'>
                    <img className='max-w-full max-h-full object-contain' 
                    src={image} 
                    alt={title}
                    />
                </div>

               
                
                {renderIcon(id)}

                <span className='absolute right-0 bottom-[-18px] z-10 bg-white font-semibold text-black text-lg m-2 py-[5px] px-2 leading-3 rounded-full'>
                    <span className='mr-[2px] text-[12px] leading-3'>$</span>{price}
                </span>

                <p className='py-1 px-4 truncate'>
                    <span className='text-xs font-normal '>{title}</span>
                </p>
            </figure>
        </div>
    );
}





export { ProductCard}; 