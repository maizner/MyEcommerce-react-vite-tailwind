import { useContext } from 'react';
import { CartContext } from '../../Context';
import {XMarkIcon } from '@heroicons/react/24/solid';
import'./styles.css';

const Sidebar = () => {

     //consuming context
     const { 
        closeSidebar, 
        isVisibleSidebar, 
        isProductSelected,
     } = useContext(CartContext); 

     console.log('selected: ' , isProductSelected )
     //testructuring data 
    const { description, image, title, price } = isProductSelected;

    return(

        <aside className={`${ isVisibleSidebar ? 'flex' : 'hidden' } product-detail flex flex-col fixed right-0 top-[68px] border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center m-2'>
                <h2 className="text-lg font-medium p-2 ">Details</h2>
                
                <span
                 className="text-lg font-medium p-2"
                 onClick={closeSidebar}
                ><XMarkIcon  className="size-6 text-black" /></span>

            </div>
           <div className='p-6'> 
            <div className='flex flex-col '>
                    <figure  className='flex items-center justify-center h-full max-w-[150px] overflow-hidden border border-black rounded-lg p-8 '>
                        <img className='max-w-full max-h-full object-contain' src={image} alt={title} />
                    </figure>
                    <div>
                        <div className='flex flex-row justify-between'>
                            <span> {price} </span>
                            <span>{title}</span>
                        </div>
                        
                    </div>
                </div>
                <p>
                    <span>{description}</span>
                </p>
           </div>
        </aside>
    );
}

export { Sidebar };