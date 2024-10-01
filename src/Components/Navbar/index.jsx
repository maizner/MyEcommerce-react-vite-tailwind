import { useContext } from 'react';
import { CartContext } from '../../Context';
import logo from './logo-brand.svg';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { cartItemsCount, openCart, setSearchByTitle, setSearchByCategory, getUniqueCategories, setSignOut, signOut, account  } = useContext(CartContext);
     const activeStyle = 'underline underline-offset-4'
     

    const getCartBackgroundColor = () => {
        return cartItemsCount > 0 ? 'bg-green-500' : 'bg-gray-100';
    }
    const handleSignOut = () => {
        setSignOut(true); 
   }
    const renderLoginMenu = () => {
        if (signOut) {

            return (
            
                <li>
                    <NavLink
                        to='/sign-in'
                        className={`
                            ${({ isActive }) => isActive ? activeStyle : undefined}  
                            py-2 px-4 text-white rounded-lg bg-black hover:bg-black/70 font-semibold text-md transition-colors duration-300 ease-in-out
                            `}
                        onClick = { handleSignOut }
                        >
                        Sign In
                    </NavLink>
                </li>
            );
        }else {

            return (
                <>
                <li className='text-black/60'>
                {account.email}
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
        <nav className='flex flex-col lg:flex-row justify-between fixed z-10 top-0 items-center w-full gap-3 md:p-4 lg:py-2 lg:px-8 text-sm font-light bg-white p-2'>
            {/* Category Menu */}
            <ul className='flex flex-row items-center justify-center lg:justify-start gap-3 w-[100%] lg:w-[35%]'>
                <li className='font-normal text-sm capitalize mr-4'>
                    <NavLink to='/'>
                        <img src={logo} alt="Logo" width="120" height="auto" />
                    </NavLink>
                </li>
                {renderCatFilters()}
              
            </ul>
            {/* Search Bar */}
            <div className='relative w-[100%] lg:w-[30%] min-w-72 flex items-center justify-center'>
                <div className='relative'>
                <input 
                    className='text-md font-normal border p-2 pl-8 border-black rounded-lg min-w-72 focus:outline-slate-900'
                    type='Search' 
                    placeholder='Search ...'
                    onChange={(e) => setSearchByTitle(e.target.value)}/>

                <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute left-2 top-2' /> 
                </div>
            </div>

            {/* Login Menu*/}
            <ul className='flex flex-row items-center justify-center lg:justify-end gap-3 w-[100%] lg:w-[35%]'>
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
