import * as React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import useFullPageLoader from "../loader/use-fullpage-loader";
import ForgotPasswordElement from "./ForgotPasswordElement";
import "react-toastify/dist/ReactToastify.css";
import "./forgot-password.style.css";

const ForgotPasswordComponent = () => {
  const [disable, setDisable] = React.useState(true);
  const [unknownEmail, setUnknownEmail] = React.useState("");
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const validate = (values) => {
    let errors = {};

    if (values.email.length === 0) {
      errors.email = " ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
      values.email.length > 0
    ) {
      errors.email = `Enter valid email address`;
    }

    if (errors.email) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      const dataForgotPassword = {
        email: values.email.toLowerCase(),
      };
      showLoader();
      setDisable(true);
      try {
        const res = await fetch(
          `https://stock-market-backend-in-mern.herokuapp.com/forgot_password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForgotPassword),
          }
        );
        hideLoader();
        setDisable(false);

        if (res.status === 201) {
          history.push({
            pathname: "/resend-reset-password",
            state: {
              email: dataForgotPassword.email,
            },
          });
        }

        if (res.status === 400) {
          toast.error("🎃 Email not valid 🎃 ", {
            position: "top-center",
          });
          setUnknownEmail("Email not registered");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="forgot-password-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-forgot-password">
        <ForgotPasswordElement
          key={1}
          submit={formik.handleSubmit}
          onChange={formik.handleChange}
          values={formik.values}
          unknownEmail={unknownEmail}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          disabled={disable}
        />
      </div>
      <Footer />
      <ToastContainer style={{ width: "500px" }} />
    </div>
  );
};
export default ForgotPasswordComponent;
