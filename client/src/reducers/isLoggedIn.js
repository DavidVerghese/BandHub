const loggedInReducer = (state = false, action)=>{
  switch (action.type) {
    case 'LOG_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default: 
      return state
  }
};

export default loggedInReducer;
