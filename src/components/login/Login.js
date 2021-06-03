import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import LoginElement from "./LoginElement";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import useFullPageLoader from "../loader/use-fullpage-loader";
import "react-toastify/dist/ReactToastify.css";
import "./login.style.css";

const LoginComponent = () => {
  const [disable, setDisable] = React.useState(true);
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  React.useEffect(() => {
    let data = localStorage.getItem("isLogin");
    if (data) {
      history.push("/dashboard");
    }
  });
  const validate = (values) => {
    let errors = {};

    if (values.email.length === 0) {
      errors.email = " ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
      values.email.length > 0
    ) {
      errors.email = `Please Enter valid Email`;
    }

    if (values.password.length === 0) {
      errors.password = " ";
    } else if (values.password.length > 0 && values.password.length < 6) {
      errors.password = `Password must be six characters or more`;
    }

    if (errors.email || errors.password) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const dataLogin = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      showLoader();
      setDisable(true);
      try {
        const res = await fetch(`${process.env.REACT_App_BASE_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataLogin),
        });
        hideLoader();
        setDisable(false);

        if (res.status == 201) {
          let loginData = {
            email: dataLogin.email,
          };

          let data = localStorage.getItem("isLogin");
          /****  Stringify setItem values that takes string or null  ****/

          localStorage.setItem("isLogin", JSON.stringify(loginData));

          history.push("/dashboard");
        }

        if (res.status == 400) {
          toast.error("🧐 Invalid credentials entered 🧐 ", {
            position: "top-center",
          });
        }

        if (res.status == 401) {
          history.push({
            pathname: "/email-verification",
            state: {
              email: dataLogin.email,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="login-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-login">
        <LoginElement
          key={1}
          submit={formik.handleSubmit}
          onChange={formik.handleChange}
          values={formik.values}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          disabled={disable}
        />
      </div>
      <Footer />
      <ToastContainer style={{ width: "400px" }} />
    </div>
  );
};
export default LoginComponent;
