import React from "react";
import { Line as LineChart } from "react-chartjs-2";

const ChartLineGraph = ({ title, chartLabels, chartData }) => {
  const data = {
    labels: chartLabels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: title,
        data: chartData, //[12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(77, 247, 122, 0.5)"],
        borderColor: ["rgba(75,224,159,1)"],
        borderWidth: 0.8,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <LineChart data={data} options={options} />;
};

export default ChartLineGraph;
