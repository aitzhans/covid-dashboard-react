import React from 'react';
import rslogo from '../../img/rs_school_js.svg';

const Footer = () => {
  return (
    <footer className="page-footer">
      <a className="page-footer__logo" href="https://rs.school/js/" target="blank">
        <img className="page-footer__img" src={rslogo} alt="RS School" />
      </a>
      <span className="page-footer__text">
        2021 Github
        <a className="page-footer__link" href="https://github.com/aitzhans" target="blank"> aitzhans</a>
      </span>
    </footer>
  );
};

export default Footer;
