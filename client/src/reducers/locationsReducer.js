const locationsReducer = (state = [], action)=>{

  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, action.payload]
    case 'GET_LOCATIONS': 
      return action.payload
    default: 
      return state
  }
}
export default locationsReducer;
