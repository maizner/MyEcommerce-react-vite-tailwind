import { useContext } from 'react';
import { CartContext } from '../../Context';
import { PlusIcon, ShoppingCartIcon, ChevronRightIcon,  StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import {StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';


const ProductDetail = () => {

    //consuming context
    const { selectedProduct,addProductToCart, cartProducts, openCart } = useContext(CartContext); 

    //destructuring data 
    const { id, description, image, title, price, rating } = selectedProduct;

     // Función reutilizada para mostrar estrellas
     const getStarRating = (rate) => {
        const stars = [];
        const filledStars = Math.round(rate);

        for (let i = 0; i < 5; i++) {
            if (i < filledStars) {
                stars.push(<StarSolidIcon key={i} className='w-5 h-5 text-yellow-500' />);
            } else {
                stars.push(<StarOutlineIcon key={i} className='w-5 h-5 text-yellow-500' />);
            }
        }
        return stars;
    };
     

    const renderCartButton = (id) => {
        const isInCart = cartProducts.filter( prod => prod.id === id).length > 0;

        if (isInCart ){

            return(

                <button className='flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 text-xs text-black font-semibold gap-2 cursor-pointer  px-3 py-2 rounded-full transition-colors duration-300 ease-in-out'
                onClick={() => openCart()}>
               <ChevronRightIcon className='w-3 h-3'/> Go < ShoppingCartIcon className='w-4 h-4'/>
                </button>
            );
          
        } else {
            return(

                <button className='flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 text-xs text-black font-semibold gap-2 cursor-pointer  mr-0 px-3 py-2 rounded-full  transition-colors duration-300 ease-in-out'
                onClick={() =>addProductToCart(selectedProduct) }>
                  <PlusIcon className='w-3 h-3'/>Add Product  < ShoppingCartIcon className='w-4 h-4'/>
                </button>
            );
        }
    }

        
    return(

        <>
            <div className='flex justify-between items-center m-2'>
                <h2 className='text-lg font-medium p-2 '>Product Details</h2>
            </div>
            <div className='px-6 pt-2 pb-4 '> 
                <div className='flex flex-col items-start  '>

                    <div className='w-full flex flex-row gap-2 justify-between'>
                        <figure className='flex items-center justify-center overflow-hidden border border-black rounded-lg p-2 max-w-20 h-20'>
                            <img className='w-full h-auto p-2' src={image} alt={title} />
                        </figure>
                        <div className='w-full flex flex-col gap-1 justify-between'>
                            <div className='flex flex-col items-end'>
                                <span className='flex flex-row bg-white rounded-xl mb-1'>
                                    {getStarRating(rating.rate)}
                                </span>  
                                <p className=' text-gray-500 capitalize text-xs'>
                                    ({rating.count} reviews)
                                </p>
                            </div>
                            <div className='flex flex-row items-start justify-end'>
                                {renderCartButton(id)}
                            </div>
                        </div>
                       
                        
                    </div>

                    <div className='flex flex-col w-full mt-2'>
                        <span className='text-2xl font-lg font-semibold pb-1' >
                            <span className='mr-[2px] text-lg leading-3'>$</span> {price} 
                        </span>
                        <p className='text-md font-medium leading-6 pt-2 pb-1' >{title}</p>
                    </div>
                </div>
        

                <p className='text-sm font-normal leading-5 text-gray-400'> 
                    {description}
                </p>
            </div>
        </>
    );
}

export {ProductDetail};