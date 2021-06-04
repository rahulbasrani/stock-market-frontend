import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AuthenticationOfEmail = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { email, token } = queryString.parse(search);

  const checkToken = async () => {
    const dataEmailVerify = {
      email: email,
      token: token,
    };
    try {
      const res = await fetch(
        `https://stock-market-backend-in-mern.herokuapp.com/email_verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataEmailVerify),
        }
      );

      if (res.status === 200) {
        history.push("/email-verified");
      }

      if (res.status === 422 || res.status === 400) {
        toast.error("🧐 Invalid token 🧐 ", {
          position: "top-center",
        });

        setInterval(() => {
          history.push("/");
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
export default AuthenticationOfEmail;
