import { useContext } from 'react';
import { CartContext } from '../../Context';
import { ProductDetail } from '../ProductDetail';
import { ShoppingCart } from '../ShoppingCart';
import { XMarkIcon } from '@heroicons/react/24/solid';


const Sidebar = () => {

     //consuming context
    const { closeSidebar, isVisibleCart, isVisibleDetail } = useContext(CartContext); 

     // Determinar qué mostrar: detalle o carrito
    const renderContent = () => {
        if (isVisibleDetail) {

            return <ProductDetail />;

        } else if (isVisibleCart) {

            return <ShoppingCart />;

        }
        return null;
    };

    return(

        <aside className={`${ isVisibleDetail || isVisibleCart ? 'flex' : 'hidden' } product-detail flex flex-col fixed right-0 z-10 top-[68px] border border-gray-400 rounded-lg bg-white overflow-y-auto w-[360px] h-calc shadow-lg py-4 mr-1`}>
            <span
                className="text-lg font-medium relative">
                <span className='bg-transparent hover:bg-slate-200 rounded-md p-1 m-2 cursor-pointer absolute right-0 top-0 ' onClick={closeSidebar} ><XMarkIcon  className="size-6 text-black " /></span>
            </span>

            {renderContent()}

          
        </aside>
    );
}

export { Sidebar };