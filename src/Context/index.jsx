import { createContext,useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => { 
     
    //States factory
    const [items, setItems] = useState(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [ItemIDCount, setItemIDCount] = useState(1);

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

    useEffect(() => {
        setCartItemsCount(cartProducts.reduce((total, product) => total + product.quantity, 0));
    }, [cartProducts]);

   
    // Añadir producto o actualizar cantidad si ya está en el carrito
    const addProductToCart = (product) => {
        setCartProducts((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
      
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      };
    

     // Decrementar cantidad del producto
    const decrementProductQuantity = (productId) => {

        setCartProducts(prev => 
            prev.map( p => 
                p.id === productId && p.quantity > 1 ? {...p, quantity: p.quantity - 1}:p
            ).filter(p => p.quantity > 0));// Elimina productos con cantidad 0

    }

    const removeProductFromCart = (productId) => {
        setCartProducts((prevCart) => {
        //   const existingProduct = prevCart.find((item) => item.id === productId);
      
          
            return prevCart.filter((item) => item.id !== productId);
          
        });
      };

//     const removeProductFromCart = (productId) => {
//         setCartProducts(prev => prev.filter(p => p.id !== productId));
//         setCartItemsCount(prev => prev - 1);

//    };

    const handleProductSelection = (product) => {
        setSelectedProduct({}); 
        setTimeout(() => {setSelectedProduct(product); }, 0); 
    };

    

    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            cartItemsCount, 
            setCartItemsCount,
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
            addProductToCart,
            decrementProductQuantity,
            ItemIDCount,
            setItemIDCount
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