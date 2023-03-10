import './App.css';
import { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home.jsx"
import AllProfiles from "./components/AllProfiles.jsx"
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import NoMatch from './components/NoMatch/NoMatch';
import NoAuthorization from './components/NoAuthorization/NoAuthorization';
import EditProfile from './components/EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from './actions';

function App() {
  const [users, setUsers] = useState([]);
  
  const baseURL = process.env.NODE_ENV === 'production' ?  `https://join-the-band-api.herokuapp.com` : ``
  const [user, setUser] = useState(false);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  console.log(isLoggedIn);

  useEffect(() => {
    fetch(`/api/me`)
    .then(resp => {
        if(resp.ok){
          resp.json().then(data => {
           console.log(data);
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
        setUsers(data);
      });
  }, [user]);

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(`/api/genres`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);
   
  const [instruments, setInstruments] = useState([]);
  const [locations, setLocations] = useState([]);

  
  useEffect(() => {
    fetch(`/api/instruments`)
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/locations`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  return (
    <div>
      <main>
        {/* <button onClick={() => dispatch(signIn())}>Sign In</button>
        <button onClick={() => dispatch(signOut())}>Sign Out</button>
         */}
        <Header user={user} setUser={setUser} />
      <Switch>
      <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/login">
          <Login user={user} setUser={setUser} baseURL={baseURL} instruments={instruments} setInstruments={setInstruments} locations={locations} setLocations={setLocations} genres={genres} setGenres={setGenres} users={users} setUsers={setUsers} />
        </Route>

        <Route exact path="/signup">
          <Signup baseURL={baseURL} instruments={instruments} setInstruments={setInstruments} locations={locations} setLocations={setLocations} genres={genres} setGenres={setGenres} users={users} setUsers={setUsers}setUser={setUser} />
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
            {isLoggedIn ?  <AllProfiles user={user} baseURL={baseURL} genres={genres} instruments={instruments} locations={locations} users={users}/> : <NoAuthorization webpage={'Profiles'} />}
          </Route>
          
          <Route path="/edit-profile">
            {isLoggedIn ? <EditProfile baseURL={baseURL}  user={user} setUser={setUser} instruments={instruments} setInstruments={setInstruments} locations={locations} setLocations={setLocations} genres={genres} setGenres={setGenres} users={users} setUsers={setUsers} /> : <NoAuthorization webpage={'Edit Profile'} />}
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
