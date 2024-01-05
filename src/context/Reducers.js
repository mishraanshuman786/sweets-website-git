export const cartReducer=(state,action)=>{
   switch(action.type){
    case 'ADD_TO_CART':
       return {
         ...state,cart:[...state.cart,{...action.payload}]
       };
    case 'REMOVE_FROM_CART':
      return{
        ...state,cart:state.cart.filter((c)=>c._id!==action.payload.id)
      }
    case 'UPDATE_PRODUCTS':
        return {
          ...state,
          products: action.payload,
        };
    case 'UPDATE_ID':
      return {
        ...state,
        idPrice: action.payload,
      };
      case 'UPDATE_PRODUCT': // New case for updating product rating and comment
      return state.products.map((item) =>
        item._id === action.payload.id
          ? { ...item, rating: action.payload.rating, comment: action.payload.comment }
          : item
      );
    default:
        return state;
   }

}

export const filterReducer=(state,action)=>{
  switch(action.type){
    case "SORT_BY_PRICE":
      return {...state,sort:action.payload};
    case "FILTER_BY_RATING":
      return {...state,byRating:action.payload};
    case "FILTER_BY_SEARCH":
      return {...state,searchQuery:action.payload};
    case "CLEAR_FILTERS":
      return {
        sort:"",
        byRating:0,
        searchQuery:""
      }
    default:
       return state;
  }
}