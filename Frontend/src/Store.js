import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : [] /* class 47 */
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEMS":
    /* class 46 */
    const newItem = action.payload;
    // console.log(newItem);
    const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
    const cartItems = existingItem 
    ? state.cart.cartItems.map((item) =>item._id === existingItem._id 
      ? newItem 
      : item)
    : [...state.cart.cartItems, newItem];

    localStorage.setItem("cartItems",JSON.stringify(cartItems)) /* class 47 */

    // console.log(cartItems);
    return { 
      ...state, 
      cart: {
        ...state.cart,cartItems
      } 
    };
    /* class 46 */

    {/* class 47 */}

    case 'CLEAR_CART':{    /* Vedio 45 */
      return { 
        ...state, 
        cart: { 
          ...state.cart, cartItems: []
        } 
      }; 
    }


    case "CART_REMOVE_ITEMS":{      /* Cart delete Part */
      const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)

      localStorage.setItem("cartItems",JSON.stringify(cartItems)) /* class 47 */

      return { 
        ...state, 
        cart: { 
          ...state.cart,cartItems
        } 
      };
    }
    {/* class 47 */}
    default:
    return state;
  }
}


/* video no: 24 Wishlist */
const initialState2 = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems") 
    ? JSON.parse(localStorage.getItem("wishlistItems")) 
    : [] /* class 47 */
  },
};

function reducer2(state, action) {
  switch (action.type) {
    case "WISHLIST_ADD_ITEMS":
    /* class 46 */
    const newItem = action.payload;
    // console.log(newItem);
    const existingItem = state.wishlist.wishlistItems.find((item) => item._id === newItem._id);
    const wishlistItems = existingItem 
    ? state.wishlist.wishlistItems.map((item) =>item._id === existingItem._id 
      ? newItem 
      : item)
    : [...state.wishlist.wishlistItems, newItem];

    localStorage.setItem("cartItems",JSON.stringify(wishlistItems)) /* class 47 */

    // console.log(cartItems);
    return { 
      ...state, 
      wishlist: {
        ...state.wishlist,wishlistItems
      } 
    };
    /* class 46 */

    {/* class 47 */}
    case "WISHLIST_REMOVE_ITEMS":{      /* Cart delete Part */
      const wishlistItems = state.wishlist.wishlistItems.filter((item)=> item._id !== action.payload._id)

      localStorage.setItem("wishlistItems",JSON.stringify(wishlistItems)) /* class 47 */

      return { 
        ...state, 
        wishlist: { 
          ...state.wishlist,wishlistItems
        } 
      };
    }
    {/* class 47 */}
    default:
    return state;
  }
}
/* video no: 24 Wishlist */

/* video no: 32 User */
const userInitialState = {
  userInfo: localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null
}

function userreducer (state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return {...state, userInfo: action.payload}

    case "USER_LOGOUT":
      return {...state, userInfo: null}

      
      default:
      return state;
  }
}
/* video no: 32 User */

/* video no: 33 User */
const shippingInitialState = {
  shippingaddress: localStorage.getItem("shippingaddress") 
  ? JSON.parse(localStorage.getItem("shippingaddress")) 
  : {}
}

function shippingreducer (state, action) {
  switch (action.type) {
    case "SHIPPING_ADDRESS":
      return {...state, shippingaddress: action.payload}

      default:
      return state;
  }
}
/* video no: 33 User */

/* video no: 41 payment */
const paymentInitialState = {
  paymentMethod: localStorage.getItem("paymentMethod") 
  ? JSON.parse(localStorage.getItem("paymentMethod")) 
  : ""
}

function paymentreducer (state, action) {
  switch (action.type) {
    case "PAYMENT_METHOD":
    return {...state, paymentMethod: action.payload}

    default:
    return state;
  }
}
/* video no: 41 User */







function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);  /* v: 24 Wishlist */
  const [state3, dispatch3] = useReducer(userreducer, userInitialState);  /* v: 24 Wishlist */
  const [state4, dispatch4] = useReducer(shippingreducer, shippingInitialState);/* v: 24 Wishlist */ 
  const [state5, dispatch5] = useReducer(paymentreducer, paymentInitialState);


  const value = { state,dispatch, state2,dispatch2, state3,dispatch3, state4, dispatch4, state5, dispatch5 };  /* eta mane state: state, dispatch:dispatch */
  return <Store.Provider value={value}>
    {props.children}
  </Store.Provider>;
}

export { Store, StoreProvider };

 