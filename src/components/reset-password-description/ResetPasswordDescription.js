import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import useFullPageLoader from "../loader/use-fullpage-loader";
import "./reset-password.style.css";
import "react-toastify/dist/ReactToastify.css";

const HeroResetPassword = require("../../assets/images/img_login.svg");

const ResetPasswordComponent = () => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [disable, setDisable] = React.useState(true);

  const location = useLocation();
  const history = useHistory();
  const email = location.state.email;

  const resendChange = async () => {
    const dataResendReset = {
      email: email.toLowerCase(),
    };
    showLoader();
    setDisable(true);
    try {
      const res = await fetch(
        `${process.env.REACT_App_BASE_URL}/forgot_password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataResendReset),
        }
      );
      hideLoader();
      setDisable(false);

      if (res.status == 201) {
        toast.warn("✅ Reset link sent to email ✅", {
          position: "top-center",
        });
      }

      if (res.status == 400) {
        toast.error("🎃 Email not valid 🎃 ", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const backToLoginChange = () => {
    history.push("/login");
  };

  return (
    <div className="reset-password-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-reset-password">
        <div className="container-fluid">
          <div className="img-div-reset-password col-md-6">
            <div className="col-md-12 text-left">
              <img
                className="hero-email-form"
                src={HeroResetPassword}
                alt=" "
              />
            </div>
          </div>

          <section className=" reset-password-verification-section col-md-6">
            <div className="container-fluid">
              <div className="col-md-9 col-11">
                <div className="verify-reset-password-heading col-md-12 mb-3">
                  Reset Password
                </div>
                <div className="text-left verification-class col-md-12">
                  <span>
                    Password resent link has been sent to email address
                  </span>
                  <span className="font-weight-bold">{` ${email}.`}</span>
                  <span> Check your mail please. </span>
                </div>
                <div className="col-md-12 button-reset-password">
                  <button
                    type="submit"
                    name="logout"
                    onClick={resendChange}
                    id="logout"
                    className="btn btn-block reset-password-btn btn-class"
                  >
                    <div className="reset-password-button-text">
                      <span className="arrow-reset-password"></span>
                      <span className="reset-password-btn-cls">
                        Resend Reset Email
                      </span>
                    </div>
                  </button>
                </div>

                <div className="text-left last-para col-md-12">
                  <span
                    onClick={backToLoginChange}
                    className="anchor-class-verification-reset text-decoration-none"
                  >
                    Go to Login
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <ToastContainer style={{ width: "450px" }} />
    </div>
  );
};

export default ResetPasswordComponent;
