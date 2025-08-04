// Custom plugin for vertical dotted line on hover
const verticalLinePlugin = {
  id: "verticalLine",
  afterDatasetsDraw: function (chart) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      // Save the current state
      ctx.save();

      // Draw vertical dotted line
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#94A3B8";
      ctx.stroke();

      // Restore the state
      ctx.restore();
    }
  },
};

// Register the plugin
Chart.register(verticalLinePlugin);

// Revenue Chart
const revenueCtx = document.getElementById("revenueChart").getContext("2d");
const revenueChart = new Chart(revenueCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [15, 25, 18, 32, 28, 38, 22, 42, 35, 48, 40, 52],
        borderColor: "#F6BC0E",
        backgroundColor: "rgba(246, 188, 14, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#F6BC0E",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e9ecef",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return context.parsed.y + "k";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#95a5a6",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#ecf0f1",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#95a5a6",
          font: {
            size: 12,
          },
          callback: function (value) {
            return value + "k";
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  },
});

// Dispute Chart
const disputeCtx = document.getElementById("disputeChart").getContext("2d");
const disputeChart = new Chart(disputeCtx, {
  type: "doughnut",
  data: {
    labels: ["Resolved", "Pending"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#31B057", "#F5F9FD"],
        borderWidth: 0,
        borderRadius: 34,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    rotation: -120,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e9ecef",
        borderWidth: 1,
        borderRadius: 34,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.parsed + "%";
          },
        },
      },

      centerText: {
        text: ["70", "Disputes"],
        color: "#2c3e50",
        font: {
          size: [16, 12],
          family: "Arial",
          weight: [700],
        },
      },
    },
  },
  plugins: [
    {
      id: "centerText",
      afterDraw: function (chart) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font =
          chart.options.plugins.centerText.font.size[0] +
          "px " +
          chart.options.plugins.centerText.font.family;
        ctx.fillStyle = chart.options.plugins.centerText.color;
        ctx.fillText(
          chart.options.plugins.centerText.text[0],
          width / 2,
          height / 2 - 6
        );
        ctx.font =
          chart.options.plugins.centerText.font.size[1] +
          "px " +
          chart.options.plugins.centerText.font.family;
        ctx.fillText(
          chart.options.plugins.centerText.text[1],
          width / 2,
          height / 2 + 10
        );
        ctx.restore();
      },
    },
  ],
});
// Performance Chart
const performanceCtx = document
  .querySelector(".performanceChart")
  .getContext("2d");
const performanceChart = new Chart(performanceCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Completed Jobs",
        data: [20, 25, 30, 28, 35, 42, 38, 45, 40, 48, 52, 55],
        borderColor: "#388DE1",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#388DE1",
      },
      {
        label: "Posted Jobs",
        data: [15, 22, 28, 25, 32, 38, 35, 42, 38, 45, 48, 52],
        borderColor: "#F6BC0E",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#F6BC0E",
      },
      {
        label: "Active Jobs",
        data: [12, 18, 25, 22, 28, 35, 32, 38, 35, 42, 45, 48],
        borderColor: "#31B057",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#31B057",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e9ecef",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#95a5a6",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "#ecf0f1",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#95a5a6",
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  },
});
