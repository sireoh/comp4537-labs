import { User } from "../../lang/messages/en/user.js";
import { Constants } from "../constants.js";
import { Dao } from "../dao/dao.js";
import { Utils } from "../helpers/utils.js";
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
        this.lastStoredSpan.textContent = `${User.LAST_STORED_AT_LABEL} ${Dao.getLastStored()}`;
        this.notes = Dao.getNotes();
        this.noteContainerDiv.innerHTML = "";
        Object.entries(this.notes).forEach(([key, value]) => {
            this.noteContainerDiv.appendChild(new NoteRow(value, readonly, this.lastStoredSpan, this.notes, key)
                .noteRowDiv);
        });
    }
    addNoteRow() {
        this.noteContainerDiv.appendChild(new NoteRow("", false, this.lastStoredSpan).noteRowDiv);
    }
    removeRow(id) {
        const rowToRemove = document.getElementById(id);
        if (rowToRemove)
            rowToRemove.remove();
        Dao.removeNote(id);
    }
}
class NoteRow {
    constructor(text, readOnly, lastStoredSpan, notes, id) {
        // Make Row main properties. Creates a new id, if an id doesn't exist
        this.id = id ? id : Utils.createUUID();
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
}
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
        this.textarea.rows = Constants.NoteText.MAX_HEIGHT;
        this.textarea.disabled = readOnly;
        // Last Stored Date Value
        this.lastStoredValue = "";
        // Writes to local storage onchange
        this.textarea.oninput = () => {
            this.writeToDao();
        };
    }
    writeToDao() {
        Dao.saveNote(this.id, this.textarea.value);
        this.lastStoredSpan.textContent = `${User.LAST_STORED_AT_LABEL} ${Dao.getLastStored()}`;
    }
}
class RemoveButton {
    constructor(noteId) {
        // Create button
        this.btn = document.createElement("button");
        // Add Properties
        this.btn.textContent = "Remove";
        this.btn.className = "removeButton";
        this.btn.onclick = () => {
            Dao.removeNote(noteId);
            this.removeFromDOM(noteId);
        };
    }
    removeFromDOM(id) {
        const row = document.getElementById(id);
        if (row)
            row.remove();
    }
}
export { NoteContainer, NoteRow, NoteText, RemoveButton };
