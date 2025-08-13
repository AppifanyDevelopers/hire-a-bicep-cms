let activeDate = new Date(2019, 1, 1);
let startOfRange = null;
let endOfRange = null;
let isWidgetVisible = false;

const monthNamesLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthNamesShort = [
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
];

function toggleCalendarWidget() {
  const widget = document.getElementById("calendarWidget");
  const chevron = document.getElementById("chevronIcon");

  isWidgetVisible = !isWidgetVisible;

  if (isWidgetVisible) {
    widget.classList.add("visible");
    chevron.classList.add("open");
  } else {
    widget.classList.remove("visible");
    chevron.classList.remove("open");
  }
}

function renderCalendar() {
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  document.getElementById(
    "monthYearLabel"
  ).textContent = `${monthNamesLong[month]} ${year}`;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const daysGrid = document.getElementById("daysGrid");
  daysGrid.innerHTML = "";

  const prevMonthDate = new Date(year, month, 0);
  const daysInPrevMonth = prevMonthDate.getDate();

  // Populate previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    daysGrid.appendChild(createDayCell(daysInPrevMonth - i, true));
  }

  // Populate current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    daysGrid.appendChild(createDayCell(day, false));
  }

  // Populate next month's days
  const totalCells = daysGrid.children.length;
  const remainingCells = 42 - totalCells;
  for (let day = 1; day <= remainingCells; day++) {
    daysGrid.appendChild(createDayCell(day, true));
  }
  updateDayCellStyles();
  updateDisplayDateText();
}

function createDayCell(day, isInactive) {
  const button = document.createElement("button");
  button.className = "calendar-day-cell";
  button.textContent = day;
  if (isInactive) {
    button.classList.add("inactive");
  } else {
    button.addEventListener("click", () => selectDate(day));
  }
  return button;
}

function selectDate(day) {
  const selectedDate = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth(),
    day
  );

  if (!startOfRange || (startOfRange && endOfRange)) {
    startOfRange = selectedDate;
    endOfRange = null;
  } else if (startOfRange && !endOfRange) {
    if (selectedDate < startOfRange) {
      endOfRange = startOfRange;
      startOfRange = selectedDate;
    } else {
      endOfRange = selectedDate;
    }
  }
  updateDayCellStyles();
  updateDisplayDateText();
}

function updateDayCellStyles() {
  const dayCells = document.querySelectorAll(
    ".calendar-day-cell:not(.inactive)"
  );
  dayCells.forEach((cell) => {
    const dayNumber = parseInt(cell.textContent);
    const cellDate = new Date(
      activeDate.getFullYear(),
      activeDate.getMonth(),
      dayNumber
    );

    cell.classList.remove(
      "start-date",
      "end-date",
      "in-between",
      "single-date"
    );

    if (startOfRange && isSameDay(cellDate, startOfRange)) {
      if (endOfRange && isSameDay(startOfRange, endOfRange)) {
        cell.classList.add("single-date");
      } else if (endOfRange) {
        cell.classList.add("start-date");
      } else {
        cell.classList.add("single-date");
      }
    } else if (endOfRange && isSameDay(cellDate, endOfRange)) {
      cell.classList.add("end-date");
    } else if (
      startOfRange &&
      endOfRange &&
      cellDate > startOfRange &&
      cellDate < endOfRange
    ) {
      cell.classList.add("in-between");
    }
  });
}

function updateDisplayDateText() {
  const displayText = document.getElementById("displayDateText");
  if (startOfRange && endOfRange) {
    const startStr = `${
      monthNamesShort[startOfRange.getMonth()]
    } ${startOfRange.getDate()}`;
    const endStr = `${
      monthNamesShort[endOfRange.getMonth()]
    } ${endOfRange.getDate()}`;
    const year = startOfRange.getFullYear();
    displayText.textContent = `${startStr} - ${endStr}, ${year}`;
  } else if (startOfRange) {
    const startStr = `${
      monthNamesShort[startOfRange.getMonth()]
    } ${startOfRange.getDate()}`;
    const year = startOfRange.getFullYear();
    displayText.textContent = `${startStr}, ${year}`;
  } else {
    displayText.textContent = "Date";
  }
}

function isSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function showPreviousMonth() {
  activeDate.setMonth(activeDate.getMonth() - 1);
  renderCalendar();
}

function showNextMonth() {
  activeDate.setMonth(activeDate.getMonth() + 1);
  renderCalendar();
}

function confirmDateSelection() {
  if (startOfRange && endOfRange) {
    updateDisplayDateText();
    toggleCalendarWidget();
    alert(
      `Applied date range: ${startOfRange.toDateString()} to ${endOfRange.toDateString()}`
    );
  } else if (startOfRange) {
    updateDisplayDateText();
    toggleCalendarWidget();
    alert(`Applied date: ${startOfRange.toDateString()}`);
  } else {
    alert("Please select a date range first");
  }
}

document.addEventListener("click", function (event) {
  const widget = document.getElementById("calendarWidget");
  const toggleButton = document.querySelector(".date-range-toggle-button");

  if (!widget.contains(event.target) && !toggleButton.contains(event.target)) {
    if (isWidgetVisible) {
      toggleCalendarWidget();
    }
  }
});

startOfRange = new Date(2019, 1, 14);
endOfRange = new Date(2019, 1, 16);
renderCalendar();
updateDisplayDateText();
