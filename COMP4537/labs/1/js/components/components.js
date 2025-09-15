class NoteContainer {
    constructor(noteContainerDiv, lastStoredSpanDiv, readonly) {
        // Links to the existing container on the DOM
        this.noteContainerDiv = noteContainerDiv;
        // Links to the existing span on the DOM
        this.lastStoredSpan = lastStoredSpanDiv;
        // Initialize the notes dictionary
        this.notes = {};
        // Hydrates the container immediately
        this.hydrateContainer(readonly);
    }
    hydrateContainer(readonly) {
        // Hydrate the lastStored from the localStorage
        this.lastStoredSpan.textContent =
            `Last stored at: ${localStorage.getItem("lastStored")}` || "";
        // Hydrates the container with notes from the local storage
        let data = {
            notes: JSON.parse(localStorage.getItem("notes") || "{}"),
        };
        // Update the  local notes with the localStorage notes if exists
        this.notes = data.notes;
        // Clear existing rows to avoid duplicates on each hydrate
        this.noteContainerDiv.innerHTML = "";
        // Render rows from storage
        Object.entries(data.notes).forEach(([key, value]) => {
            this.noteContainerDiv.appendChild(new NoteRow(value, readonly, this.lastStoredSpan, this.notes, key)
                .noteRowDiv);
        });
    }
    addNoteRow() {
        this.noteContainerDiv.appendChild(new NoteRow("", false, this.lastStoredSpan, this.notes).noteRowDiv);
    }
    removeRow(id) {
        const rowToRemove = document.getElementById(id);
        rowToRemove.remove();
    }
}
class NoteRow {
    constructor(text, readOnly, lastStoredSpan, notes, id) {
        // Make Row main properties. Creates a new id, if an id doesn't exist
        this.id = id ? id : this.createUUID();
        // Creates the row div
        this.noteRowDiv = document.createElement("div");
        this.noteRowDiv.className = "noteRow";
        this.noteRowDiv.id = this.id;
        // Creates the NoteText and RemoveButton
        this.noteText = new NoteText(this.id, text, readOnly, lastStoredSpan, notes);
        if (!readOnly)
            this.removeButton = new RemoveButton(this.id);
        // Appends both children
        this.noteRowDiv.appendChild(this.noteText.textarea);
        if (!readOnly)
            this.noteRowDiv.appendChild(this.removeButton.btn);
    }
    /**
     * UUID was found from stack overflow
     * @returns random UUID as a string
     */
    createUUID() {
        return NoteRow.UUID_BASE.replace(/[xy]/g, function (c) {
            const r = (Math.random() * NoteRow.SIXTEEN) | NoteRow.ZERO; // random number 0–15
            const v = c === NoteRow.X ? r : (r & NoteRow.THREE_BITS) | NoteRow.EIGHT_BITS; // force correct bits
            return v.toString(NoteRow.SIXTEEN);
        });
    }
}
// Magic numbers
NoteRow.SIXTEEN = 16;
NoteRow.ZERO = 0;
NoteRow.THREE_BITS = 0x3;
NoteRow.EIGHT_BITS = 0x8;
NoteRow.UUID_BASE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
NoteRow.X = "x";
class NoteText {
    constructor(id, text, readOnly, lastStoredSpanDiv, notes) {
        // Stores the id into the class
        this.id = id;
        // Link last stored span
        this.lastStoredSpan = lastStoredSpanDiv;
        // Create textarea
        this.textarea = document.createElement("textarea");
        // Add properties
        this.textarea.textContent = text;
        this.textarea.className = "noteText";
        this.textarea.rows = NoteText.MAX_HEIGHT;
        this.textarea.disabled = readOnly;
        // Last Stored Date Value
        this.lastStoredValue = "";
        // Writes to local storage onchange
        this.textarea.oninput = () => {
            this.writeToLocalStorage(notes);
        };
    }
    writeToLocalStorage(notes) {
        // Date / Time Area
        this.updateAndStoreTime();
        // Writes to local storage
        // Update the dictionary
        notes[this.id] = this.textarea.value;
        localStorage.setItem("notes", JSON.stringify(notes));
        // Print client local dictionary
        console.log(notes);
    }
    updateAndStoreTime() {
        // Update the Value
        this.lastStoredValue = new Date().toLocaleString();
        // Update on the DOM using the value
        this.lastStoredSpan.innerHTML = `Last stored at: ${this.lastStoredValue}`;
        // Store on localStorage
        localStorage.setItem("lastStored", this.lastStoredValue);
    }
}
// Magic Numbers
NoteText.MAX_HEIGHT = 3;
class RemoveButton {
    constructor(noteId) {
        // Create button
        this.btn = document.createElement("button");
        // Add Properties
        this.btn.textContent = "Remove";
        this.btn.className = "removeButton";
        this.btn.onclick = () => {
            this.removeFromLocalStorage(noteId);
            this.removeFromDOM(noteId);
        };
    }
    removeFromDOM(id) {
        this.rowToRemove = document.getElementById(id);
        console.log("Removing row with id:", id);
        this.rowToRemove.remove();
    }
    removeFromLocalStorage(id) {
        // Get the notes from local storage
        const notes = JSON.parse(localStorage.getItem("notes") || "{}");
        delete notes[id];
        // Remove from local storage
        console.log(`Removing from local storage. ID: ${id}`);
        // Update localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}
export { NoteContainer, NoteRow, NoteText, RemoveButton };
