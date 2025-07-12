let faqs = [
  {
    id: 1,
    question: "This is placeholder text only?",
    answer:
      "This is placeholder text only, intended for visual demonstration purposes only. The content here is not meant to convey any specific information but to illustrate how text will appear in the final design. Please note that this text will be replaced with the approved content at the final stage.",
  },
  {
    id: 2,
    question: "This is placeholder text only?",
    answer:
      "This is placeholder text only, intended for visual demonstration purposes only. The content here is not meant to convey any specific information but to illustrate how text will appear in the final design. Please note that this text will be replaced with the approved content at the final stage.",
  },
  {
    id: 3,
    question: "This is placeholder text only?",
    answer:
      "This is placeholder text only, intended for visual demonstration purposes only. The content here is not meant to convey any specific information but to illustrate how text will appear in the final design. Please note that this text will be replaced with the approved content at the final stage.",
  },
  {
    id: 4,
    question: "This is placeholder text only?",
    answer:
      "This is placeholder text only, intended for visual demonstration purposes only. The content here is not meant to convey any specific information but to illustrate how text will appear in the final design. Please note that this text will be replaced with the approved content at the final stage.",
  },
  {
    id: 5,
    question: "This is placeholder text only?",
    answer:
      "This is placeholder text only, intended for visual demonstration purposes only. The content here is not meant to convey any specific information but to illustrate how text will appear in the final design. Please note that this text will be replaced with the approved content at the final stage.",
  },
];

const faqList = document.getElementById("faqList");
const addFaqForm = document.getElementById("addFaqForm");
const questionTitle = document.getElementById("questionTitle");
const answerContent = document.getElementById("answerContent");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");

function renderFAQs(faqsToRender = faqs) {
  faqList.innerHTML = "";
  faqsToRender.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    const isExpanded = index === 0;
    faqItem.className = "faq-item" + (isExpanded ? " expanded" : "");

    faqItem.innerHTML = `
        <div class="faq-header" onclick="toggleFAQ(${faq.id})">
          <h3 class="faq-question">${faq.question}</h3>
          <div class="faq-actions" onclick="event.stopPropagation()">
            <button onclick="editFAQ(${
              faq.id
            })"><img src="/img/edit.svg" /></button>
            <button onclick="deleteFAQ(${
              faq.id
            })"><img src="/img/delete.svg" /></button>
            <button class="toggle-icon" onclick="toggleFAQ(${faq.id})">
              <img src="/img/${isExpanded ? "arrow-up" : "arrow-down"}.svg" />
            </button>
          </div>
        </div>
        <div class="faq-content">${faq.answer}</div>
      `;
    faqList.appendChild(faqItem);
  });
}

function toggleFAQ(id) {
  const index = faqs.findIndex((f) => f.id === id);
  const faqItems = document.querySelectorAll(".faq-item");
  const item = faqItems[index];
  const icon = item.querySelector(".toggle-icon img");

  item.classList.toggle("expanded");
  if (item.classList.contains("expanded")) {
    icon.src = "/img/arrow-up.svg";
  } else {
    icon.src = "/img/arrow-down.svg";
  }
}

function editFAQ(id) {
  const faq = faqs.find((f) => f.id === id);
  if (faq) {
    questionTitle.value = faq.question;
    answerContent.value = faq.answer;
  }
}

function deleteFAQ(id) {
  if (confirm("Are you sure you want to delete this FAQ?")) {
    faqs = faqs.filter((f) => f.id !== id);
    renderFAQs();
  }
}

addFaqForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newFAQ = {
    id: Math.max(0, ...faqs.map((f) => f.id)) + 1,
    question: questionTitle.value.trim(),
    answer: answerContent.value.trim(),
  };
  if (newFAQ.question && newFAQ.answer) {
    faqs.unshift(newFAQ);
    renderFAQs();
    addFaqForm.reset();
  }
});

cancelBtn.addEventListener("click", () => {
  addFaqForm.reset();
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(value) ||
      f.answer.toLowerCase().includes(value)
  );
  renderFAQs(filtered);
});

renderFAQs();
