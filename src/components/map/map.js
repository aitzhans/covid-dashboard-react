import React from 'react';
// import OptionsPanel from '../options-panel';
import L from 'leaflet';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [51.505, -0.09];

export const WORLD_BOUNDS = [[-90, -180], [90, 180]];
const worldBounds = L.latLngBounds(WORLD_BOUNDS);

const Map = () => {
  return (
    <div className="content__map">
      <div className="content__map-container  leaflet-container">
        <MapContainer center={worldBounds.getCenter()} zoom={3} scrollWheelZoom={false}>
          <TileLayer
            attribution=""
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
