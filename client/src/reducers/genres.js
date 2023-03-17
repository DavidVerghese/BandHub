const genresReducer = (state = [], action)=>{

  switch (action.type) {
    case 'ADD_GENRE':
      return [...state, action.payload]
    case 'GET_GENRES': 
      return action.payload
    default: 
      return state
  }
}
export default genresReducer;
