const API = "https://notes-api-2bsb.onrender.com";

async function getNotes() {
    const response = await fetch(API);
    const notes = await response.json();

    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = "";

    notes.forEach((note) => {
        notesDiv.innerHTML += `
            <div class="note">
                <h3>${note.title}</h3>
                <p>${new Date(note.created_at)
.toLocaleString()}</p>

                <button onclick="editNote(${note.id}, '${note.title}')">
                    Edit
                </button>

                <button onclick="deleteNote(${note.id})">
                    Delete
                </button>
            </div>
        `;
    });
}

async function addNote() {

    const title = document.getElementById("title").value;

    if (title.trim() === "") {
        alert("Enter Note");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    document.getElementById("title").value = "";

    getNotes();
}

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    getNotes();
}

async function editNote(id, oldTitle) {

    const newTitle = prompt("Edit Note", oldTitle);

    if (!newTitle) return;

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: newTitle
        })

    });

    getNotes();
}

getNotes();
function searchNote(){

    const search=document
    .getElementById("search")
    .value
    .toLowerCase();

    const notes=document.querySelectorAll(".note");

    notes.forEach((note)=>{

        const text=note.innerText.toLowerCase();

        if(text.includes(search)){

            note.style.display="block";

        }else{

            note.style.display="none";

        }

    });

}