import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

function Signup({baseURL,genres,setGenres,instruments,setInstruments,locations,setLocations, users,setUsers, setUser}) {
  let history = useHistory();
  const [signupUser, setSignupUser] = useState({
    username: "",
    password: "",
    email_address: "", 
    picture_url: "",
    genre: "",                                            
    instrument: "",                                        
    location: "", 
    looking_for: ""
  });
  
  const [signupErrors, setSignupErrors] = useState([]);

  const handleSubmitSignUp = e => {

    e.preventDefault();

    fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: signupUser.username,
        password: signupUser.password,
        email_address: signupUser.email_address, 
        picture_url: signupUser.picture_url,
        genre: signupUser.genre,                                            
        instrument: signupUser.instrument,                                        
        location: signupUser.location, 
        looking_for: signupUser.looking_for
      }),
     
    }).then(resp => {
      if (resp.ok) {
        // debugger;
        resp.json().then(data => {
          setSignupErrors([])
          if (!genres.includes(data.genre)) {
            setGenres([...genres,data.genre])
          }
          if (!instruments.includes(data.instrument)) {
            setInstruments([...instruments,data.instrument])
          }
          if (!locations.includes(data.location)) {
            setLocations([...locations,data.location])
          }
          if (!instruments.includes(data.looking_for)) {
            setInstruments([...instruments,data.looking_for])
          }
          setUser(data);
          setUsers([...users, data]);
          
          history.push("/profiles");
          
         })
      }else {
         resp.json().then(json => setSignupErrors(json.errors))
      }
   })

  } 

  const handleChange = e => {
    setSignupUser({
      ...signupUser,
      [e.target.name]: e.target.value
    })
  }

  const [displayGenreInput, setDisplayGenreInput] = useState(false);
  const [displayInstrumentInput, setDisplayInstrumentInput] = useState(false)
  const [displayLocationInput, setDisplayLocationInput] = useState(false)
  const [displayLookingForInput,setDisplayLookingForInput] = useState(false)


  console.log(genres,instruments,locations)

  return <div className="login-or-signup">
    
<Form  onSubmit={handleSubmitSignUp}>
      <h2>Sign Up</h2>
      {signupErrors.map((signupError) => <><em>{signupError}</em><br></br></>)}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" name="username" value={signupUser.username} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password"  value={signupUser.password} onChange={ handleChange } />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your email address" name="email_address" value={signupUser.email_address} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Picture URL</Form.Label>
        <Form.Control type="text" placeholder="Enter your picture url" name="picture_url" value={signupUser.picture_url} onChange={handleChange}/>
      </Form.Group>

      {/* the condition was originally displayGenreInput: */}
      {/* I took out the other option as well*/}
      {true ?
         <Form.Group className="mb-3">
         <Form.Label>Genre</Form.Label>
          <Form.Select onChange={(e) => { if (e.target.value === 'Other') { setDisplayGenreInput(true) } else {setSignupUser({...signupUser,genre:e.target.value})} }}>
          <option value="" disabled selected>Select your genre</option>
          {genres.map((genre) => <option value={genre.name}>{genre.name}</option>)}
          {/* <option>Other</option> */}
          </Form.Select>
          <Form.Text className="text-muted">
          {/* If you do not see your genre, select 'Other' */}
        </Form.Text>
        </Form.Group> : null}
      {false ? <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" placeholder="Enter your genre" name="genre" value={signupUser.genre} onChange={handleChange}/>
      </Form.Group> : null}

      {/* the condition was originally displayInstrumentInput: */}
      {true ?
         <Form.Group className="mb-3">
         <Form.Label>Instrument</Form.Label>
          <Form.Select onChange={(e) => { if (e.target.value === 'Other') { setDisplayInstrumentInput(true) } else {setSignupUser({...signupUser,instrument:e.target.value})} }}>
          <option value="" disabled selected>Select your instrument</option>
          {instruments.map((instrument) => <option value={instrument.name}>{instrument.name}</option>)}
          {/* <option>Other</option> */}
          </Form.Select>
          <Form.Text className="text-muted">
          {/* If you do not see your instrument, select 'Other' */}
        </Form.Text>
        </Form.Group> : null}
      {false ? <Form.Group className="mb-3">
        <Form.Label>Instrument</Form.Label>
        <Form.Control type="text" placeholder="Enter your instrument" name="instrument" value={signupUser.instrument} onChange={handleChange} />
        <Form.Text className="text-muted">
          Enter in your instrument
        </Form.Text>
      </Form.Group> : null}

      {/* the condition was originally displayLocationInput: */}
   
      {true ?
         <Form.Group className="mb-3">
         <Form.Label>Location</Form.Label>
          <Form.Select onChange={(e) => { if (e.target.value === 'Other') { setDisplayLocationInput(true) } else {setSignupUser({...signupUser,location:e.target.value})} }}>
          <option value="" disabled selected>Select your location</option>
          {locations.map((location) => <option value={location.name}>{location.name}</option>)}
          {/* <option>Other</option> */}
          </Form.Select>
          <Form.Text className="text-muted">
          {/* If you do not see your location, select 'Other' */}
        </Form.Text>
        </Form.Group> : null}
      {false ? <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Enter your location" name="location" value={signupUser.location} onChange={handleChange}/>
      </Form.Group> : null}

      {/* the condition was originally displayLookingForInput: */}
      {true ?
         <Form.Group className="mb-3">
         <Form.Label>Looking For</Form.Label>
          <Form.Select onChange={(e) => { if (e.target.value === 'Other') { setDisplayLookingForInput(true) } else {setSignupUser({...signupUser,looking_for:e.target.value})} }}>
          <option value="" disabled selected>Select the instrument you want to collaborate with</option>
          {instruments.map((instrument) => <option value={instrument.name}>{instrument.name}</option>)}
          {/* <option>Other</option> */}
          </Form.Select>
          <Form.Text className="text-muted">
          {/* If you do not see the instrument you want to collaborate with, select 'Other' */}
        </Form.Text>
        </Form.Group> : null}
      {false ? <Form.Group className="mb-3">
        <Form.Label>Looking For</Form.Label>
        <Form.Control type="text" placeholder="Enter the instrument you are looking for" name="looking_for" value={signupUser.looking_for} onChange={handleChange} />
        <Form.Text className="text-muted">
         {/* Enter the instrument you want to collaborate with */}
        </Form.Text>
      </Form.Group> : null}


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
}
export default Signup;