import React from 'react';

const CountriesListItem = ({ cases, name, flagPath }) => {
  return (
    <>
      <span className="countries__number">
        {cases.toLocaleString('de-DE')}
      </span>
      <span className="countries__name">{name}</span>
      <div className="countries__flag">
        <img src={flagPath} alt="flag" />
      </div>
    </>
  );
};

export default CountriesListItem;
