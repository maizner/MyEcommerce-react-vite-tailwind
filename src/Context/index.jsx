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
    const [order, setOrder] = useState([])

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

   // Hook useEffect para actualizar el conteo total de productos en el carrito cuando cambie el carrito de productos
useEffect(() => {
    // Calcula el total de productos en el carrito y actualiza el estado correspondiente
    setCartItemsCount(
        // Reduce el array de productos en el carrito a un solo valor: el conteo total de productos
        cartProducts.reduce((total, product) =>
            // Suma la cantidad del producto actual al total acumulado
            total + product.quantity,
            // Valor inicial del total acumulado es 0
            0
        )
    );
    // Dependencia: el efecto se ejecutará cada vez que cambie el estado de cartProducts
}, [cartProducts]);


   
    // Función para añadir un producto al carrito o actualizar la cantidad si el producto ya está en el carrito
    const addProductToCart = (product) => {
        // Actualiza el estado de los productos en el carrito
        setCartProducts((prevCart) => {
            // Busca si el producto ya existe en el carrito
            const existingProduct = prevCart.find((item) => item.id === product.id);

            // Si el producto ya está en el carrito
            if (existingProduct) {
                // Mapea el carrito anterior a un nuevo carrito
                return prevCart.map((item) =>
                    // Si el ID del item es el mismo que el del producto añadido
                    item.id === product.id
                        // Actualiza la cantidad del producto existente en el carrito
                        ? { ...item, quantity: item.quantity + 1 }
                        // De lo contrario, mantiene el item tal como está
                        : item
                );
            } else {
                // Si el producto no está en el carrito, lo añade con una cantidad inicial de 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    

     // Decrementar cantidad del producto
    const decrementProductQuantity = (productId) => {

        setCartProducts(prevCart => 
            prevCart.map( p => 
                p.id === productId && p.quantity > 1 ? {...p, quantity: p.quantity - 1}:p
            ).filter(p => p.quantity > 0)
        );// Elimina productos con cantidad 0

    }

    const removeProductFromCart = (productId) => {
        setCartProducts((prevCart) => {
            return prevCart.filter((item) => item.id !== productId);
        });
      };


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
            ItemIDCount, setItemIDCount,
            order, setOrder
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