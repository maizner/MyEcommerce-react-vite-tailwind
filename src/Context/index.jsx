import { createContext,useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.jsx';
import { totalPrice } from '../Utils';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => { 
    const { parsedAccount, parsedSignOut } = useLocalStorage();
    //States *****

    //product items
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    //product counter for navbar and sidebar
    const [cartItemsCount, setCartItemsCount] = useState(0);
    //Account states
    const [account, setAccount] = useState(parsedAccount);
    const [signOut, setSignOut] = useState(parsedSignOut);
    //Conditional rendering swap url´s within components
    const [view, setView] = useState('user-info');
    //Sidebar
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
    //ProductDetail
    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    //ShoppingCart
    const [isVisibleCart, setIsVisibleCart] = useState(false);
    const [cartProducts, setCartProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    //ShoppingCart
    const [searchByTitle, setSearchByTitle] = useState('')
    //Purchase =>  MyOrder/MyOrders
    const [order, setOrder] = useState([])
    //Checkout
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [searchByCategory, setSearchByCategory] = useState('')
  
    
    //Effects & Functions ***** 
    
    // Fetch product data
    useEffect(()=> {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
    }, [])
    
    // Filter products based on title and category
    useEffect(() => {
        let filtered = items;
        if (searchByTitle) {
            filtered = filteredByTitle(filtered, searchByTitle);
        }
        if (searchByCategory.length) {
            filtered = filteredByCategory(filtered, searchByCategory);
        }
        setFilteredItems(filtered);
    }, [items, searchByTitle, searchByCategory]);
    // Show product detail when a product is selected
    useEffect( () => {
        if (selectedProduct && Object.keys(selectedProduct).length > 0){
            openDetail();
        }
    }, [selectedProduct])
    // Show cart when products are added
    useEffect( () => {
        if (cartProducts && cartProducts.length > 0){
            openCart();
        }
    }, [cartProducts])
    
     // Sync account and sign-out state with localStorage
    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account));
        localStorage.setItem('sign-out', JSON.stringify(signOut));
    }, [account, signOut]);
    
    // Update cart item count when products change
        useEffect(() => {
            setCartItemsCount(calculateTotalItems(cartProducts));
        }, [cartProducts]);
    
    //Functions *****
    // Open product detail
    const openDetail = () => {
        setIsVisibleDetail(true);
        setIsVisibleCart(false);
    };
    // Open cart
    const openCart = () => {
        setIsVisibleCart(true);
        setIsVisibleDetail(false);
    };
    // Close both sidebars
    const closeSidebar = () => {
        setIsVisibleDetail(false);
        setIsVisibleCart(false);
        setSelectedProduct({});
    };
    // Get unique product categories
    const getUniqueCategories = () => {
        const categories = items?.map(product => product.category);
        return [...new Set(categories)]; // Eliminar duplicados
    };
    // Filter by category
    const filteredByCategory = (items, category) => {
        return items?.filter(item => item.category === category
        )
    };
    // Filter by title
    const filteredByTitle = (items, searchByTitle) => {
        return items?.filter(item => 
            item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        )
    };
    // Calculate total items in cart
    const calculateTotalItems = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.quantity, 0);
    };
    // Add product to cart
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
        setIsCollapsedSidebar(false);
        
    };
    // Decrease product quantity in cart
    const decrementProductQuantity = (productId) => {

        setCartProducts(prevCart => 
            prevCart.map( p => 
                p.id === productId && p.quantity > 1 ? {...p, quantity: p.quantity - 1}:p
            ).filter(p => p.quantity > 0)
        );

    }
    // Remove product from cart
    const removeProductFromCart = (productId) => {
        setCartProducts((prevCart) => {
            return prevCart.filter((item) => item.id !== productId);
        });
    };
    // Handle checkout and create new order
    const handleCheckout = () => {
        const date = new Date();
        const orderToAdd = {
            date: date.toLocaleDateString(),
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        }
        setOrder([...order, orderToAdd]);
        setCartProducts([]);
        setCheckoutCompleted(true); 
        closeSidebar();
    }
    // Select product for detail view
    const handleProductSelection = (product) => {
        setSelectedProduct(product);
    };


    return (

        <CartContext.Provider value={{
            items, 
            setItems,
            order,
            setOrder,
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
            searchByTitle, 
            setSearchByTitle,
            filteredItems, 
            setFilteredItems,
            searchByCategory, 
            setSearchByCategory,
            getUniqueCategories,
            account, 
            setAccount,
            signOut, 
            setSignOut,
            checkoutCompleted, 
            setCheckoutCompleted,
            pendingCheckout, 
            setPendingCheckout,
            handleCheckout,
            view, 
            setView,
            isCollapsedSidebar, 
            setIsCollapsedSidebar
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