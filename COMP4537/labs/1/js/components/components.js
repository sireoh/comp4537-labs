class NoteContainer {
    constructor(noteContainerDiv, lastStoredSpanDiv) {
        // Links to the existing container on the DOM
        this.noteContainerDiv = noteContainerDiv;
        // Links to the existing span on the DOM
        this.lastStoredSpan = lastStoredSpanDiv;
        // Hydrates the container immediately
        this.hydrateContainer();
    }
    hydrateContainer() {
        // Hydrates the container with data from the local storage
        Object.keys(localStorage).forEach((key) => {
            const value = localStorage.getItem(key);
            this.noteContainerDiv.appendChild(new NoteRow(value, false, this.lastStoredSpan, key).noteRowDiv);
        });
    }
    addNoteRow() {
        this.noteContainerDiv.appendChild(new NoteRow("", false, this.lastStoredSpan).noteRowDiv);
    }
    removeRow(id) {
        const rowToRemove = document.getElementById(id);
        rowToRemove.remove();
    }
}
class NoteRow {
    constructor(text, readOnly, lastStoredSpan, id) {
        // Make Row main properties. Creates a new id, if an id doesn't exist
        this.id = id ? id : this.createUUID();
        // Creates the row div
        this.noteRowDiv = document.createElement("div");
        this.noteRowDiv.className = "noteRow";
        this.noteRowDiv.id = this.id;
        // Creates the NoteText and RemoveButton
        this.noteText = new NoteText(this.id, text, readOnly, lastStoredSpan);
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
    constructor(id, text, readOnly, lastStoredSpanDiv) {
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
        // Writes to local storage onchange
        this.textarea.oninput = () => {
            this.writeToLocalStorage();
        };
    }
    writeToLocalStorage() {
        console.log(`Writing to local storage. ID: ${this.id}, Value: ${this.textarea.value}`);
        this.lastStoredSpan.innerHTML = new Date().toLocaleString();
        // Writes to local storage
        localStorage.setItem(this.id, this.textarea.value);
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
            this.removeFromDOM(noteId);
            this.removeFromLocalStorage(noteId);
        };
    }
    removeFromDOM(id) {
        this.rowToRemove = document.getElementById(id);
        console.log("Removing row with id:", id);
        this.rowToRemove.remove();
    }
    removeFromLocalStorage(id) {
        // Remove from local storage
        console.log(`Removing from local storage. ID: ${id}`);
        localStorage.removeItem(id);
    }
}
export { NoteContainer, NoteRow, NoteText, RemoveButton };
