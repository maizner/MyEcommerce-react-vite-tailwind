import {useContext} from 'react';
import { CartContext } from '../../Context';

const Card = (product) => {
   
    const { category, image, title, price } = product.data;
    const { counter, setCounter } = useContext(CartContext); 

    return (

        <div className='bg-white cursor-pointer w-56 h-60 overflow-hidden  scale-100 hover:scale-105 transform transition-transform duration-300'> 
            <figure className='relative mb-2 w-full h-4/5 '>

                <span className='absolute left-0 top-1/4 z-10 bg-white/60 rounded-xl text-black uppercase text-[9px] m-2 py-[5px] px-3'>
                    {category}
                </span>

                <div className='flex items-center justify-center w-full h-full max-h-[192px] overflow-hidden border-2 border-black rounded-lg p-8'>
                    <img className='max-w-full max-h-full object-contain' 
                    src={image} 
                    alt={title}
                    />
                </div>

                <div className='absolute right-0 top-0 flex justify-center items-center bg-white/60  w-6 h-6 rounded-full m-2 p-1'
                onClick={() => setCounter(counter + 1 )}
                >

                    +
                </div>

                <span className='absolute right-0 bottom-[-20px] z-10 bg-white font-semibold text-black text-md m-2 py-[5px] px-3'>
                    <span className='mr-[2px] text-[12px]'>Ars</span>{price}
                </span>

                <p className='py-2 px-4 truncate'>
                    <span className='text-xs font-light'>{title}</span>
                </p>
            </figure>
        </div>
    );
}

export { Card }; 