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
  const reset = () => {
    setCountry('');
    setAddress('');
    setCity('');
    setState('');
    setLat('');
    setLng('');
    setDescription('');
    setName('');
    setPrice('');
    setPreview('');
    setUrl('');
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const currErrors = {};
    if (!country) {
      currErrors.country = 'Country is required';
    }
    if (!address) {
      currErrors.address = 'Address is required';
    }
    if (!city) {
      currErrors.city = 'City is required';
    }
    if (!state) {
      currErrors.state = 'State is required';
    }
    if (!lat) {
      currErrors.lat = 'Latitude is required';
    }
    if (!lng) {
      currErrors.lng = 'Longitude is required';
    }
    if (description.length < 30) {
      currErrors.description = 'Description needs a minimum of 30 characters';
    }
    if (!name) {
      currErrors.name = 'Name is required';
    }
    if (!price) {
      currErrors.price = 'Price is required';
    }
    if (formType !== 'Update Spot' && !url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg')) {
      currErrors.url = 'Image URL must end in .png, .jpg, or.jpeg';
    }
    if (formType !== 'Update Spot' && !preview) {
      currErrors.preview = 'Preview image is required';
    } else if (formType !== 'Update Spot' && !preview.endsWith('.png') && !preview.endsWith('.jpg') && !preview.endsWith('.jpeg')) {
      currErrors.preview = 'Image URL must end in .png, .jpg, or.jpeg';
    }
    spot = {...spot, country, address, city, state, lat, lng, description, name, price };
    let newSpot;
    if (formType === 'Update Spot') {
      newSpot = await dispatch(updateSpot(spot));
    } else {
      newSpot = await dispatch(createSpot(spot));
    }
    if (newSpot.id) {
      history.push(`/spots/${newSpot.id}`);
    } else if ((Object.values(currErrors).length)){
      const {errors} = await newSpot.json();
      setErrors(errors);
    }
    reset();
  };

  return (
    <form className='body' onSubmit={handleSubmit}>
      <p className='heading'>{formType}</p>
      <p className='subheading'>Where's your place located?</p>
      <p classNam='nomal'>Guests will only get your exact address once they booked a reservation.</p>
      <div className="errors">{errors.country}</div>
      <label className='normal'>
        Country
        <input className='normal' type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>
      </label>
      <div className="errors">{errors.address}</div>
      <label className='normal'>
        Street Address
        <input className='normal' type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
      </label>
      <div className="errors">{errors.city}</div>
      <label className='normal'>
        City
        <input className='normal' type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
      </label>
      <div className="errors">{errors.state}</div>
      <label className='normal'>
        State
        <input className='normal' type="text" value={state} placeholder="STATE" onChange={(e) => setState(e.target.value)}/>
      </label>
      <div className="errors">{errors.lat}</div>
      <label className='normal'>
        Latitude
        <input className='normal' type="text" value={lat} placeholder="Latitude" onChange={(e) => setLat(e.target.value)}/>
      </label>
      <div className="errors">{errors.lng}</div>
      <label className='normal'>
        Langitude
        <input className='normal' type="text" value={lng} placeholder="Langitude" onChange={(e) => setLng(e.target.value)}/>
      </label>
      <p className='subheading'>Describe your place to guests</p>
      <p className='normal'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
      <div className="errors">{errors.description}</div>
      <label className='normal'>
        <textarea className='normal' value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <p className='subheading'>Create a title for your spot</p>
      <p className='normal'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <div className="errors">{errors.name}</div>
      <label className='normal'>
        <input className='normal' type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}/>
      </label>
      <p className='subheading'>Set a base price for your spot</p>
      <p className='normal'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
      <div className="errors">{errors.price}</div>
      <label className='normal'>
        $ <input className='normal' type="text" value={price} placeholder="Price per night(USD)" onChange={(e) => setPrice(e.target.value)}/>
      </label>
      <p className='subheading'>Liven up your spot with photos</p>
      <p className='normal'>Submit a link to at least one photo to publish your spot.</p>
      <div className="errors">{errors.preview}</div>
      <label className='normal'>
        <input className='normal' type="text" value={preview} placeholder="Preview Image URL" onChange={(e) => setPreview(e.target.value)}/>
      </label>
      <div className="errors">{errors.url}</div>
      <label className='normal'>
        <input className='normal' type="text" value={url} placeholder="Image URL" onChange={(e) => setUrl(e.target.value)}/>
      </label>
      <button className='button' type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;
