    document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('note-form');
    const notesContainer = document.getElementById('notes-container');


    // Escuchar el envío del formulario para agregar una nota
    noteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const noteTitle = document.getElementById('note-title').value;
        const noteContent = document.getElementById('note-content').value;

        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            alert('Por favor completa ambos campos.');
            return;
        }

        // Crear objeto de nota
        const note = {
            title: noteTitle,
            content: noteContent
        };

        // Guardar la nota en localStorage
        saveNote(note);

        // Limpiar el formulario y recargar las notas
        noteForm.reset();
        loadNotes();
    });

    // Función para guardar una nota en localStorage
    function saveNote(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Función para cargar las notas desde localStorage
    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // Limpiar contenedor de notas
        notesContainer.innerHTML = '';

        // Mostrar cada nota en el contenedor
        notes.forEach(function (note, index) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button onclick="deleteNote(${index})">Eliminar</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    // Función para eliminar una nota
    window.deleteNote = function (index) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };



});
