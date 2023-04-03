import './App.css';
import { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./screens/Home/Home.jsx"
import AllProfiles from "./screens/AllProfiles/AllProfiles.jsx"
import Login from './screens/Login/Login';
import Signup from './screens/SignUp/Signup';
import Header from './components/Header/Header';
import Header2 from './components/Header2';
import NoMatch from './screens/NoMatch/NoMatch';
import NoAuthorization from './screens/NoAuthorization/NoAuthorization';
import EditProfileForm from './screens/EditProfile/EditProfileForm';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, getUsers, getInstruments, getGenres, getLocations } from './actions';

function App() {
  
  const baseURL = process.env.NODE_ENV === 'production' ?  `https://join-the-band-api.herokuapp.com` : ``
  const [user, setUser] = useState(false);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/me`)
    .then(resp => {
        if(resp.ok){
          resp.json().then(data => {
            setUser(data);
            dispatch(logIn());
              //  data.error? setLoggedIn(false) : setLoggedIn(true)
            })
        }else {
            // resp.json().then(data => setErrors(data.error))
        }
    })
   
  }, [])
  
  useEffect(() => {
    fetch(`/api/users`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getUsers(data));
      });
  }, [user]);

  useEffect(() => {
    fetch(`/api/genres`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getGenres(data));
      });
  }, []);
  
  useEffect(() => {
    fetch(`/api/instruments`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getInstruments(data));
      });
  }, []);

  useEffect(() => {
    fetch(`/api/locations`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getLocations(data));
      });
  }, []);

  return (
    <div>
      <main>
        {/* <button onClick={() => dispatch(signIn())}>Sign In</button>
        <button onClick={() => dispatch(signOut())}>Sign Out</button>
         */}
        {/* <Header user={user} setUser={setUser} /> */}
        <Header2 user={user} setUser={setUser} />
      <Switch>
      <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/login">
          <Login user={user} setUser={setUser} baseURL={baseURL}   />
        </Route>

        <Route exact path="/signup">
          <Signup baseURL={baseURL}  setUser={setUser} />
        </Route>
       {/* <Route exact path="/profiles">
            <AllProfiles user={user} baseURL={baseURL} genres={genres} instruments={instruments} locations={locations} users={users}/>
          </Route> */}
          {/* {user? <><Route path="/edit-profile">
                <EditProfile user={user} setUser={setUser}  instruments={instruments} setInstruments={setInstruments} locations={locations} setLocations={setLocations} genres={genres} setGenres={setGenres} users={users} setUsers={setUsers}  />
          </Route>
          <Route exact path="/profiles">
            <AllProfiles user={user} baseURL={baseURL} genres={genres} instruments={instruments} locations={locations} users={users}/>
          </Route>
          </> : <><Route exact patch="/profiles"><NoAuthorization/></Route></>}
             */}
         
          <Route exact path="/profiles">
            {isLoggedIn ?  <AllProfiles user={user} baseURL={baseURL} /> : <NoAuthorization webpage={'Profiles'} />}
          </Route>
          
          <Route path="/edit-profile">
            {isLoggedIn && user ? <EditProfileForm  user={user} setUser={setUser}  /> : <NoAuthorization webpage={'Edit Profile'} />}
          </Route>
          

        
            <Route exact path="*">
              <NoMatch/>
              </Route>
        </Switch>

      </main>
    </div>
  );
}

export default App;
