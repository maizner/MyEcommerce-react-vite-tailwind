import { createContext,useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.jsx';
import PropTypes from 'prop-types'; 


const CartContext = createContext();

const CartProvider = ({children}) => { 
    const { parsedAccount, parsedSignOut } = useLocalStorage();
    //States factory
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);
      // My Account: Inicializa el estado usando los valores de localStorage.
  //  account = useState({})
  //  signOut = useState(false)
   const [account, setAccount] = useState(parsedAccount);
   const [signOut, setSignOut] = useState(parsedSignOut);

  //Estado 
  const [order, setOrder] = useState([])

    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    const [isVisibleCart, setIsVisibleCart] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({})
    const [cartProducts, setCartProducts] = useState([])

    const [searchByTitle, setSearchByTitle] = useState('')
    const [searchByCategory, setSearchByCategory] = useState('')
  

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
    
   
    //Obtener un conjunto único de categorías.
    const getUniqueCategories = () => {
        const categories = items?.map(product => product.category);
        return [...new Set(categories)]; // Eliminar duplicados
    };
    //Obtener solo los productos que coinciden exactamente con la categoría que se pasa como argumento (category).
    const filteredByCategory = (items, category) => {
        return items?.filter(item => item.category === category
        )
    };
    //Obtener solo los productos que coinciden el título que se pasa como argumento(searchByTitle) y se captura en el input (setSearchByTitle).
    const filteredByTitle = (items, searchByTitle) => {
        return items?.filter(item => 
            item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        )
    };

    //Effects  

    useEffect(()=> {

        fetch('https://fakestoreapi.com/products')
        // fetch(' https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        // .then(response => console.log(response.json()))
        .then(data => setItems(data))
        
    }, [])

    //En este efecto se unifica el concepto de filtrado y se tiene en cuenta el filtrado múltiple 
    //para que el estado filteredItems se modifica dependiendo del flitro que se tenga que aplicar
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
    
    
  // Sincronizo el estado de signOut y account con localStorage.
  useEffect(() => {
    localStorage.setItem('account', JSON.stringify(account));
    localStorage.setItem('sign-out', JSON.stringify(signOut));
  }, [account, signOut]);


    // Reduce el array de productos en el carrito a un solo valor: el conteo total de productos y  
    //Suma la cantidad del producto actual al total acumulado. El Valor inicial del total acumulado es 0
    const calculateTotalItems = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.quantity, 0);
    };

    // Hook useEffect para actualizar el conteo total de productos en el carrito cuando cambie el carrito de productos
    useEffect(() => {
        setCartItemsCount(calculateTotalItems(cartProducts));
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