
import React, { useEffect } from 'react';
import Map from 'react-map-gl';
import { Marker } from 'react-map-gl';
import { FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react';
import { Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons'
import './app.css'
import axios from "axios"


function App() {
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [lng, setLng] = useState(72.877426);
  const [lat, setLat] = useState(19.076090);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const getPins = async () => {
      try {
        console.log("Fetching pins...");
        const res = await axios.get("/pins");
        console.log("Fetched pins:", res.data);
        setPins(res.data);
      } catch (err) {
        console.error("Error fetching pins:", err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  }


  return (
    <div className='App'>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{
          width: "500px",
          height: "500px",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {pins.map(p => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.lng}
              offsetLeft={-20}
              offsetTop={-50}
            >
              {p._id === currentPlaceId &&(
               
                <Popup longitude={p.lng} latitude={p.lat}
                  anchor="top"
                  onClose={() => setShowPopup(false)}>
                  <div className='card'>
                    <label>Name</label>
                    <h4 className='name'>{p.name}</h4>
                    <label>Title</label>
                    <p className='desc'>{p.title}</p>
                    <label>Rating</label>
                       <div className="star">
              {Array.from({ length: p.rating }).map((_, index) => (
                <Star key={index} />
              ))}
            </div>
                  </div>
                </Popup>)
              }
              <Room style={{ fontSize: visualViewport.zoom * 7, color: "slateblue",cursor:"pointer" }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
          </>
        ))}
        <FullscreenControl />
      </Map>
    </div>
  );
}
export default App;