import './SpotForm.css';
import { useState, useEffect } from 'react';
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
  const [url2, setUrl2] = useState(spot?.ur2);
  const [url3, setUrl3] = useState(spot?.url3);
  const [url4, setUrl4] = useState(spot?.url4);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  useEffect(() => {
    const errors = {country: [], address: [], city: [], state: [], lat: [], lng: [], description: [], name: [], price: [], preview: [], url1: [], url2: [], url3: [], url4: []};
    if (!country.length) {errors['country'].push('Country is required');}
    if (!address.length) {errors['address'].push('Address is required');}
    if (!city.length) {errors['city'].push('City is required');}
    if (!state.length) {errors['state'].push('State is required');}
    if (!lat.length) {errors['lat'].push('Latitude is required');}
    if (!lng.length) {errors['lng'].push('Longitude is required');}
    if (description.length < 30) {errors['description'].push('Description needs a minimum of 30 characters');}
    if (!name.length) {errors['name'].push('Name is required');}
    if (!price.length) {errors['price'].push('Price is required');}
    if (formType !== 'Update Spot' && !url1.endsWith('.png') && !url1.endsWith('.jpg') && !url1.endsWith('.jpeg')) {console.log(url1); errors['url1'].push('Image URL must end in .png, .jpg, or.jpeg');}
    // if (formType !== 'Update Spot' && !url2.endsWith('.png') && !url2.endsWith('.jpg') && !url2.endsWith('.jpeg')) {errors['url2'].push('Image URL must end in .png, .jpg, or.jpeg');}
    // if (formType !== 'Update Spot' && !url3.endsWith('.png') && !url3.endsWith('.jpg') && !url3.endsWith('.jpeg')) {errors['url3'].push('Image URL must end in .png, .jpg, or.jpeg');}
    // if (formType !== 'Update Spot' && !url4.endsWith('.png') && !url4.endsWith('.jpg') && !url4.endsWith('.jpeg')) {errors['url4'].push('Image URL must end in .png, .jpg, or.jpeg');}
    if (formType !== 'Update Spot' && !preview) {errors['preview'].push('Preview image is required');}
    else if (formType !== 'Update Spot' && !preview.endsWith('.png') && !preview.endsWith('.jpg') && !preview.endsWith('.jpeg')) {errors['preview'].push('Image URL must end in .png, .jpg, or.jpeg');}
    setValidationErrors(errors);
  }, [country, address, city, state, lat, lng, description, name, price, preview, url1, url2, url3, url4]);
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
    setUrl1('');
    setUrl2('');
    setUrl3('');
    setUrl4('');
    setValidationErrors({});
    setHasSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    spot = {...spot, country, address, city, state, lat, lng, description, name, price, preview, url1, url2, url3, url4 };
    let newSpot;
    if (formType === 'Update Spot') {
      newSpot = await dispatch(updateSpot(spot));
    } else if (formType === 'Create Spot') {
      newSpot = await dispatch(createSpot(spot));
    }
    if (newSpot.id) {
      history.push(`/spots/${newSpot.id}`);
    } else if (Object.values(validationErrors).length){
      const {validationErrors} = await newSpot.json();
      setValidationErrors(validationErrors);
    }
    reset();
  };

  return (
    <form className='body' onSubmit={handleSubmit}>
      <p className='heading'>{formType}</p>
      <p className='subheading'>Where's your place located?</p>
      <p className='nomal'>Guests will only get your exact address once they booked a reservation.</p>

      <label className='normal'>
        Country
        <input className='normal' type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.country.length > 0 && validationErrors.country.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        Street Address
        <input className='normal' type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.address.length > 0 && validationErrors.address.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        City
        <input className='normal' type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.city.length > 0 && validationErrors.city.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        State
        <input className='normal' type="text" value={state} placeholder="STATE" onChange={(e) => setState(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.state.length > 0 && validationErrors.state.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        Latitude
        <input className='normal' type="text" value={lat} placeholder="Latitude" onChange={(e) => setLat(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.lat.length > 0 && validationErrors.lat.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        Langitude
        <input className='normal' type="text" value={lng} placeholder="Langitude" onChange={(e) => setLng(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.lng.length > 0 && validationErrors.lng.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <p className='subheading'>Describe your place to guests</p>
      <p className='normal'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
      <label className='normal'>
        <textarea className='normal' value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.description.length > 0 && validationErrors.description.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <p className='subheading'>Create a title for your spot</p>
      <p className='normal'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <label className='normal'>
        <input className='normal' type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.name.length > 0 && validationErrors.name.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <p className='subheading'>Set a base price for your spot</p>
      <p className='normal'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
      <label className='normal'>
        $ <input className='normal' type="text" value={price} placeholder="Price per night(USD)" onChange={(e) => setPrice(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.price.length > 0 && validationErrors.price.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <p className='subheading'>Liven up your spot with photos</p>
      <p className='normal'>Submit a link to at least one photo to publish your spot.</p>
      <label className='normal'>
        <input className='normal' type="text" value={preview} placeholder="Preview Image URL" onChange={(e) => setPreview(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.preview.length > 0 && validationErrors.preview.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        <input className='normal' type="text" value={url1} placeholder="Image URL" onChange={(e) => setUrl1(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.url1.length > 0 && validationErrors.url1.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        <input className='normal' type="text" value={url2} placeholder="Image URL" onChange={(e) => setUrl2(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.url2.length > 0 && validationErrors.url2.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        <input className='normal' type="text" value={url3} placeholder="Image URL" onChange={(e) => setUrl3(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.url3.length > 0 && validationErrors.url3.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}

      <label className='normal'>
        <input className='normal' type="text" value={url4} placeholder="Image URL" onChange={(e) => setUrl4(e.target.value)}/>
      </label>
      {hasSubmitted && validationErrors.url4.length > 0 && validationErrors.url4.map((error, idx) => (<ul key={idx}><li className='error'>{error}</li></ul>))}
      <button className='button' type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;
