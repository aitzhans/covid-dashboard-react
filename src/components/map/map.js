import React, { useEffect } from 'react';
// import OptionsButtons from '../options-buttons';
import './map.scss';

const L = require('leaflet');

const WORLD_BOUNDS = [
  [-90, -180],
  [90, 180],
];
const DEFAULT_MAP_ZOOM = 3;

const renderMap = () => {
  const worldBounds = L.latLngBounds(WORLD_BOUNDS);
  const map = new L.Map('map-container', {
    center: worldBounds.getCenter(),
    zoom: DEFAULT_MAP_ZOOM,
    minZoom: 2,
    maxBounds: worldBounds,
    maxBoundsViscosity: 0.75,
  });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '',
    noWrap: false,
  }).addTo(map);
};

const Map = () => {
  useEffect(() => {
    renderMap();
  }, []);

  return (
    <div className="content__map">
      <div className="content__map-container" id="map-container" />
      {/* <OptionsButtons location="map" /> */}
    </div>
  );
};

export default Map;
