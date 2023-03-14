export const logIn = ()=> {
  return {
    type: 'LOG_IN'
  };
};

export const signOut = ()=> {
  return {
    type: 'SIGN_OUT'
  };
};

export const addUser = (user)=> {
  return {
    type: 'ADD',
    payload: user
  };
};

