import { useContext } from 'react';
import { CartContext } from '../../Context';
import logo from './logo-brand.svg';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { cartItemsCount, openCart, setSearchByTitle, setSearchByCategory, getUniqueCategories  } = useContext(CartContext);


    const getCartBackgroundColor = () => {
        // if (cartItemsCount > 0)  
        //     return 'bg-green-500'; 
        // else 
        //     return 'bg-gray-100';
        return cartItemsCount > 0 ? 'bg-green-500' : 'bg-gray-100';

    }


    const renderFilters = () => {
        const uniqueCategories = getUniqueCategories();
        // Renderiza la lista de categorías <li></li>
        return (
            uniqueCategories.map((category, index) => (
                <li key={index} className='font-normal text-sm capitalize'>
                    <NavLink 
                        to={`/${category.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`}
                        onClick={() => setSearchByCategory(category)}> 
                            {category} 
                    </NavLink>
                </li>
            ))
        );
    }

    return (
        <nav className='flex flex-col md:flex-col lg:flex-row justify-between fixed z-10 top-0 items-center w-full py-2 px-8 text-sm font-light bg-white'>
            {/* Main UL */}
            <ul className='flex flex-row items-center gap-3'>
                <li className='font-normal text-sm capitalize'>
                    <NavLink to='/'>
                        <img src={logo} alt="Logo" width="120" height="auto" />
                    </NavLink>
                </li>
                {renderFilters()}
              
            </ul>
            {/* Barra de búsqueda */}
            <div className='py-2 relative'>

                <input 
                    type='Search' 
                    placeholder='Search ...'
                    className='text-md font-normal border p-2 pl-8 border-black rounded-lg min-w-72 focus:outline-slate-900'
                    onChange={(e) => setSearchByTitle(e.target.value)}/>

                <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute left-2 top-4' /> 
            </div>

            <ul className='flex flex-row items-center gap-3'>
                <li className='text-black/60'>
                    maiaaizner@gmail.com
                </li>
                <li className='font-normal text-sm capitalize'>
                    <NavLink to='/my-orders'>My Orders</NavLink>
                </li>
                <li className='font-normal text-sm capitalize'>
                    <NavLink to='/my-account'>My Account</NavLink>
                </li>
                <li className='font-normal text-sm capitalize'>
                    <NavLink to='/sign-in'>Sign In</NavLink>
                </li>

                <li className='flex flex-row items-center justify-center gap-1 relative cursor-pointer'
                 onClick={() => openCart()}
               >
                    <ShoppingBagIcon className="h-5 w-5 text-black" />
                    <p className={`${getCartBackgroundColor()} transition-colors duration-300 ease-in-out font-semibold text-xs text-black absolute left-4 bottom-[-7px] z-10 rounded-full flex items-center justify-center w-5 h-5`}>
                        {cartItemsCount}
                    </p>
                </li>
            </ul>
        </nav>
    );
}

export { Navbar };
