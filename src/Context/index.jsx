import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => {  
    //Estados a compartir
    const [items, setItems] = useState(null)
    const [counter, setCounter] = useState(0)
    // console.log('COUNTER: '+ counter)


    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])

    

    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            counter, 
            setCounter
        }}>

            {children}

        </CartContext.Provider>

    );

}

// Validación de PropTypes
CartProvider.propTypes = {
    children: PropTypes.node.isRequired, // Aquí se define que `children` es requerido y de tipo nodo
};

export {CartContext, CartProvider};