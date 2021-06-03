import * as React from "react";
import { useHistory } from "react-router-dom";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import "./error.style.css";

const Success = require("../../assets/images/error.svg");

const ErrorComponent = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="error-body">
      <Navbar />
      <div className="main-content-error">
        <div className="container-fluid">
          <div className="col-md-4 my-0 py-1 text-center mx-auto">
            <div>
              <img className="hero-error" src={Success} alt="" />
            </div>
            <div>
              <div className="text-center error-header-class mt-4">
                Page not available
              </div>
              <div className="error-class mt-2 col-md-9 mx-auto">
                <div>Page does not exist</div>
                <div>Error 404</div>
              </div>
            </div>

            <div className="form-group form-button mt-5 col-md-12 ">
              <button
                type="submit"
                name="signup"
                id="signup"
                onClick={handleClick}
                className="btn btn-block  btn-class error-btn"
              >
                <div className="error-button-text">
                  <span className="error-btn-cls">Back to Home Page</span>

                  <span className="arrow-error"></span>
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

export default ErrorComponent;
