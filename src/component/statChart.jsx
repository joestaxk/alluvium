import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Project Metrics",
        data: [2, 45, 3, 60, 5], // Corresponding values for each project metric
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area", // Area chart
      },
      dataLabels: {
        enabled: false, // Disable data labels for a cleaner chart
      },
      stroke: {
        curve: "smooth", // Smooth line for the area chart
      },
      xaxis: {
        type: "category",
        categories: [
          "Active Projects",
          "Avg Duration (days)",
          "Completed Projects",
          "Success Rate (%)",
          "Total Projects",
        ], // X-axis labels
      },
      yaxis: {
        title: {
          text: "Values", // Y-axis title
        },
      },
      fill: {
        opacity: 0.5, // Adds a transparent fill to the area
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val; // Display value in the tooltip
          },
        },
      },
    },
  });

  return (
    <div className="pmd:x-24 sm:px-16 px-2 mt-10">
      <ReactApexChart
        options={state}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default StatChart;
