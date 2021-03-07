import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { countrySelected } from '../../actions';
import MapMarker from '../map-marker';
import { WORLD_BOUNDS, DEFAULT_MAP_ZOOM, DEFAULT_COUNTRY_ZOOM, DATA_TOOLTIPS } from './consts';
import getSpreadSpeedLevel from './utils';
// import { findCountry } from '../../utils';
// import './map.scss';

const findCountry = (countryName, countries) => countries.find((country) => country.country === countryName);

const L = require('leaflet');

const renderMap = (containerId) => {
  const worldBounds = L.latLngBounds(WORLD_BOUNDS);
  const map = new L.Map(containerId, {
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
  return map;
};

const renderMapMarkers = (map, markersLayerGroup, countries, selectedCriteria) => {
  const countryPointToLayer = (feature, latlng) => {
    const { properties } = feature;
    const countryName = properties.country;
    const data = properties[selectedCriteria];
    const level = getSpreadSpeedLevel(properties, countries, selectedCriteria);
    const dataTitle = DATA_TOOLTIPS[selectedCriteria];
    const marker = L.marker(latlng, {
      icon: L.divIcon({
        className: 'icon',
        html: ReactDOMServer.renderToString(
          <MapMarker data={data} dataTitle={dataTitle} countryName={countryName} level={level} />
        ),
      }),
      riseOnHover: true,
    });
    return marker;
  };

  const geoJson = {
    type: 'FeatureCollection',
    features: countries.map((country) => {
      const { lat, long: lng } = country;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      };
    }),
  };
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: countryPointToLayer,
  });

  markersLayerGroup.clearLayers();
  markersLayerGroup.addLayer(geoJsonLayers).addTo(map);
};

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      markersLayerGroup: new L.LayerGroup(),
    };
  }

  componentDidMount() {
    this.setState({
      map: renderMap('map-container'),
    });
  }

  componentDidUpdate(prevProps) {
    const { map, markersLayerGroup } = this.state;
    const { countries, selectedCriteria, selectedCountry } = this.props;
    if (prevProps !== this.props) {
      renderMapMarkers(map, markersLayerGroup, countries, selectedCriteria);
      if (selectedCountry) {
        const { lat, long } = findCountry(selectedCountry, countries);
        this.poisitionMap({ lat, long });
      } else {
        this.poisitionMap();
      }
    }
  }

  onMarkerClick(targetId, containerId, onMarkerSelect) {
    const { countries } = this.props;
    if (targetId !== containerId) {
      const countryName = targetId;
      const { lat, long } = findCountry(countryName, countries);
      onMarkerSelect(countryName);
      this.poisitionMap({ lat, long });
    }
  }

  poisitionMap(coordinates) {
    const { map } = this.state;
    if (coordinates) {
      const { lat, long } = coordinates;
      map.flyTo(new L.LatLng(lat, long), DEFAULT_COUNTRY_ZOOM);
    } else {
      const center = L.latLngBounds(WORLD_BOUNDS).getCenter();
      map.flyTo(center, DEFAULT_MAP_ZOOM);
    }
  }

  render() {
    const { onMarkerSelect } = this.props;

    return (
      <div className="content__map">
        <div
          className="content__map-container"
          id="map-container"
          onClick={(e) => this.onMarkerClick(e.target.id, 'map-container', onMarkerSelect)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCountry, loadingCountries, countries, selectedCriteria }) => ({
  selectedCountry,
  loadingCountries,
  countries,
  selectedCriteria,
});

const mapDispatchToProps = (dispatch) => ({
  onMarkerSelect: (countryName) => dispatch(countrySelected(countryName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
