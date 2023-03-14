const instrumentsReducer = (state = [], action)=>{

  switch (action.type) {
    case 'ADD_INSTRUMENT':
      return [...state, action.payload]
    case 'GET_INSTRUMENTS': 
      return action.payload
    default: 
      return state
  }
}
export default instrumentsReducer;
