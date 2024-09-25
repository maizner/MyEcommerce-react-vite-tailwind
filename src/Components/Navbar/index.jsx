import { useContext } from 'react';
import { CartContext } from '../../Context';
import logo from './logo-brand.svg';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { cartItemsCount, openCart, setSearchByTitle, setSearchByCategory, getUniqueCategories, setSignOut, signOut  } = useContext(CartContext);
     const activeStyle = 'underline underline-offset-4'

    const getCartBackgroundColor = () => {
        return cartItemsCount > 0 ? 'bg-green-500' : 'bg-gray-100';
    }
    const handleSignOut = () => {
        setSignOut(true); // Actualiza el contexto cuando el usuario se desloguea
   }
    const renderLoginMenu = () => {
        if (signOut) {

            return (
            
                <li>
                    <NavLink
                        to='/sign-in'
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined}
                        onClick = { handleSignOut }
                        >
                        Sign Out
                    </NavLink>
                </li>
            );
        }else {

            return (
                <>
                <li className='text-black/60'>
                maiaaizner@gmail.com
                </li>
                <li>
                    <NavLink
                    to='/my-orders'
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                    My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/my-account'
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                    My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/sign-in'
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined}
                    onClick = { () => handleSignOut() }
                        >
                    Sign Out
                    </NavLink>
                </li>
                </>

            );

        }
    }


    const renderCatFilters = () => {
        const uniqueCategories = getUniqueCategories();
      
        return (
            uniqueCategories.map((category, index) => (
                <li key={index} className='font-normal text-sm capitalize'>
                    <NavLink 
                        to={`/${category.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`}
                        onClick={() => setSearchByCategory(category)}> 
                            {category.replace(/'s clothing/, '').trim()} 
                    </NavLink>
                </li>
            ))
        );
    }

    return (
        <nav className='flex flex-col md:flex-col lg:flex-row justify-between fixed z-10 top-0 items-center w-full py-2 px-8 text-sm font-light bg-white'>
            {/* Category Menu */}
            <ul className='flex flex-row items-center gap-3'>
                <li className='font-normal text-sm capitalize mr-4'>
                    <NavLink to='/'>
                        <img src={logo} alt="Logo" width="120" height="auto" />
                    </NavLink>
                </li>
                {renderCatFilters()}
              
            </ul>
            {/* Search Bar */}
            <div className='py-2 relative'>

                <input 
                    type='Search' 
                    placeholder='Search ...'
                    className='text-md font-normal border p-2 pl-8 border-black rounded-lg min-w-72 focus:outline-slate-900'
                    onChange={(e) => setSearchByTitle(e.target.value)}/>

                <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute left-2 top-4' /> 
            </div>

            {/* Login Menu*/}
            <ul className='flex flex-row items-center gap-3'>
                {renderLoginMenu()}

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
