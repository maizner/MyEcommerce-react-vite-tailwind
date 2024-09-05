import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes


const CartContext = createContext();

const CartProvider = ({children}) => {
    //Estados a compartir
    const [items, setItems] = useState(null)


    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])


    const value = { 
        items, 
        setItems 
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

// Validación de PropTypes
CartProvider.propTypes = {
    children: PropTypes.node.isRequired, // Aquí defines que `children` es requerido y de tipo nodo
};

export {CartContext, CartProvider};