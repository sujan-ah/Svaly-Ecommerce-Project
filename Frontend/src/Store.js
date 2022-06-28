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

const initialState2 = {                              /* video: 24 Wishlist */
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems") 
    ? JSON.parse(localStorage.getItem("wishlistItems")) 
    : [] /* class 47 */
  },
};
function reducer2(state, action) {                   /* video: 24 Wishlist */
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

const userInitialState = {                           /* video: 32 User */
  userInfo: localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null
}
function userreducer (state, action) {               /* video: 32 User */
  switch (action.type) {
    case "USER_SIGNIN":
      return {...state, userInfo: action.payload}

    case "USER_LOGOUT":
      return {...state, userInfo: null}

      
      default:
      return state;
  }
}

const shippingInitialState = {                       /* video: 33 shipping */
  shippingaddress: localStorage.getItem("shippingaddress") 
  ? JSON.parse(localStorage.getItem("shippingaddress")) 
  : {}
}
function shippingreducer (state, action) {           /* video: 33 shipping */
  switch (action.type) {
    case "SHIPPING_ADDRESS":
      return {...state, shippingaddress: action.payload}

      default:
      return state;
  }
}

const paymentInitialState = {                        /* video: 41 payment */
  paymentMethod: localStorage.getItem("paymentMethod") 
  ? JSON.parse(localStorage.getItem("paymentMethod")) 
  : ""
}
function paymentreducer (state, action) {            /* video: 41 payment */
  switch (action.type) {
    case "PAYMENT_METHOD":
    return {...state, paymentMethod: action.payload}

    default:
    return state;
  }
}

const AdminUserInitialState = {                           /* video: 67 HW AdminUser*/
AdminUserInfo: localStorage.getItem("AdminUserInfo") 
  ? JSON.parse(localStorage.getItem("AdminUserInfo")) 
  : null
}
function AdminUserreducer (state, action) {               /* video: 67 HW AdminUser*/
  switch (action.type) {
    case "ADMINUSER_SIGNIN":
      return {...state, AdminUserInfo: action.payload}

      default:
      return state;
  }
}



function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);             
  const [state3, dispatch3] = useReducer(userreducer, userInitialState);    
  const [state4, dispatch4] = useReducer(shippingreducer, shippingInitialState); 
  const [state5, dispatch5] = useReducer(paymentreducer, paymentInitialState);
  const [AdminUserState, AdminUserDispatch] = useReducer(AdminUserreducer, AdminUserInitialState);


  const value = { state,dispatch, state2,dispatch2, state3,dispatch3, state4, dispatch4, state5, dispatch5, AdminUserState,AdminUserDispatch };  /* eta mane state: state, dispatch:dispatch */
  return <Store.Provider value={value}>
    {props.children}
  </Store.Provider>;
}

export { Store, StoreProvider };

 