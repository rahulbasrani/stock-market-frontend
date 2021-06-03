import * as React from "react";

const Alert = (props) => {
  return (
    <div className="toast-class">
      <span>
        <img src={props.kind} alt="" className="mr-2" />
      </span>
      <span>{props.alertMessage}</span>
    </div>
  );
};

export default Alert;
