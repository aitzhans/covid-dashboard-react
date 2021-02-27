import React from 'react';

const Header = () => (
  <header className="page-header">
    <h1 className="page-header__title">
      COVID-19 Dashboard
      <span className="page-header__remark">
        (if you see 0, there is no data provided)
      </span>
    </h1>
  </header>
);

export default Header;
