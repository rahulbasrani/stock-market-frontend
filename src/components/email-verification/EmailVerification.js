import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import useFullPageLoader from "../loader/use-fullpage-loader";
import "./email.style.css";
const HeroEmail = require("../../assets/images/img_login.svg");

const EmailVerificationComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const [disable, setDisable] = React.useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const email = location.state.email;

  const resendChange = async () => {
    showLoader();
    setDisable(true);
    const dataResend = {
      email: email,
    };
    try {
      const res = await fetch(
        `${process.env.REACT_App_BASE_URL}/resend_email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataResend),
        }
      );
      hideLoader();
      setDisable(false);

      if (res.status == 200) {
        toast.success("✅ Email verification link sent ✅", {
          position: "top-center",
        });
      }

      if (res.status == 400) {
        toast.error("🧐 User Not found 🧐 ", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutEmail = () => {
    history.push("/signup");
  };

  return (
    <div className="email-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-email">
        <div className="container-fluid">
          <div className="img-div-email col-md-6">
            <div className="col-md-12 text-left">
              <img className="hero-email-form" src={HeroEmail} alt=" " />
            </div>
          </div>

          <section className=" email-verification-section col-md-6">
            <div className="container-fluid">
              <div className="col-md-9 col-11">
                <div className="verify-email-heading col-md-12 mb-3">
                  Email verification
                </div>
                <div className="text-left verification-class col-md-12">
                  <span>Verification link sent to your registered email</span>
                  <span className="font-weight-bold"> {` ${email}. `}</span>
                  <span>Check your mail-box</span>
                </div>
                <div className="col-md-12 button-email">
                  <button
                    type="submit"
                    name="logout"
                    onClick={logoutEmail}
                    id="logout"
                    className="btn btn-block email-btn btn-class"
                  >
                    <div className="email-button-text">
                      <span className="arrow-email"></span>
                      <span className="email-btn-cls">Go back</span>
                    </div>
                  </button>
                </div>

                <div className="text-left last-para col-md-12">
                  <span>
                    <span className="text-left verification-class gray-class">
                      Did'nt receive email. Click here to resend?
                    </span>
                    &nbsp;
                    <span>
                      <span
                        onClick={resendChange}
                        className="anchor-class-verification text-decoration-none"
                      >
                        Resend
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <ToastContainer className="toast-width" />
    </div>
  );
};

export default EmailVerificationComponent;
