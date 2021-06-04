import React from "react";

import HeroSignup from "../../assets/images/img_login.svg";

const SignupDescription = () => {
  return (
    <div className="container-fluid">
      <div className="img-div col-md-6 col-12 col-sm-12 col-lg-6">
        <div>
          <img className="hero-signup-form" src={HeroSignup} alt=" " />
        </div>
      </div>
    </div>
  );
};
export default SignupDescription;
