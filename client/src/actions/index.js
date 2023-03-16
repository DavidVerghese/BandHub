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


export const getUsers = (users)=> {
  return {
    type: 'GET_USERS',
    payload: users
  };
};

export const addInstrument = (instrument)=> {
  return {
    type: 'ADD_INSTRUMENT',
    payload: instrument
  };
};

export const getInstruments = (instruments)=> {
  return {
    type: 'GET_INSTRUMENTS',
    payload: instruments
  };
};

export const addGenre = (genre)=> {
  return {
    type: 'ADD_GENRE',
    payload: genre
  };
};

export const getGenres = (genres)=> {
  return {
    type: 'GET_GENRES',
    payload: genres
  };
};
