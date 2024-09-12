import {ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useContext} from 'react'
import logo from './logo-brand.svg';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../Context';
import { NavItem } from '../NavItem';

const Navbar = () => {
    const { cartItemCount } = useContext(CartContext); 

    return(

        <nav className='flex justify-between fixed z-10 top-0 items-center w-full py-5 px-8 text-sm font-light bg-white'>
            {/* Main UL */}
            <ul className='flex flex-row items-center gap-3'>
                
                <li className='font-semibold text-lg' >
                    <NavLink  to='/'> 
                        <img src={logo} alt="Logo" width="120" height="auto" />
                    </NavLink>
                </li>
                <NavItem to='/all'> All </NavItem>
                <NavItem to='/clothes'> Clothes </NavItem>
                <NavItem to='/electronics'> Electronics </NavItem>
                <NavItem to='/furnitures'> Furnitures </NavItem>
                <NavItem to='/toys'> Toys </NavItem>
                <NavItem to='/others'> Others </NavItem>
            </ul>
            {/* 2° UL*/}
            <ul className='flex flex-row items-center gap-3'>
                <li className='text-black/60'>
                   maiaaizner@gmail.com
                </li>
                <NavItem to='/my-orders'> My Orders </NavItem>
                <NavItem to='/my-account'> My Account </NavItem>
                <NavItem to='/sign-in'> Sign In </NavItem>
                <li className='flex flex-row items-center justify-center gap-1 relative'>
                    <ShoppingBagIcon className="size-5 text-black"/> 
                    <p className="font-semibold text-xs text-black absolute left-4 bottom-[-7px] bg-gray-100 z-10 rounded-full flex items-center justify-center w-5 h-5">{cartItemCount}</p>
                </li>
             

            </ul>
        </nav>
    )
}

export { Navbar };