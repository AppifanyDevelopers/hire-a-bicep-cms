let editors = {}, original = {};

function editSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editorField = document.getElementById(`${id}Editor`);
  const editButton = content.nextElementSibling;
  original[id] = content.innerHTML;

  content.style.display = 'none';
  editorContainer.style.display = 'block';
  if (editButton) editButton.style.display = 'none';

  ClassicEditor
    .create(editorField)
    .then(editor => {
      editors[id] = editor;
      editor.setData(original[id]);
    })
    .catch(error => {
      console.error(error);
    });
}

function saveSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editButton = content.nextElementSibling;
  content.innerHTML = editors[id].getData();
  editors[id].destroy();
  editorContainer.style.display = 'none';
  content.style.display = 'block';
  if (editButton) editButton.style.display = 'inline-block';
}

function cancelSection(id) {
  const content = document.getElementById(`${id}Content`);
  const editorContainer = document.getElementById(`${id}EditorContainer`);
  const editButton = content.nextElementSibling;
  editors[id].destroy();
  editorContainer.style.display = 'none';
  content.style.display = 'block';
  if (editButton) editButton.style.display = 'inline-block';
}