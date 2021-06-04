import * as React from "react";
import { useHistory } from "react-router-dom";

import logo from "../../assets/images/logo-stock.png";

const Navbar = () => {
  const history = useHistory();
  React.useEffect(() => {
    let data = localStorage.getItem("isLogin");
    if (!data) {
      history.push("/login");
    }
  }, []);
  let dataLogs = localStorage.getItem("isLogin");
  let dataEmail = JSON.parse(dataLogs);

  const handleRegister = () => {
    let data = localStorage.getItem("isLogin");
    /****  Stringify setItem values that takes string or null  ****/
    if (data) {
      localStorage.removeItem("isLogin");
      history.push("/login");
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg col-md-11 mx-auto navbar-light">
        <a className="navbar-brand" href="/signup">
          <img
            src={logo}
            height="30"
            width="30"
            className="img-logos"
            alt="reactangel1"
          />
          &nbsp; <span className="logo-texts">Stock Representation</span>
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ml-auto">
            <li className="nav-item">
              Hi!&nbsp;
              <span className="mr-3 anchor-class anchor-class-login">
                {/* {translation.t("LOGIN")} */}
                {dataEmail && dataEmail.email}
              </span>
            </li>
            <li className="nav-item ">
              <span
                onClick={handleRegister}
                className="btn-register-with-us hovers text-decoration-none px-4"
              >
                {/* <span className="">{translation.t("REGISTER_WITH_US")}</span> */}
                <span>Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
};
export default Navbar;
