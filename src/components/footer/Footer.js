import * as React from "react";

const Footer = () => {
  return (
    <div className="center-wrap">
      <footer className="text-center text-lg-start">
        <div className="text-center footer-text p-3">
          Do you Have a question? Refer to our Docs or contact us via
          phone—we're available here
        </div>
        <a className="btn-contact hovers " href="/contact">
          Contact Us
        </a>
      </footer>
    </div>
  );
};
export default Footer;
