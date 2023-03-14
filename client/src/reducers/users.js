const usersReducer = (state = [], action)=>{
  switch (action.type) {
    case 'ADD_USERS':
      return [...state, action.payload]
    case 'GET_USERS': 
      return action.payload
    default: 
      return state
  }
}
export default usersReducer;
