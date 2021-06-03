import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import zxcvbn from "zxcvbn";

import Alert from "../alert/Alert";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import FormElement from "./SignupElement";
import SignupDescription from "./SignupDescription";
import useFullPageLoader from "../loader/use-fullpage-loader";
import "react-toastify/dist/ReactToastify.css";
import "./signup.style.css";
// import useCommonAlert from "../common-alert/use-common-alert";

// const Error = require("@images/danger.svg");
toast.configure();

// interface FormValues {
//   email: string;
//   firstName: string;
//   lastName: string;
//   organizationName: string;
//   password: string;
//   toggle: boolean;
// }

const SignupForm = () => {
  const history = useHistory();
  const [disable, setDisable] = React.useState(true);
  const [repeatedEmail, setRepeatedEmail] = React.useState("");
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const validate = (values) => {
    const password = values.password;
    const evaluation = zxcvbn(password);
    let errors = {};

    if (values.name.length === 0) {
      errors.name = " ";
    } else if (values.name.length > 0) {
      const trimmedname = values.name.trim();
      if (trimmedname.length === 0) {
        errors.name = "Name missing";
      } else if (values.name.length < 3) {
        errors.name = "Name must be above 3 character";
      }
    }

    if (values.company.length >= 0) {
      const trimmedcompany = values.company.trim();
      if (trimmedcompany.length === 0) {
        errors.company = "organiszation name missing";
      }
    }

    if (values.email.length === 0) {
      errors.email = " ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
      values.email.length > 0
    ) {
      errors.email = "please enter valid email";
    }

    if (values.password.length === 0) {
      errors.password = " ";
    } else if (values.password.length > 0 && values.password.length < 6) {
      if (values.password.length < 6) {
        errors.password = `password must be 6 characters or more`;
      }
    }

    if (
      values.password &&
      !errors.password &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = `Passwords do not match`;
    }

    if (values.toggle === false) {
      errors.toggle = " ";
    }
    if (
      errors.email ||
      errors.name ||
      errors.confirmPassword ||
      errors.company ||
      errors.password ||
      errors.toggle
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      confirmPassword: "",
      email: "",
      password: "",
      company: "",
      toggle: false,
    },
    validate,
    onSubmit: async (values) => {
      const dataRegister = {
        name: values.name,
        email: values.email.toLowerCase(),
        company: values.company,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      showLoader();
      setDisable(true);
      try {
        injectStyle();
        const res = await fetch(
          `${process.env.REACT_App_BASE_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataRegister),
          }
        );
        hideLoader();
        setDisable(false);
        console.log(res);
        if (res.status == 201) {
          history.push({
            pathname: "/email-verification",
            state: {
              email: dataRegister.email,
            },
          });
        }
        if (res.status == 422) {
          setRepeatedEmail(true);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="signup-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content">
        <SignupDescription />
        <FormElement
          key={1}
          submit={formik.handleSubmit}
          repeatedEmail={repeatedEmail}
          onChange={formik.handleChange}
          values={formik.values}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          oncheck={formik.values.toggle}
          disabled={disable}
        />
      </div>
      <Footer />
      <ToastContainer style={{ width: "400px" }} />
    </div>
  );
};
export default SignupForm;
