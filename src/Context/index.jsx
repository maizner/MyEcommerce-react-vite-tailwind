import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => {  
    //States factory
    const [items, setItems] = useState(null)
    const [counter, setCounter] = useState(0)
    
    const [isVisibleDetail, setIsVisibleDetail] = useState(false)
    const openDetail = () => setIsVisibleDetail(true);
    const closeDetail = () => setIsVisibleDetail(false);
    
    const [isProductSelected, setIsProductSelected] = useState({})
    const [shoppingCart, setShoppingCart] = useState([])


    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])

    // Abrir el sidebar solo cuando hay un producto seleccionado
    useEffect( () => {

        if (isProductSelected && Object.keys(isProductSelected).length > 0){
            openDetail();
        }
        
    }, [isProductSelected])

    const addProductToCart = (dat) => {
        setCounter(counter + 1 );
        setShoppingCart([...shoppingCart, dat]);
    }
    

    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            counter, 
            setCounter,
            isVisibleDetail, 
            openDetail,
            closeDetail,
            isProductSelected,
            setIsProductSelected,
            shoppingCart,
            setShoppingCart,
            addProductToCart
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