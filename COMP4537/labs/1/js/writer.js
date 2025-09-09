import { NoteContainer } from "./components/components.js";
function init() {
    var _a;
    console.log("Loading mock data ...");
    const noteContainerDiv = document.getElementById("noteContainer");
    const lastStoredSpan = document.getElementById("lastStored");
    const noteContainer = new NoteContainer(noteContainerDiv, lastStoredSpan);
    (_a = document.getElementById("addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        noteContainer.addNoteRow();
    });
}
init();
