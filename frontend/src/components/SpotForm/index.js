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
  const countryError = errors.country ? errors.country : null;
  const addressError = errors.address ? errors.address : null;
  const cityError = errors.city ? errors.city : null;
  const stateError = errors.state ? errors.state : null;
  const latError = errors.lat ? errors.lat : null;
  const lngError = errors.lng ? errors.lng : null;
  const descriptionError = errors.description ? errors.description : null;
  const nameError = errors.name ? errors.name : null;
  const priceError = errors.price ? errors.price : null;
  const previewError = errors.preview ? errors.preview : null;
  const url1Error = errors.url1 ? errors.url1 : null;
  const url2Error = errors.url2 ? errors.url2 : null;
  const url3Error = errors.url3 ? errors.url3 : null;
  const url4Error = errors.url4 ? errors.url4 : null;
  return (
    <div className='body'>
    <form className='form' onSubmit={handleSubmit}>
      <p className='formHeading'>{title}</p>
      <div className='errors'>
        <ul>{countryError}</ul>
        <ul>{addressError}</ul>
        <ul>{cityError}</ul>
        <ul>{stateError}</ul>
        <ul>{latError}</ul>
        <ul>{lngError}</ul>
        <ul>{descriptionError}</ul>
        <ul>{nameError}</ul>
        <ul>{priceError}</ul>
        <ul>{previewError}</ul>
        <ul>{url1Error}</ul>
        <ul>{url2Error}</ul>
        <ul>{url3Error}</ul>
        <ul>{url4Error}</ul>
      </div>
      <p className='formSubheading'>Where's your place located?</p>
      <p className='nomal'>Guests will only get your exact address once they booked a reservation.</p>
      <div className='formNormal'>
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
      </label>
      <select value={state} name='State' onChange={(e) => setState(e.target.value)}><br/>
        <option value='' disabled>Please select a state</option>
        <option>AL</option>
        <option>AK</option>
        <option>AZ</option>
        <option>AR</option>
        <option>CA</option>
        <option>CO</option>
        <option>CT</option>
        <option>DE</option>
        <option>FL</option>
        <option>GA</option>
        <option>HI</option>
        <option>ID</option>
        <option>IL</option>
        <option>IN</option>
        <option>IA</option>
        <option>KS</option>
        <option>KY</option>
        <option>LA</option>
        <option>ME</option>
        <option>MD</option>
        <option>MA</option>
        <option>MI</option>
        <option>MN</option>
        <option>MS</option>
        <option>MO</option>
        <option>MT</option>
        <option>NE</option>
        <option>NV</option>
        <option>NH</option>
        <option>NJ</option>
        <option>NM</option>
        <option>NY</option>
        <option>NC</option>
        <option>ND</option>
        <option>OH</option>
        <option>OK</option>
        <option>OR</option>
        <option>PA</option>
        <option>RI</option>
        <option>SC</option>
        <option>SD</option>
        <option>TN</option>
        <option>TX</option>
        <option>UT</option>
        <option>VT</option>
        <option>VA</option>
        <option>WA</option>
        <option>WV</option>
        <option>WI</option>
        <option>WY</option>
        <option>Others</option>
      </select><br/>
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
      <p className='formSubheading'>Describe your place to guests</p>
      <p className='formNormal'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
      <label className='formNormal'>
        <textarea className='formNormal' value={description} placeholder="Please write at least 30 characters." onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <p className='formSubheading'>Create a title for your spot</p>
      <p className='formNormal'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <label className='formNormal'>
        <input className='input' type="text" value={name} placeholder="Name of your spot" onChange={(e) => setName(e.target.value)}/>
      </label>
      <p className='formSubheading'>Set a base price for your spot</p>
      <p className='formNormal'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
      <label className='formNormal'>
        $ <input className='input' type="text" value={price} placeholder="Price per night(USD)" onChange={(e) => setPrice(e.target.value)}/>
      </label>
      <p className='formSubheading'>Liven up your spot with photos</p>
      <p className='formNormal'>Submit a link to at least one photo to publish your spot.</p>
      <div className='formNormal'>
      <label>
        <input className='input' type="text" value={preview} placeholder="Preview Image URL" onChange={(e) => setPreview(e.target.value)}/><br/>
      </label>
      <label>
        <input className='input' type="text" value={url1} placeholder="Image URL" onChange={(e) => setUrl1(e.target.value)}/><br/>
      </label>
      <label>
        <input className='input' type="text" value={url2} placeholder="Image URL" onChange={(e) => setUrl2(e.target.value)}/><br/>
      </label>
      <label>
        <input className='input' type="text" value={url3} placeholder="Image URL" onChange={(e) => setUrl3(e.target.value)}/><br/>
      </label>
      <label>
        <input className='input' type="text" value={url4} placeholder="Image URL" onChange={(e) => setUrl4(e.target.value)}/><br/>
      </label>
      </div>
      <button className='submitFormButton' type="submit">{formType}</button>
    </form>
    </div>
  );
};

export default SpotForm;
