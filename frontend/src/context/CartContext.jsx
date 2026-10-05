import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";


const CartContext = createContext();


export function CartProvider({ children }) {

    const navigate = useNavigate();


    // ==========================================
    // CART STATE
    // ==========================================

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // GET CART FROM MONGODB
    // ==========================================

    const fetchCart = async () => {

        try {

            const token = localStorage.getItem("token");

            // User login nahi hai
            if (!token) {

                setCartItems([]);

                setLoading(false);

                return;

            }


            const response = await api.get("/cart");


            const cart = response.data.data;


            setCartItems(
                cart?.items || []
            );


        } catch (error) {

            console.error(
                "Fetch cart error:",
                error
            );

            setCartItems([]);

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD CART WHEN WEBSITE STARTS
    // ==========================================

    useEffect(() => {

        fetchCart();

    }, []);


    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCart = async (item) => {

        try {

            const token =
                localStorage.getItem("token");


            // User login nahi hai
            if (!token) {

                alert(
                    "Please login first to add food to your cart."
                );

                 navigate("/login");
                return;

            }

            else {

                const response = await api.post(
                    "/cart",
                    {
                        menuItem: item._id,

                        name: item.name,

                        price: Number(item.price),

                        image:
                            item.images?.[0] ||
                            item.image ||
                            "",

                        quantity: 1,
                    }
                );


                const cart =
                    response.data.data;


                setCartItems(
                    cart.items || []
                );
            }


        } catch (error) {

            console.error(
                "Add to cart error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to add item to cart."
            );

        }

    };


    // ==========================================
    // INCREASE QUANTITY
    // ==========================================

    const increaseQuantity = async (id) => {

        try {

            const item =
                cartItems.find(
                    (item) =>
                        item.menuItem === id ||
                        item.menuItem?._id === id
                );


            if (!item) return;


            const response = await api.patch(
                `/cart/${id}`,
                {
                    quantity:
                        item.quantity + 1,
                }
            );


            setCartItems(
                response.data.data.items || []
            );


        } catch (error) {

            console.error(
                "Increase quantity error:",
                error
            );

        }

    };


    // ==========================================
    // DECREASE QUANTITY
    // ==========================================

    const decreaseQuantity = async (id) => {

        try {

            const item =
                cartItems.find(
                    (item) =>
                        item.menuItem === id ||
                        item.menuItem?._id === id
                );


            if (!item) return;


            const newQuantity =
                item.quantity - 1;


            const response = await api.patch(
                `/cart/${id}`,
                {
                    quantity: newQuantity,
                }
            );


            setCartItems(
                response.data.data.items || []
            );


        } catch (error) {

            console.error(
                "Decrease quantity error:",
                error
            );

        }

    };


    // ==========================================
    // REMOVE FROM CART
    // ==========================================

    const removeFromCart = async (id) => {

        try {

            const response = await api.delete(
                `/cart/${id}`
            );


            setCartItems(
                response.data.data.items || []
            );


        } catch (error) {

            console.error(
                "Remove cart item error:",
                error
            );

        }

    };


    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = async () => {

        try {

            await api.delete("/cart");


            setCartItems([]);


        } catch (error) {

            console.error(
                "Clear cart error:",
                error
            );

        }

    };


    // ==========================================
    // TOTAL ITEMS
    // ==========================================

    const totalItems =
        cartItems.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),

            0
        );


    // ==========================================
    // TOTAL AMOUNT
    // ==========================================

    const totalAmount =
        cartItems.reduce(
            (total, item) =>
                total +
                Number(item.price || 0) *
                Number(item.quantity || 0),

            0
        );


    // ==========================================
    // PROVIDER
    // ==========================================

    return (

        <CartContext.Provider
            value={{

                cartItems,

                loading,

                fetchCart,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                totalItems,

                totalAmount,

            }}
        >

            {children}

        </CartContext.Provider>

    );

}


// ==========================================
// USE CART
// ==========================================

export function useCart() {

    return useContext(CartContext);

}

