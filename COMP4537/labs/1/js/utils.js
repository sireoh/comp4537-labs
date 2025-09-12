import { NoteContainer } from "./components/components.js";
import { Constants } from "./constants.js";
export function init(readonly) {
    var _a;
    const noteContainerDiv = document.getElementById("noteContainer");
    const lastStoredSpan = document.getElementById("lastStored");
    const noteContainer = new NoteContainer(noteContainerDiv, lastStoredSpan, readonly);
    (_a = document.getElementById("addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        noteContainer.addNoteRow();
    });
    if (readonly) {
        setInterval(() => {
            noteContainer.hydrateContainer(readonly);
            console.log("Fetching and loading data from localStorage ...");
        }, Constants.TWO_SECONDS);
    }
}
