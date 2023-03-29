const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");

const deletedDiv = document.getElementById("deleted-items");
const archivedDiv = document.getElementById("archived-items");

let searchBar = document.getElementById("search-bar");

showNotes();
// local storage vs session storage
// JSON: JavaScript Object Notation

function addNotes() {
  // let notesA=[]
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  if (addText.value == "") {
    alert("Add your note");
    return;
  }

  const noteObj = {
    title: addTitle.value,
    text: addText.value,
  };
  addTitle.value = "";
  addText.value = "";
  notes.push(noteObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function showNotes() {
  let notesHTML = "";
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  for (let i = 0; i < notes.length; i++) {
    notesHTML += `<div class="note" id="note-list">
                    <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                    <span class="title">${
                      notes[i].title === "" ? "Note" : notes[i].title
                    }</span>
                    <div class="text">${notes[i].text}</div>
                </div>
        `;
  }
  notesDiv.innerHTML = notesHTML;
}

let deletedNotes = [];
function deleteNote(ind) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }

  deletedNotes.push(notes[ind]);
  console.log(deletedNotes);
  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  let notesHTML = "";
  let dNotes = localStorage.getItem("deletedNotes");
  console.log(dNotes);
  if (dNotes === null) {
    return;
  } else {
    dNotes = JSON.parse(dNotes);
  }
  for (let i = 0; i < dNotes.length; i++) {
    notesHTML += `<div class="note" id="note-list">
    <button class="deleteNote" id=${i} onclick="retriveNote(${i})">Retrive</button>
    <button class="deleteNote" id=${i} onclick="deleteNotePermanent(${i})">Delete</button>
    <span class="title">${dNotes[i].title}</span>
    <div class="text">${dNotes[i].text}</div>
</div>
`;
  }
  deletedDiv.innerHTML = notesHTML;
  archivedDiv.innerHTML = notesHTML;

  notes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  updateDeleteNotes();
}

function updateDeleteNotes() {
  let notesHTML = "";

  let dNotes = localStorage.getItem("deletedNotes");
  if (dNotes === null) {
    return;
  } else {
    dNotes = JSON.parse(dNotes);
  }
  for (let i = 0; i < dNotes.length; i++) {
    notesHTML += `<div class="note" id="note-list">
    <button class="deleteNote" id=${i} onclick="retriveNote(${i})">Retrive</button>
    <button class="deleteNote" id=${i} onclick="deleteNotePermanent(${i})">Delete</button>
    <span class="title">${dNotes[i].title}</span>
    <div class="text">${dNotes[i].text}</div>
</div>
`;
  }
  deletedDiv.innerHTML = notesHTML;
  archivedDiv.innerHTML = notesHTML;
}

function deleteNotePermanent(ind) {
  let dNotes = localStorage.getItem("deletedNotes");
  console.log(dNotes);
  if (dNotes === null) {
    return;
  } else {
    dNotes = JSON.parse(dNotes);
  }
  dNotes.splice(ind, 1);
  localStorage.setItem("deletedNotes", JSON.stringify(dNotes));
  showNotes();
  updateDeleteNotes();
}

function retriveNote(ind) {
  let dNotes = localStorage.getItem("deletedNotes");
  let notes = localStorage.getItem("notes");
  if (dNotes === null) {
    return;
  } else {
    dNotes = JSON.parse(dNotes);
  }
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  dNotes.slice(ind, 1);
  notes.push(dNotes[ind]);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("deletedNotes", JSON.stringify(dNotes));
  showNotes();
  updateDeleteNotes();
}

addNoteButton.addEventListener("click", addNotes);

function toggleCard(id) {
  let cardBody = document.getElementById(id);
  let icon = cardBody.previousElementSibling.querySelector("i");

  if (cardBody.style.display === "none") {
    cardBody.style.display = "block";
  } else {
    cardBody.style.display = "none";
  }
}

let notesA = JSON.parse(localStorage.getItem("notes")) || [];

let noteList = document.getElementById("note-list");

searchBar.addEventListener("input", function () {
  let searchQuery = searchBar.value.toLowerCase();
  let filteredNotes = notesA.filter(function (note) {
    return (
      note.title.toLowerCase().includes(searchQuery) ||
      note.text.toLowerCase().includes(searchQuery)
    );
  });

  updateNoteList(filteredNotes);
});

function updateNoteList(notes) {
  notesDiv.innerHTML = "";
  notes.forEach(function (note) {
    let noteCard = document.createElement("div");
    noteCard.classList.add("note");
    noteCard.innerHTML = `<h2>  ${
      note.title === "" ? "Note" : note.title
    }  </h2>  <p>  ${note.text}  </p>`;
    notesDiv.appendChild(noteCard);
  });
}

// assignment

/*
1. delete notes: implementation delete array
2. Archieve Notes: implementation archieve array
3. sorting filter, iterate through all the notes, and check 
4. reminder
5. edit note
*/
