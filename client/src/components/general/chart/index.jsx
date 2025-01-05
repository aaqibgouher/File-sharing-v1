import React from "react";
import ApexCharts from "react-apexcharts";

const FileSharingLineChart = () => {
  const filesData = [
    { file: "Document1.pdf", sharedUsers: [10, 20, 30, 40, 50] },
    { file: "Image1.jpg", sharedUsers: [5, 15, 25, 35, 45] },
    { file: "Presentation.pptx", sharedUsers: [2, 10, 20, 30, 40] },
    { file: "Report.docx", sharedUsers: [1, 5, 10, 15, 20] },
  ];

  const series = filesData.map((file) => ({
    name: file.file,
    data: file.sharedUsers,
  }));

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"], // Time period (or months)
      title: {
        text: "Time (Months)",
      },
    },
    yaxis: {
      title: {
        text: "Number of People Shared With",
      },
    },
    title: {
      text: "File Sharing Over Time",
      align: "center",
    },
  };

  return (
    <div className="container mt-5">
      <ApexCharts options={options} series={series} type="line" height={450} />
    </div>
  );
};

export default FileSharingLineChart;
