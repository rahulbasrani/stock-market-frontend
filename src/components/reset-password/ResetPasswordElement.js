import * as React from "react";
import { useHistory } from "react-router-dom";

const HeroSetupPassword = require("../../assets/images/img_login.svg");

const ResetPasswordElement = (props) => {
  const history = useHistory();
  const handleLoginPage = () => {
    history.push("/login");
  };
  return (
    <div className="container-fluid">
      <div className="img-div-setup-password col-md-6">
        <div className="col-md-8  mx-auto text-left">
          <img className="hero-email-form" src={HeroSetupPassword} alt=" " />
        </div>
      </div>

      <section className="setup-password-section col-md-6">
        <div className="container-fluid">
          <div className="col-md-10 col-12 setup-password-form">
            <div className="col-md-12">
              <div className="setup-password-heading text-left">
                Password Reset
              </div>
              <div className="text-left setup-password-class py-2">
                <span className="">Reset your password</span>
              </div>

              <form
                className="setup-password-form "
                id="setup-password-form"
                autoComplete="off"
                onSubmit={props.submit}
              >
                <div className="form-group form-control-password col-md-12">
                  <input
                    className={
                      props.repeatedPassword
                        ? "form-control border-error"
                        : "form-control"
                    }
                    type="password"
                    name="password"
                    data-test-id="password-field"
                    value={props.values.password}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="password-input"
                    autoComplete="off"
                    placeholder="Password"
                  />
                  {props.touched.password && props.errors.password ? (
                    <div className="error">{props.errors.password}</div>
                  ) : null}
                  {props.touched.password && props.repeatedPassword ? (
                    <div className="error">
                      New password can't be same as older one.
                    </div>
                  ) : null}
                </div>

                <div className="form-group form-control-password col-md-12">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="confirmPassword"
                    value={props.values.confirmPassword}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="confirmPassword"
                    autoComplete="off"
                    placeholder="Confirm Password"
                  />
                  {props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
                    <div className="error">{props.errors.confirmPassword}</div>
                  ) : null}
                </div>

                <div className="form-group button-setup-password col-md-12">
                  <button
                    type="submit"
                    name="setup-password"
                    disabled={props.disabled}
                    id="setup-password"
                    className="btn  btn-block btn-class setup-password-btn"
                  >
                    <span className="arrow-setup-password"></span>
                    <span className="setup-password-button-text ">Reset</span>
                  </button>
                </div>
                <div className="col-md-12 mt-5">
                  <span>
                    <span
                      onClick={handleLoginPage}
                      className="anchor-class-setup-password-register text-decoration-none"
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
export default ResetPasswordElement;
