import * as React from "react";
import { useHistory } from "react-router-dom";

const FormElement = (props) => {
  const history = useHistory();
  const loginChange = () => {
    history.push("/login");
  };
  return (
    <section className="signup-form col-md-6">
      <div className="container-fluid">
        <div className="col-md-10  col-sm-12 signupform-div ">
          <div>
            <h1 className="form-title col-md-12 mb-3">Register Your Account</h1>
            <div className="text-left col-md-12">
              <span className="account-class">Already have an account?</span>
              &nbsp;
              <span>
                <span
                  onClick={loginChange}
                  className="anchor-class anchor-class-login-signup"
                >
                  Login
                </span>
              </span>
            </div>

            <form
              className="register-form mt-3 col-md-12"
              id="register-form"
              autoComplete="off"
              onSubmit={props.submit}
              method="POST"
            >
              <div className="form-group form-controls col-md-12">
                <input
                  className="form-control"
                  type="text"
                  name="company"
                  value={props.values.company}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="company"
                  autoComplete="off"
                  placeholder="Your Company Name"
                />
                {props.touched.company && props.errors.company ? (
                  <span className="error">{props.errors.company}</span>
                ) : null}
              </div>

              <div className="form-group form-group-lg form-control-password col-md-12">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={props.values.name}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="name"
                  autoComplete="off"
                  placeholder="Name"
                />
                {props.touched.name && props.errors.name ? (
                  <div className="error">{props.errors.name}</div>
                ) : null}
              </div>

              <div className="row mx-auto">
                <div className="form-group col-md-6">
                  <input
                    className=" form-control"
                    type="password"
                    name="password"
                    id="password"
                    value={props.values.password}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    autoComplete="off"
                    placeholder="Password"
                  />
                  {props.touched.password && props.errors.password ? (
                    <span className="error ">{props.errors.password}</span>
                  ) : null}
                </div>

                <div className="form-group col-md-6">
                  <input
                    className="form-control"
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
                    <span className="error ">
                      {props.errors.confirmPassword}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="form-group form-control-email col-md-12">
                <input
                  className={
                    props.repeatedEmail
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
                {props.touched.email && props.repeatedEmail ? (
                  <div className="error">
                    Email is already registered, try with another one
                  </div>
                ) : null}
              </div>

              <div className="bottom-info checkbox d-flex box col-md-12">
                <input
                  type="checkbox"
                  id="chkbx"
                  onBlur={props.onBlur}
                  onChange={props.onChange}
                  name="toggle"
                  checked={props.oncheck}
                />
                <label htmlFor="chkbx"></label>
                <span>I agree to Stock Representation Web page</span>
                &nbsp;
                <a href="/tnc" className="anchor-class-checkbox">
                  terms & condition
                </a>
                {/* <span>{translation.t("I_AGREE_TO_OMNIMETIC")}</span> */}
                {/* <span>{translation.t("AND")}</span> */}
              </div>
              <div className="form-group form-button col-md-12 ">
                <button
                  type="submit"
                  name="signup"
                  disabled={props.disabled}
                  id="signup"
                  className="btn btn-block btn-lg btn-class signup-btn"
                >
                  <div className="signup-button-text">
                    <span className="signup-submit-btn-cls">
                      {/* {translation.t("CREATE_ACCOUNT")} */}
                      Signup your account
                    </span>
                    <span className="arrow"></span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormElement;
