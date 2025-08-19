let editors = {};
let original = {};

function editSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editorField = document.getElementById(`${id}Editor`);
  const editButton = content.nextElementSibling;
  original[id] = content.innerHTML;

  content.style.display = "none";
  editorContainer.style.display = "block";
  if (editButton) editButton.style.display = "none";

  ClassicEditor.create(editorField, {
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "body-medium-semibold",
        },
        {
          model: "heading1",
          view: "h2",
          title: "Heading 2",
          class: "text-small-semibold",
        },
      ],
    },
  })
    .then((editor) => {
      editors[id] = editor;
      editor.setData(original[id]);

      // Inject your CSS inside the editor content area
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "css/style.css";
      editor.ui.view.editable.element.ownerDocument.head.appendChild(styleLink);

      editor.ui.view.editable.element.classList.add("body-medium-semibold");
    })
    .catch((error) => {
      console.error(error);
    });
}

function saveSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editButton = content.nextElementSibling;
  content.innerHTML = editors[id].getData();
  editors[id].destroy();
  editorContainer.style.display = "none";
  content.style.display = "block";
  if (editButton) editButton.style.display = "inline-block";
}

function cancelSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editButton = content.nextElementSibling;
  editors[id].destroy();
  editorContainer.style.display = "none";
  content.style.display = "block";
  if (editButton) editButton.style.display = "inline-block";
}
