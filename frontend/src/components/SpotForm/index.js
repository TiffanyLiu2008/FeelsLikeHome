import './SpotForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot, updateSpot } from '../../store/spots';

const SpotForm = ({ spot, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [preview, setPreview] = useState(spot?.preview);
  const [url, setUrl] = useState(spot?.url);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = { ...spot, country, address, city, state, lat, lng, description, name, price, preview, url };
    let newSpot;
    if (formType === 'Update Spot') {
      newSpot = await dispatch(updateSpot(spot));
    } else {
      newSpot = await dispatch(createSpot(spot));
    }
    if (newSpot.id) {
      history.push(`/spots/${newSpot.id}`);
    } else {
      const {errors} = await newSpot.json();
      setErrors(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <h3>Where's your place located?</h3>
      <h4>Guests will only get your exact address once they booked a reservation.</h4>
      <div className="errors">{errors.country}</div>
      <label>
        Country
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
      </label>
      <div className="errors">{errors.address}</div>
      <label>
        Street Address
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
      </label>
      <div className="errors">{errors.city}</div>
      <label>
        City
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
      </label>
      <div className="errors">{errors.state}</div>
      <label>
        State
        <input type="text" value={state} onChange={(e) => setState(e.target.value)}/>
      </label>
      <div className="errors">{errors.lat}</div>
      <label>
        Latitude
        <input type="text" value={lat} onChange={(e) => setLat(e.target.value)}/>
      </label>
      <div className="errors">{errors.lng}</div>
      <label>
        Langitude
        <input type="text" value={lng} onChange={(e) => setLng(e.target.value)}/>
      </label>
      <h3>Describe your place to guests</h3>
      <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
      <div className="errors">{errors.description}</div>
      <label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <h3>Create a title for your spot</h3>
      <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
      <div className="errors">{errors.name}</div>
      <label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <h3>Set a base price for your spot</h3>
      <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
      <div className="errors">{errors.price}</div>
      <label>
        $ <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
      </label>
      <h3>Liven up your spot with photos</h3>
      <h4>Submit a link to at least one photo to publish your spot.</h4>
      <div className="errors">{errors.preview}</div>
      <label>
        <input type="text" value={preview} onChange={(e) => setPreview(e.target.value)}/>
      </label>
      <div className="errors">{errors.url}</div>
      <label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;