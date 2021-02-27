import React from 'react';

const OptionsPanel = () => {
  return (
    <div className="content__options  options  options--countries">
      <input className="options__input" type="radio" name="countries-options" id="countries-cases" checked="checked" data-label="cases" />
      <label htmlFor="countries-cases" className="options__label">Cases</label>
      <input className="options__input" type="radio" name="countries-options" id="countries-deaths" data-label="deaths" />
      <label htmlFor="countries-deaths" className="options__label">Deaths</label>
      <input className="options__input" type="radio" name="countries-options" id="countries-recovered" data-label="recovered" />
      <label htmlFor="countries-recovered" className="options__label">Recovered</label>
    </div>
  );
};

export default OptionsPanel;
