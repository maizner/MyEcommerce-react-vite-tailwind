import { NavLink } from "react-router-dom";
import { NavItem } from "../NavItem";

const Navbar = () => {
    

    return(

        <nav className='flex justify-between fixed z-10 top-0 items-center w-full py-5 px-8 text-sm font-light'>
            {/* Main UL */}
            <ul className='flex flex-row items-center gap-3'>
                
                <li className='font-semibold text-lg' >
                    <NavLink  to='/'> LogoHome </NavLink>
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
                <li>
                    🛒 0
                </li>
             

            </ul>
        </nav>
    )
}

export { Navbar };