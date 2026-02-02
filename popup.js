const intentInput = document.getElementById("intentInput");
const saveIntentBtn = document.getElementById("saveIntent");
const notesContainer = document.getElementById("notes");

function showSavedFeedback() {
  saveIntentBtn.innerText = "Saved ✓";
  saveIntentBtn.disabled = true;

  setTimeout(() => {
    saveIntentBtn.innerText = "Attach to last note";
    saveIntentBtn.disabled = false;
  }, 900);
}

function renderNotes(notes) {
  notesContainer.innerHTML = "";

  if (!notes.length) {
    notesContainer.innerText = "No notes yet.";
    saveIntentBtn.disabled = true;
    return;
  }

  saveIntentBtn.disabled = false;

  notes.slice(0, 5).forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <div class="note-header">
        <div class="note-title">${note.title}</div>
        <button class="delete">✕</button>
      </div>
      <small>${note.content}</small>
      <em>${note.user_intent || ""}</em>
      <div class="tags">${note.tags.join(" · ")}</div>
    `;

    div.querySelector(".delete").onclick = () => deleteNote(note.id);
    notesContainer.appendChild(div);
  });
}

function deleteNote(id) {
  chrome.storage.local.get({ notes: [] }, (data) => {
    const updated = data.notes.filter(n => n.id !== id);
    chrome.storage.local.set({ notes: updated }, () => renderNotes(updated));
  });
}

// Load notes
chrome.storage.local.get({ notes: [] }, (data) => {
  renderNotes(data.notes);
  if (data.notes.length) showSavedFeedback();
});

// Attach intent
saveIntentBtn.onclick = () => {
  const intent = intentInput.value.trim();
  if (!intent) return;

  chrome.storage.local.get({ notes: [] }, (data) => {
    if (!data.notes.length) return;

    data.notes[0].user_intent = intent;

    chrome.storage.local.set({ notes: data.notes }, () => {
      intentInput.value = "";
      renderNotes(data.notes);
      showSavedFeedback();
    });
  });
};