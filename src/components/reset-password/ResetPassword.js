import * as React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import ResetPasswordElement from "./ResetPasswordElement";
import useFullPageLoader from "../loader/use-fullpage-loader";
import "react-toastify/dist/ReactToastify.css";
import "./reset-password.style.css";

const SetupPasswordComponent = () => {
  const [disable, setDisable] = React.useState(true);
  const [repeatedPassword, setRepeatedPassword] = React.useState("");
  const { search } = useLocation();
  const history = useHistory();
  const { email, token } = queryString.parse(search);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const validate = (values) => {
    let errors = {};
    if (values.password.length === 0) {
      errors.password = " ";
    } else if (values.password.length > 0 && values.password.length < 6) {
      errors.password = `Password must be six characters or more`;
    }
    if (
      values.password &&
      !errors.password &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = `Passwords do not match`;
    }
    if (errors.confirmPassword || errors.password) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const dataResetPassword = {
        token: token,
        email: email,
        password: values.password,
      };
      showLoader();
      setDisable(true);
      try {
        const res = await fetch(
          `${process.env.REACT_App_BASE_URL}/reset_password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataResetPassword),
          }
        );
        hideLoader();
        setDisable(false);

        if (res.status == 201) {
          history.push("/login");
        }
        if (res.status == 401) {
          setRepeatedPassword(true);
        }
        if (res.status == 422) {
          toast.error("🧐 Invalid token entered 🧐 ", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="setup-password-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-setup-password">
        <ResetPasswordElement
          key={1}
          submit={formik.handleSubmit}
          onChange={formik.handleChange}
          repeatedPassword={repeatedPassword}
          values={formik.values}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          disabled={disable}
        />
      </div>
      <Footer />
      <ToastContainer className="toast-width" />
    </div>
  );
};
export default SetupPasswordComponent;
