const barctx = document.getElementById("ageChart").getContext("2d");
const ageChart = new Chart(barctx, {
  type: "bar",
  data: {
    labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    datasets: [
      {
        label: "Users",
        data: [15000, 30000, 20678, 40000, 10000, 20000],
        backgroundColor: [
          "#FCEAB4",
          "#FBE090",
          "#F9D25E",
          "#F8C93E",
          "#F6BC0E",
          "#E0AB0D",
        ],
        borderColor: [
          "#FCEAB4",
          "#FBE090",
          "#F9D25E",
          "#F8C93E",
          "#F6BC0E",
          "#E0AB0D",
        ],
        borderWidth: 0,
        barPercentage: 0.3,
        categoryPercentage: 0.8,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 16,
          bottomRight: 16,
        },
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10000,
          callback: function (value) {
            return value / 1000 + "k";
          },
        },
        max: 40000,
        grid: {
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        barThickness: 28,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw || 0;
            return "Total: " + value.toLocaleString() + " users";
          },
        },
      },
    },
  },
});
