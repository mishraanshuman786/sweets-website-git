"use client"
import { createContext, useEffect, useReducer ,useContext} from "react";
import { cartReducer, filterReducer } from "./Reducers";

const Cart=createContext();
const Context=({children})=>{
    
    const initialData = {
        products: [],
        cart: [],
      };

    const initialFilterData={
      sort:"raman",
      byRating:0,
      searchQuery:""
    }

   
    useEffect(() => {
        getContextProducts();
       
      }, []);


    // function to fetch products from database to add to context
    async function getContextProducts() {
        let productsdata = await fetch("api/products");
        productsdata = await productsdata.json();
        dispatch({ type: 'UPDATE_PRODUCTS', payload:productsdata.result });
    }
     

    //   useReducer hook to add state
      const [state,dispatch]=useReducer(cartReducer,initialData);
      const [filterState,filterDispatch]=useReducer(filterReducer,initialFilterData);


    return (
        <Cart.Provider value={{state,dispatch,filterState,filterDispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default Context;

export const CartState=()=>{
    return useContext(Cart);

}