// Sample data for messages
const messagesData = {
  all: [
    {
      id: 1,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 7,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  contact: [
    {
      id: 1,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 7,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "contact",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  disputes: [
    {
      id: 2,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "pending",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Olivia Rhye",
      email: "olivia@gmail.com",
      date: "12/03/2024",
      status: "completed",
      type: "dispute",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};

// Global variables
let currentTab = "all";
let selectedMessage = null;
let currentView = "report";

// DOM Elements
let messageList;
let tabButtons;
let defaultView;
let messageView;
let reportSubjectView;
let jobDetailsView;
let messagesView;
let reportBtn;
let jobDetailsBtn;
let messagesBtn;
let messageUserName;
let messageUserEmail;

// Sidebar elements
let sidebar;
let sidebarToggle;
let btnToggleSidebar;
let sidebarOverlay;
let main;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeDOM();
  initializeApp();
});

function initializeDOM() {
  // Get DOM elements
  messageList = document.getElementById("messageList");
  tabButtons = document.querySelectorAll(".tab-btn");
  defaultView = document.getElementById("defaultView");
  messageView = document.getElementById("messageView");
  reportSubjectView = document.getElementById("reportSubjectView");
  jobDetailsView = document.getElementById("jobDetailsView");
  messagesView = document.getElementById("messagesView");
  reportBtn = document.getElementById("reportBtn");
  jobDetailsBtn = document.getElementById("jobDetailsBtn");
  messagesBtn = document.getElementById("messagesBtn");
  messageUserName = document.getElementById("messageUserName");
  messageUserEmail = document.getElementById("messageUserEmail");

  // Sidebar elements
  sidebar = document.getElementById("sidebar");
  sidebarToggle = document.getElementById("sidebarToggle");
  btnToggleSidebar = document.getElementById("btnToggleSidebar");
  sidebarOverlay = document.getElementById("sidebarOverlay");
  main = document.querySelector(".main");
}

function initializeApp() {
  setupEventListeners();
  renderMessages(currentTab);
  showDefaultView();
}

function setupEventListeners() {
  // Tab navigation
  if (tabButtons) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabName = this.dataset.tab;
        switchTab(tabName);
      });
    });
  }

  // View switching buttons
  if (reportBtn)
    reportBtn.addEventListener("click", () => switchContentView("report"));
  if (jobDetailsBtn)
    jobDetailsBtn.addEventListener("click", () =>
      switchContentView("jobDetails")
    );
  if (messagesBtn)
    messagesBtn.addEventListener("click", () => switchContentView("messages"));

  // Sidebar toggle functionality
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar);
  }

  if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener("click", toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Window resize handler
  window.addEventListener("resize", handleResize);

  // Setup message input functionality
  setupMessageInput();

  // Setup action buttons
  setupActionButtons();

  // Setup start chat button
  setupStartChatButton();
}

function switchTab(tabName) {
  currentTab = tabName;

  // Update active tab button
  if (tabButtons) {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
      activeTab.classList.add("active");
    }
  }

  // Render messages for selected tab
  renderMessages(tabName);

  // Show default view when switching tabs
  showDefaultView();
}

function renderMessages(tab) {
  if (!messageList) return;

  const messages = messagesData[tab] || [];

  messageList.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = createMessageElement(message);
    messageList.appendChild(messageElement);
  });
}

function createMessageElement(message) {
  const div = document.createElement("div");
  div.className = "message-item";
  div.dataset.messageId = message.id;

  const statusClass =
    message.status === "completed"
      ? "status-completed"
      : message.status === "pending"
      ? "status-pending"
      : "status-contact";

  div.innerHTML = `
    <img src="${message.avatar}" alt="${message.name}" class="message-avatar">
    <div class="message-info">
      <div class="message-name">${message.name}</div>
      <div class="message-email">${message.email}</div>
    </div>
    <div class="message-meta">
      <div class="message-date">${message.date}</div>
      <div class="message-status ${statusClass}">${message.status.toUpperCase()}</div>
    </div>
  `;

  div.addEventListener("click", () => selectMessage(message, div));

  return div;
}

function selectMessage(message, element) {
  selectedMessage = message;

  // Remove active class from all message items
  document.querySelectorAll(".message-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to selected item
  if (element) {
    element.classList.add("active");
  }

  // Update user info in header
  if (messageUserName) messageUserName.textContent = message.name;
  if (messageUserEmail) messageUserEmail.textContent = message.email;

  // Show message view and hide default view
  showMessageView();

  // Show appropriate content based on message type
  if (message.type === "dispute") {
    switchContentView("report");
  } else {
    switchContentView("messages");
  }
}

function showDefaultView() {
  if (defaultView) defaultView.classList.add("active");
  if (messageView) messageView.classList.remove("active");
  selectedMessage = null;
}

function showMessageView() {
  if (defaultView) defaultView.classList.remove("active");
  if (messageView) messageView.classList.add("active");
}

function switchContentView(viewName) {
  currentView = viewName;

  // Hide all content views
  if (reportSubjectView) reportSubjectView.classList.remove("active");
  if (jobDetailsView) jobDetailsView.classList.remove("active");
  if (messagesView) messagesView.classList.remove("active");

  // Reset button states
  resetButtonStates();

  // Show selected view and update button
  switch (viewName) {
    case "report":
      if (reportSubjectView) reportSubjectView.classList.add("active");
      if (reportBtn) {
        reportBtn.classList.remove("btn-outline-primary");
        reportBtn.classList.add("btn-primary");
      }
      break;
    case "jobDetails":
      if (jobDetailsView) jobDetailsView.classList.add("active");
      if (jobDetailsBtn) {
        jobDetailsBtn.classList.remove("btn-outline-primary");
        jobDetailsBtn.classList.add("btn-primary");
      }
      break;
    case "messages":
      if (messagesView) messagesView.classList.add("active");
      if (messagesBtn) {
        messagesBtn.classList.remove("btn-outline-primary");
        messagesBtn.classList.add("btn-secondary");
      }
      break;
  }
}

function resetButtonStates() {
  if (reportBtn) {
    reportBtn.classList.remove("btn-primary");
    reportBtn.classList.add("btn-outline-primary");
  }
  if (jobDetailsBtn) {
    jobDetailsBtn.classList.remove("btn-primary");
    jobDetailsBtn.classList.add("btn-outline-primary");
  }
  if (messagesBtn) {
    messagesBtn.classList.remove("btn-secondary");
    messagesBtn.classList.add("btn-outline-primary");
  }
}

// Sidebar functionality
function toggleSidebar() {
  if (window.innerWidth <= 768) {
    if (sidebar) sidebar.classList.toggle("show");
    if (sidebarOverlay) sidebarOverlay.classList.toggle("show");
    document.body.style.overflow =
      sidebar && sidebar.classList.contains("show") ? "hidden" : "auto";
  } else {
    if (sidebar) sidebar.classList.toggle("collapsed");
    if (main) main.classList.toggle("expanded");
  }
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove("show");
  if (sidebarOverlay) sidebarOverlay.classList.remove("show");
  document.body.style.overflow = "auto";
}

function handleResize() {
  if (window.innerWidth > 768) {
    if (sidebar) sidebar.classList.remove("show");
    if (sidebarOverlay) sidebarOverlay.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

// Message input functionality
function setupMessageInput() {
  const messageInput = document.querySelector(".message-input input");
  const sendButton = document.querySelector(".message-input button");

  if (messageInput && sendButton) {
    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
}

function sendMessage() {
  const messageInput = document.querySelector(".message-input input");
  const chatContainer = document.querySelector(".chat-container");

  if (messageInput && messageInput.value.trim() && chatContainer) {
    const messageText = messageInput.value.trim();

    // Create new message element
    const messageDiv = document.createElement("div");
    messageDiv.className = "message sent";
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${messageText}</p>
      </div>
    `;

    // Insert before message input
    const messageInputContainer = document.querySelector(".message-input");
    if (messageInputContainer) {
      chatContainer.insertBefore(messageDiv, messageInputContainer);
    }

    // Clear input
    messageInput.value = "";

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

// Action button functionality
function setupActionButtons() {
  const releaseFundsBtn = document.querySelector(
    ".action-buttons .btn-primary"
  );
  const giveRefundBtn = document.querySelector(".action-buttons .btn-warning");
  const markResolvedBtn = document.querySelector(
    ".action-buttons .btn-success"
  );

  if (releaseFundsBtn) {
    releaseFundsBtn.addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to release funds? This action cannot be undone."
        )
      ) {
        alert("Funds have been released successfully.");
        updateMessageStatus("completed");
      }
    });
  }

  if (giveRefundBtn) {
    giveRefundBtn.addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to give a refund? This action cannot be undone."
        )
      ) {
        alert("Refund has been processed successfully.");
        updateMessageStatus("completed");
      }
    });
  }

  if (markResolvedBtn) {
    markResolvedBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to mark this dispute as resolved?")) {
        alert("Dispute has been marked as resolved.");
        updateMessageStatus("completed");
      }
    });
  }
}

function updateMessageStatus(newStatus) {
  if (selectedMessage) {
    selectedMessage.status = newStatus;
    // Update in all data arrays
    Object.keys(messagesData).forEach((key) => {
      const message = messagesData[key].find(
        (m) => m.id === selectedMessage.id
      );
      if (message) {
        message.status = newStatus;
      }
    });
    renderMessages(currentTab);

    // Re-select the updated message
    setTimeout(() => {
      const updatedElement = document.querySelector(
        `[data-message-id="${selectedMessage.id}"]`
      );
      if (updatedElement) {
        updatedElement.classList.add("active");
      }
    }, 100);
  }
}

// Start chat functionality
function setupStartChatButton() {
  const startChatBtn = document.querySelector(
    ".user-card .btn-outline-primary"
  );

  if (startChatBtn) {
    startChatBtn.addEventListener("click", function () {
      // Switch to messages view
      switchContentView("messages");
      alert("Chat initiated with Luna Jackson");
    });
  }
}

// Sort functionality
function setupSortDropdown() {
  const sortDropdown = document.querySelector(".sort-dropdown select");

  if (sortDropdown) {
    sortDropdown.addEventListener("change", function () {
      const sortBy = this.value;
      sortMessages(sortBy);
    });
  }
}

function sortMessages(sortBy) {
  const currentMessages = messagesData[currentTab];

  if (!currentMessages) return;

  switch (sortBy) {
    case "Date":
      currentMessages.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "Name":
      currentMessages.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Status":
      currentMessages.sort((a, b) => a.status.localeCompare(b.status));
      break;
  }

  renderMessages(currentTab);
}

// Initialize sort dropdown after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupSortDropdown();
});

// Handle dynamic content updates
function refreshMessageList() {
  renderMessages(currentTab);
  if (selectedMessage) {
    const messageElement = document.querySelector(
      `[data-message-id="${selectedMessage.id}"]`
    );
    if (messageElement) {
      messageElement.classList.add("active");
    }
  }
}

// Export functions for potential external use
window.MessageSupport = {
  switchTab,
  selectMessage,
  switchContentView,
  refreshMessageList,
  sendMessage,
};
