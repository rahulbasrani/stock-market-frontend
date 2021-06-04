import * as React from "react";
import { useHistory } from "react-router-dom";

import HeroForgotPassword from "../../assets/images/img_login.svg";

const ForgotPasswordElement = (props) => {
  const history = useHistory();
  const handleBackToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="container-fluid">
      <div className="img-div-forgot-password col-md-6">
        <div className="col-md-8  mx-auto text-left">
          <img className="hero-email-form" src={HeroForgotPassword} alt=" " />
        </div>
      </div>

      <section className="forgot-password-section col-md-6">
        <div className="container-fluid">
          <div className="col-md-10 col-12 forgot-password-form">
            <div className="col-md-12">
              <div className="forgot-password-heading text-left">
                Forgot your password?
              </div>
              <div className="text-left py-2 forgot-password-class">
                <span>Enter your email address</span>
              </div>

              <form
                className="forgot-password-form pt-4"
                id="forgot-password-form"
                autoComplete="off"
                onSubmit={props.submit}
              >
                <div className="form-group form-control-email col-md-12">
                  <input
                    className={
                      props.unknownEmail
                        ? "form-control border-error"
                        : "form-control"
                    }
                    type="email"
                    name="email"
                    data-test-id="email-field"
                    value={props.values.email}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="email-input"
                    autoComplete="off"
                    placeholder="Email"
                  />
                  {props.touched.email && props.errors.email ? (
                    <div className="error">{props.errors.email}</div>
                  ) : null}
                  {props.touched.email && props.unknownEmail ? (
                    <div className="error">{props.unknownEmail}</div>
                  ) : null}
                </div>

                <div className="form-group button-forgot-password col-md-12">
                  <button
                    type="submit"
                    name="forgot-password"
                    disabled={props.disabled}
                    id="forgot-password"
                    className="btn  btn-block btn-class forgot-password-btn"
                  >
                    <span className="arrow-forgot-password"></span>
                    <span className="forgot-password-button-text ">
                      Send the link
                    </span>
                  </button>
                </div>
                <div className="col-md-12 mt-5">
                  <span>
                    <span
                      onClick={handleBackToLogin}
                      className="anchor-class-forgot-password-register text-decoration-none"
                    >
                      Go to Login
                    </span>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ForgotPasswordElement;
