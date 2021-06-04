import React from "react";

const DateTable = ({ open, close, high, low, change, symbol, volume }) => {
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="text-info">Change</th>
            <td className="text-info">{change}</td>
          </tr>
          <tr>
            <th className="text-warning">Symbol</th>
            <td className="text-warning">{symbol}</td>
          </tr>

          <tr>
            <th className="text-primary">Open</th>
            <td className="text-primary">
              {String.fromCharCode(9654) + " " + open}
            </td>
          </tr>
          <tr>
            <th className="text-dark">Close</th>
            <td className="text-dark">
              {String.fromCharCode(9654) + " " + close}
            </td>
          </tr>
          <tr>
            <th className="text-success">High</th>
            <td className="text-success">
              {String.fromCharCode(9650) + " " + high}
            </td>
          </tr>
          <tr>
            <th className="text-danger">Low</th>
            <td className="text-danger">
              {low + " " + String.fromCharCode(9660)}
            </td>
          </tr>
          <tr>
            <th className="text-info">Volume</th>
            <td className="text-info">
              {String.fromCharCode(9635) + " " + volume}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DateTable;
