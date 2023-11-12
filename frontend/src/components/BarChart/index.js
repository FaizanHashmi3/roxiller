import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { getMonth } from "../../functions/getMonth";
import "./styles.css"
const BarChart = ({chartArr,month}) => {

console.log("chart",chartArr);
   

  const labels = ["0-100", "101-200", "201-300", "301-400", "401-500", "501-600","601-700","701-800","801-900","900 above"];
  

  const data = {
    labels: labels,
    datasets: [
      {
        label:`Bar Chart Stats For ${getMonth(month)} Month`,
        backgroundColor: "rgb(25, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartArr,
      },
    ],
  };

  const options = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
  };

  return (
    <div className="chart">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;