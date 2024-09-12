import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => {  
    //States factory
    const [items, setItems] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);

    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    const [isVisibleCart, setIsVisibleCart] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({})
    const [cartProducts, setCartProducts] = useState([])

    const openDetail = () => {
        setIsVisibleDetail(true);
        setIsVisibleCart(false);
    };

    
    const openCart = () => {
        setIsVisibleCart(true);
        setIsVisibleDetail(false);

    };

    const closeSidebar = () => {
        setIsVisibleDetail(false);
        setIsVisibleCart(false);
        setSelectedProduct({});
    };


    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])

    // Abrir el sidebar solo cuando hay un producto seleccionado
    useEffect( () => {
        if (selectedProduct && Object.keys(selectedProduct).length > 0){
            openDetail();
        }
    }, [selectedProduct])

    useEffect( () => {
        if (cartProducts && cartProducts.length > 0){
            openCart();
        }
    }, [cartProducts])


    const addProductToCart = (product) => {
        setCartItemCount(prev => prev + 1 );
        setCartProducts(prev =>[...prev, product]);
    }

    const handleProductSelection = (product) => {
        setSelectedProduct({}); 
        setTimeout(() => {setSelectedProduct(product); }, 0); 
    };

    const removeProductFromCart = (productId) => {
         setCartProducts(prev => prev.filter(p => p.id !== productId));
         setCartItemCount(prev => prev - 1);
    };

    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            cartItemCount, 
            setCartItemCount,
            isVisibleDetail, 
            openDetail,
            selectedProduct,
            handleProductSelection,
            isVisibleCart, 
            openCart,
            closeSidebar,
            removeProductFromCart,
            cartProducts,
            setCartProducts,
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