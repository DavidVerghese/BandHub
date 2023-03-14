const usersReducer = (state = [], action)=>{
  switch (action.type) {
    case 'ADD':
      if (Array.isArray(action.payload))
        return [...state, ...action.payload]
      return [...state, action.payload]
    default: 
      return state
  }
}
export default usersReducer;
