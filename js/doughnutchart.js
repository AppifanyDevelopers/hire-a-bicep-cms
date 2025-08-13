document.addEventListener("DOMContentLoaded", function () {
  // Colors matching the image exactly
  const primaryYellow = "#F7C121"; // Female
  const primaryBlue = "#1B3A54"; // Male
  const lightGray = "#ADB5BD"; // Other

  const usersByGenderCtx = document
    .getElementById("usersByGenderChart")
    .getContext("2d");

  new Chart(usersByGenderCtx, {
    type: "doughnut",
    data: {
      labels: ["Female", "Male", "Other"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: [
            primaryYellow, // Yellow for Female
            primaryBlue, // Dark Blue for Male
            lightGray, // Light Gray for Other
          ],
          borderWidth: 0,
          spacing: 8, // This creates the gap between segments
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%", // Creates the doughnut hole
      plugins: {
        legend: {
          display: false, // Using custom legend
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(33, 37, 41, 0.95)",
          titleFont: { size: 14, weight: "600" },
          bodyFont: { size: 13, weight: "normal" },
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.parsed + "%";
            },
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
      layout: {
        padding: 10,
      },
    },
  });
});
