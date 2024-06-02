import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import marker from '../../images/marker.png';
import loadingImg from '../../images/loading.png';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const mapOptions = {
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_LEFT,
    },
    streetViewControl: true,
    streetViewControlOptions: {
        position: window.google.maps.ControlPosition.TOP_RIGHT,
    },
};

const Maps = ({ apiKey, spot}) => {
    const center = {
        lat: spot.lat,
        lng: spot.lng,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={mapOptions}
                >
                <Marker
                    position={center}
                    icon={{
                        url: marker,
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}
                />
                </GoogleMap>
            )}
        </>
    );
};

export default React.memo(Maps);
