import { useContext } from 'react';
import { CartContext } from '../../Context';
import { ProductDetail } from '../ProductDetail';
import {XMarkIcon } from '@heroicons/react/24/solid';


const Sidebar = () => {

     //consuming context
     const { 
        closeDetail, 
        isVisibleDetail, 
     } = useContext(CartContext); 



    return(

        <aside className={`${ isVisibleDetail ? 'flex' : 'hidden' } product-detail flex flex-col fixed right-0 z-10 top-[68px] border border-black rounded-lg bg-white overflow-y-auto w-[360px] h-calc`}>
            <span
                className="text-lg font-medium relative">
                <span className='bg-transparent hover:bg-slate-200 rounded-md p-1 m-2 cursor-pointer absolute right-0 top-0 ' onClick={closeDetail} ><XMarkIcon  className="size-6 text-black " /></span>
            </span>

            < ProductDetail /> 

          
        </aside>
    );
}

export { Sidebar };