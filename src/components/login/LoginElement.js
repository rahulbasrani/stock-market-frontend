import * as React from "react";
import { useHistory } from "react-router-dom";

const HeroLogin = require("../../assets/images/img_login.svg");

const LoginElement = (props) => {
  const history = useHistory();
  const handleRegistration = () => {
    history.push("/signup");
  };
  const forgotPasswordChange = () => {
    history.push("/forgot-password");
  };
  return (
    <div className="container-fluid">
      <div className="img-div-login col-md-6">
        <div>
          <img className="hero-signup-form" src={HeroLogin} alt=" " />
        </div>
      </div>

      <section className="login-section col-md-6">
        <div className="container-fluid">
          <div className="col-md-10 col-12 login-form">
            <div className="col-md-12">
              <div className="login-heading text-left">
                Stock Representation
              </div>
              <div className="text-left login-class py-2">
                <span className="">New Account ?</span>
                &nbsp;
                <span>
                  <span
                    onClick={handleRegistration}
                    className="anchor-class-login-register text-decoration-none"
                  >
                    Signup
                  </span>
                </span>
              </div>

              <form
                className="login-form pt-4"
                id="login-form"
                autoComplete="off"
                onSubmit={props.submit}
              >
                <div className="form-group form-control-email col-md-12">
                  <input
                    className="form-control  form-control-lg"
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
                </div>

                <div className="form-group form-control-password col-md-12">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    value={props.values.password}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="password"
                    autoComplete="off"
                    placeholder="Password"
                  />
                  {props.touched.password && props.errors.password ? (
                    <div className="error">{props.errors.password}</div>
                  ) : null}
                </div>

                <div className="form-group button-login col-md-12">
                  <button
                    type="submit"
                    name="login"
                    disabled={props.disabled}
                    id="login"
                    className="btn  btn-block btn-class login-btn"
                  >
                    <span className="arrow-login"></span>
                    <span className="login-button-text ">Log in</span>
                  </button>
                </div>
                <div className="col-md-12 mt-5">
                  <span>
                    <span
                      onClick={forgotPasswordChange}
                      className="anchor-class-login-register text-decoration-none"
                    >
                      forgot password?
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
export default LoginElement;
