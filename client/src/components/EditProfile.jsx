import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

function EditProfile({ baseURL, user, setUser, genres, setGenres,instruments,setInstruments,locations,setLocations, users,setUsers }) {
  const [editUser, setEditUser] = useState({...user,looking_for: user.looking_for.name});
  const [editErrors,setEditErrors] = useState([])
  const handleChange = e => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value
    })
  }
  let history = useHistory();
  function handleEdit(e) {
    e.preventDefault();
    console.log(editUser);

    fetch(`/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: editUser.name,
        email_address: editUser.email_address, 
        picture_url: editUser.picture_url,
        genre: editUser.genre_name,                                            
        instrument: editUser.instrument_name,                                        
        location: editUser.location_name, 
        looking_for: editUser.looking_for
      }),
     
    }).then(resp => {
     if (resp.ok) {
       
       resp.json().then(data => {
         
         setUser(data);
        //  if (!genres.includes(data.genre)) {
        //   setGenres([...genres,data.genre])
        //  }
         

        //  if (!instruments.includes(data.instrument)) {
        //   setInstruments([...instruments,data.instrument])
        //  }

        //  if (!instruments.includes(data.looking_for)) {
        //   setInstruments([...instruments,data.looking_for])
        //  }
         
        // if (!locations.includes(data.location)) {
        //   setLocations([...locations,data.location])
        // }
         setUsers(users.map((user) => user.id == data.id ? data : user ));
         history.push("/profiles");
          
         })
      }else {
         resp.json().then(json => setEditErrors(json.errors))
      }
   })

  }
  
  function handleDelete(e) {
    e.preventDefault();
  

    fetch(`/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
     
    }).then(resp => {
       
         
          setUser(null);
          
        })

  }

    return <div>
  <Form onSubmit={handleEdit}>
        <h2>My Profile</h2>
       
        {editErrors.map((error) => <p>{error}</p>)}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" name="name" value={editUser.name} onChange={handleChange}/>
      </Form.Group>

      

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your email address" name="email_address" value={editUser.email_address} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Picture URL</Form.Label>
        <Form.Control type="text" placeholder="Enter your picture url" name="picture_url" value={editUser.picture_url} onChange={handleChange}/>
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" placeholder="Enter your genre" name="genre_name" value={editUser.genre_name} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instrument</Form.Label>
        <Form.Control type="text" placeholder="Enter your instrument" name="instrument_name" value={editUser.instrument_name} onChange={handleChange}/>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Enter your location" name="location_name" value={editUser.location_name} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Looking For</Form.Label>
        <Form.Control type="text" placeholder="Enter what instrument you are looking for" name="looking_for" value={editUser.looking_for} onChange={handleChange}/>
      </Form.Group> */}

     
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      <Button onClick={handleDelete} variant="danger" type="submit">
        Delete account
      </Button>
  </div> 
  }
  
 

export default EditProfile;