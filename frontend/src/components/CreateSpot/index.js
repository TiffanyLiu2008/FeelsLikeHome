import './CreateSpot.css';
import SpotForm from '../SpotForm/index';

const CreateSpot = () => {
  const spot = {
    country: '',
    address: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    description: '',
    name: '',
    price: '',
    preview: '',
    url1: '',
    url2: '',
    url3: '',
    url4: ''
  };
  return (
    <SpotForm spot={spot} formType="Create Spot"/>
  );
};

export default CreateSpot;
