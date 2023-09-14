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
  const [lng, setLng] = useState(72.877426);
  const [lat, setLat] = useState(19.076090);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const getPins = async () => {
      try {
        console.log("Fetching pins...");
        const res = await axios.get("api/pins");
        console.log("Fetched pins:", res.data);
        setPins(res.data);
      } catch (err) {
        console.error("Error fetching pins:", err);
      }
    };
    getPins();
  }, []);
  

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
          {showPopup && (
            <Popup longitude={lng} latitude={lat}
              anchor="top"
              onClose={() => setShowPopup(false)}>
              <div className='card'>
                <label>Name</label>
                <h4 className='name'>Mrunal Shinde</h4>
                <label>Title</label>
                <p className='desc'>Divorce Lawyer</p>
                <label>Rating</label>
                <div className='star'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </div>
            </Popup>)}
          <Room style={{ fontSize: visualViewport.zoom * 7, color: "slateblue" }} />
        </Marker>
        </>
        ))}
        <FullscreenControl />
      </Map>
    </div>
  );
}
export default App;