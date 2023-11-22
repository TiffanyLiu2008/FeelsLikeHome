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
  const [url1, setUrl1] = useState(spot?.url1);
  const [url2, setUrl2] = useState(spot?.url2);
  const [url3, setUrl3] = useState(spot?.url3);
  const [url4, setUrl4] = useState(spot?.url4);
  const [errors, setErrors] = useState({});
  const title = formType === 'Create Spot' ? 'Create a New Spot' : 'Update Your Spot';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = {...spot, country, address, city, state, lat, lng, description, name, price, preview, url1, url2, url3, url4};
    let newSpot;
    if (formType === 'Update Spot') {
      dispatch(updateSpot(spot))
      .then((newSpot) => history.push(`/spots/${newSpot.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    } else if (formType === 'Create Spot') {
      dispatch(createSpot(spot))
      .then((newSpot) => history.push(`/spots/${newSpot.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
  };
  const countryError = errors.country ? 'Country: ' + errors.country : null;
  const addressError = errors.address ? 'Address: ' + errors.address : null;
  const cityError = errors.city ? 'City: ' + errors.city : null;
  const stateError = errors.state ? 'State: ' + errors.state : null;
  const latError = errors.lat ? 'Latitude: ' + errors.lat : null;
  const lngError = errors.lng ? 'Longitude: ' + errors.lng : null;
  const descriptionError = errors.description ? 'Description: ' + errors.description : null;
  const nameError = errors.name ? 'Name: ' + errors.name : null;
  const priceError = errors.price ? 'Price: ' + errors.price : null;
  return (
    <div className='body'>
    <form className='form' onSubmit={handleSubmit}>
      <p className='heading'>{title}</p>
      <div className='errors'>
        <ul >{countryError}</ul>
        <ul>{addressError}</ul>
        <ul>{cityError}</ul>
        <ul>{stateError}</ul>
        <ul>{latError}</ul>
        <ul>{lngError}</ul>
        <ul>{descriptionError}</ul>
        <ul>{nameError}</ul>
        <ul>{priceError}</ul>
      </div>
      <p className='subheading'>Where's your place located?</p>
      <p className='nomal'>Guests will only get your exact address once they booked a reservation.</p>
      <div className='normal'>
      <label>
        Country<br/>
        <input type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)}/><br/>
      </label>
      <label>
        Street Address<br/>
        <input type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}/><br/>
      </label>
      <label>
        City
        <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
      </label>
      <label>
        ,
        State
        <input type="text" value={state} placeholder="STATE" onChange={(e) => setState(e.target.value)}/><br/>
      </label>
      <label>
        Latitude
        <input type="text" value={lat} placeholder="Latitude" onChange={(e) => setLat(e.target.value)}/>
      </label>
      <label>
        ,
        Longitude
        <input type="text" value={lng} placeholder="Longitude" onChange={(e) => setLng(e.target.value)}/><br/>
      </label>
      </div>
      <p className='subheading'>Describe your place to guests</p>
      <p className='normal'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
      <label className='normal'>
        <textarea className='normal' value={description} placeholder="Please write at least 30 characters." onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <p className='subheading'>Create a title for your spot</p>
      <p className='normal'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <label className='normal'>
        <input className='input' type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}/>
      </label>
      <p className='subheading'>Set a base price for your spot</p>
      <p className='normal'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
      <label className='normal'>
        $ <input className='input' type="text" value={price} placeholder="Price per night(USD)" onChange={(e) => setPrice(e.target.value)}/>
      </label>
      <p className='subheading'>Liven up your spot with photos</p>
      <p className='normal'>Submit a link to at least one photo to publish your spot.</p>
      <div className='normal'>
      <label>
        <input type="text" value={preview} placeholder="Preview Image URL" onChange={(e) => setPreview(e.target.value)}/><br/>
      </label>
      <label>
        <input type="text" value={url1} placeholder="Image URL" onChange={(e) => setUrl1(e.target.value)}/><br/>
      </label>
      <label>
        <input type="text" value={url2} placeholder="Image URL" onChange={(e) => setUrl2(e.target.value)}/><br/>
      </label>
      <label>
        <input type="text" value={url3} placeholder="Image URL" onChange={(e) => setUrl3(e.target.value)}/><br/>
      </label>
      <label>
        <input type="text" value={url4} placeholder="Image URL" onChange={(e) => setUrl4(e.target.value)}/><br/>
      </label>
      </div>
      <button className='submitFormButton' type="submit">{formType}</button>
    </form>
    </div>
  );
};

export default SpotForm;
