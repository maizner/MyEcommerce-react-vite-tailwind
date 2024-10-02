import { useContext, useState } from 'react';
import Draggable from 'react-draggable';
import { CartContext } from '../../Context';
import { ProductDetail } from '../ProductDetail';
import { ShoppingCart } from '../ShoppingCart';
import { XMarkIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';


const Sidebar = () => {
    const { 
        closeSidebar, 
        isVisibleCart, 
        isVisibleDetail,
        isCollapsedSidebar, 
        setIsCollapsedSidebar 
    } = useContext(CartContext); 

    const toggleSidebar = () => {
        setIsCollapsedSidebar(!isCollapsedSidebar);
    };

    const renderContent = () => {
        if (isVisibleDetail) {
            return <ProductDetail />;
        } else if (isVisibleCart) {
            return <ShoppingCart />;
        }
        return null;
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });
    //For future actions we know where cursor is
    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    return(
        <Draggable 
        position={position} 
        onDrag={handleDrag}>
            <aside className={`${ isVisibleDetail || isVisibleCart ? 'flex' : 'hidden' } ${ isCollapsedSidebar ? 'h-auto bottom-1' : 'h-calc top-[68px]'}  w-[360px] cursor-move product-detail flex flex-col fixed right-2 z-50 border border-gray-400 rounded-lg bg-white overflow-y-auto shadow-lg py-4 mr-1`}>
                <span
                    className='text-lg font-medium relative'>
                    <span className='bg-transparent hover:bg-slate-200 rounded-md p-1 m-2 cursor-pointer absolute right-0 top-0 ' onClick={closeSidebar} >
                        <XMarkIcon  className='size-6 text-black' title='close' />
                    </span>
                   
                   
                    <button 
                    className='bg-transparent hover:bg-slate-200 rounded-md p-1 m-2 cursor-pointer absolute right-10 top-0'
                    onClick={toggleSidebar} 
                    title={isCollapsedSidebar ? "Expand" : "Collapse"}>
                        {isCollapsedSidebar ? (
                            <ArrowsPointingOutIcon className='size-6 text-black'/> 
                        ) : (
                            <ArrowsPointingInIcon className='size-6 text-black'/> 
                        )}
                    </button>
                </span>

                {renderContent()} 
            </aside>
        </Draggable>
    );
}

export { Sidebar };