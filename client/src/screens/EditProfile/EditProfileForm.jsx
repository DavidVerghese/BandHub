import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import {  useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import './EditProfileForm.css';
import { useDispatch } from "react-redux";
import { signOut } from "../../actions";

function EditProfileForm({ user, setUser }) {

  const instruments = useSelector(state => state.instruments);
  const genres = useSelector(state => state.genres);
  const locations = useSelector(state => state.locations);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email_address);
  const [pictureUrl, setPictureUrl] = useState(user.picture_url);
  
  // const [genre, setGenre] = useState(user.genre.name);
  // const [instrument, setInstrument] = useState(user.instrument.name);
  // const [location, setLocation] = useState(user.location.name);
  // const [lookingFor, setLookingFor] = useState(user.looking_for.name);

    const [genre, setGenre] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [location, setLocation] = useState([]);
  const [lookingFor, setLookingFor] = useState([]);
  
  useEffect(() => {
    const { genre, instrument, location, looking_for } = user;

    if (genre && genre.name) {
      setGenre(genre.name);
    }
    if (instrument && instrument.name) {
      setInstrument(instrument.name);
    }
    if (location && location.name) {
      setLocation(location.name);
    };
    if (looking_for && looking_for.name) {
      setLookingFor(looking_for.name);
    }
  }, [user]);

  console.log(user);
  function handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name,
      email_address: email,
      picture_url: pictureUrl,
      genre,
      instrument,
      location,
      looking_for: lookingFor,
    };
    
    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Updated user:', data);
      setUser(updatedUser);
      history.push("/profiles");
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  
  const handleDelete = () => {
    fetch(`/api/users/${user.id}`, {
      method: "DELETE"
    })
    .then(response => {
      // handle response
      dispatch(signOut());
      setUser(null);
      history.push("/");
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  };

  return (
    <div className="edit-profile-form">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email Address:</Form.Label>
        <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="pictureUrl">
        <Form.Label>Picture URL:</Form.Label>
        <Form.Control type="text" value={pictureUrl} onChange={(event) => setPictureUrl(event.target.value)} />
      </Form.Group>

        {genre &&  <Form.Group controlId="genre">
      <Form.Label>Genre:</Form.Label>
        <Form.Select value={genre} aria-label="Default select example" onChange={(event) => setGenre(event.target.value)}>
      {genres.map((genre) => (
        <option key={genre.name} value={genre.name}>{genre.name}</option>
      ))}
        </Form.Select>
      </Form.Group>}
     

        {instrument && <Form.Group controlId="instrument">
          <Form.Label>Instrument:</Form.Label>
          <Form.Select value={instrument} aria-label="Default select example" onChange={(event) => setInstrument(event.target.value)}>
            {instruments.map((instrument) => (
              <option key={instrument.name} value={instrument.name}>{instrument.name}</option>
            ))}
          </Form.Select>
        </Form.Group>}

        {location && <Form.Group controlId="location">
          <Form.Label>Location:</Form.Label>
          <Form.Select value={location} onChange={(event) => setLocation(event.target.value)}>
            {locations.map((location) => (
              <option key={location.name}>{location.name}</option>
            ))}
          </Form.Select>
        </Form.Group>}

        {lookingFor && <Form.Group controlId="lookingFor">
          <Form.Label>Looking For:</Form.Label>
          <Form.Select value={lookingFor} aria-label="Default select example" onChange={(event) => setLookingFor(event.target.value)}>
            {instruments.map((instrument) => (
              <option key={instrument.name} value={instrument.name}>{instrument.name}</option>
            ))}
          </Form.Select>
        </Form.Group>}

      <Button variant="primary" type="submit">Save</Button>
      </Form>

      <Button variant="danger" onClick={handleDelete}>
      Delete account
    </Button>
    </div>
  );
}

export default EditProfileForm;