import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
// import { apiKey } from '../../../../server/utils/apiKey'
import { useQuery } from '@apollo/client';
import { QUERY_ALLPOSTS } from "../../utils/queries";
import PlaceContext from '../../context/PlaceContext';




function Map() {
    const containerStyle = {
        // We can change this, just a stand-in
        width: '800px',
        height: '400px'
    };
    console.log(QUERY_ALLPOSTS)
    const { data } = useQuery(QUERY_ALLPOSTS);
    const [ activeMarker, setActiveMarker ] = useState();
    const thePlace = useContext(PlaceContext);
    console.log("This Must Be The Place: ", thePlace)
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const postList = data?.allPosts || [];
    console.log(postList);
    return (
            <GoogleMap
                onLoad={handleOnLoad}
                center={thePlace.Place}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={containerStyle}
                zoom={100}
            >
                {postList.map(({ _id, title, place }) => (
                    thePlace.getPlaceLatLng(place),
                    <Marker
                        key={_id}
                        position={{lat: thePlace.latLng.lat, lng: thePlace.latLng.lng}}
                        onClick={() => handleActiveMarker(_id)}
                    >
                        {activeMarker === _id ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <Link to={`/viewpost/${_id}`}>
                                <div>{title}</div>
                                </Link>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>
    )
}

export default React.memo(Map)