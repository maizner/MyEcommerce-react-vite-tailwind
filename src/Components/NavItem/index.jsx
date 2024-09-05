import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const NavItem = ({ to, children, classitem}) => {

    return(
        <li className = {classitem ? classitem : undefined }  >
            <NavLink
            to={to}
            className = {({ isActive}) => isActive ? 'underline underline-offset-4' : ''} 
            >
                {children}
            </NavLink>
        </li>
    );

    
}

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classitem: PropTypes.string
};



export { NavItem }