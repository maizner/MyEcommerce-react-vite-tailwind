import { useContext } from 'react';
import { CartContext } from '../../Context';

const ProductDetail = () => {

    //consuming context
    const { selectedProduct,addProductToCart } = useContext(CartContext); 

        
    
       
    //destructuring data 
    const { description, image, title, price } = selectedProduct;
        

        
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
                        
                        <div className='flex flex-row gap-2 cursor-pointer'  onClick={() =>{addProductToCart(selectedProduct), console.log('prodDetailAddedToCart: ', selectedProduct)} }>
                            <p>agreg</p>
                            
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