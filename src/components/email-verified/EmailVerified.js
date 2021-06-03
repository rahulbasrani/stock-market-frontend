import * as React from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

import "./email-verified.style.css";

const Success = require("../../assets/images/success.svg");

const EmailVerifiedComponent = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div className="success-verified-body">
      <Navbar />
      <div className="main-content-success-verify">
        <div className="container-fluid">
          <div className="col-md-4 pt-5 text-center mx-auto my-auto">
            <img src={Success} alt="" height="305" width="305" />

            <div className="text-center success-verified-header mt-0">
              Your Account is verified Now
            </div>
            <div className="success-email-button mt-4 col-md-12">
              <button
                type="submit"
                name="success-verified"
                id="success-verified"
                onClick={handleClick}
                className="btn btn-block btn-class sucess-email-btn"
              >
                <div className="verified-button-text">
                  <span>Go to Login</span>
                  <span className="arrow-verified"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerifiedComponent;
