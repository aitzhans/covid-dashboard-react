import React from 'react';

const MapMarker = ({ data, dataTitle, countryName, level }) => {
  const casesStr = `${data > 1000 ? `${`${data}`.slice(0, -3)}k` : data}`;

  return (
    <span className={`map__marker map__marker--${level}`} id={`${countryName}`}>
      <span className="map__tooltip">
        <h2 className="map__tooltip-title">{countryName}</h2>
        <ul className="map__tooltip-list">
          <li className="map__tooltip-list-item">
            <strong>{dataTitle}:</strong> {data}
          </li>
        </ul>
      </span>
      {casesStr}
    </span>
  );
};

export default MapMarker;
