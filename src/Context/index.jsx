import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => {  
    //States factory
    const [items, setItems] = useState(null)
    const [counter, setCounter] = useState(0)
    const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
    const openSidebar = () => 
        setIsVisibleSidebar(true);
    const closeSidebar = () => 
        setIsVisibleSidebar(false);
    
    const [isProductSelected, setIsProductSelected] = useState({})


    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])

    useEffect( () => {
        if (isProductSelected && Object.keys(isProductSelected).length > 0){
            openSidebar();

        }

    }, [isProductSelected])
    

    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            counter, 
            setCounter,
            isVisibleSidebar, 
            openSidebar,
            closeSidebar,
            isProductSelected,
            setIsProductSelected
        }}>

            {children}

        </CartContext.Provider>

    );

}

//prop validation
CartProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export {CartContext, CartProvider};