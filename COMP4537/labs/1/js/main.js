import { User } from "../lang/messages/en/user.js";
import { NoteContainer } from "./components/components.js";
import { Constants } from "./constants.js";
export class Main {
    static init(readonly) {
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
    static initGoBackButton() {
        // Init go back button
        document.getElementById("goBackButton").addEventListener("click", () => {
            window.location.href = "../index.html";
        });
        document.getElementById("goBackButton").innerHTML = User.GO_BACK_BUTTON;
    }
    static initIndex() {
        // Title Main
        document.getElementById("indexTitle").innerHTML = User.INDEX_TITLE;
        // Title H2
        document.getElementById("indexTitleHeader").innerHTML = User.INDEX_TITLE;
        // Anchors
        document.getElementById("writerButton").innerHTML = User.WRITER_BUTTON;
        document.getElementById("readerButton").innerHTML = User.READER_BUTTON;
    }
}
Main["Reader"] = {
    initTitle() {
        // Title Main
        document.getElementById("readerTitle").innerHTML = User.READER_TITLE;
        // Title H2
        document.getElementById("readerTitleHeader").innerHTML =
            User.READER_TITLE;
    },
};
Main["Writer"] = {
    initTitle() {
        // Title Main
        document.getElementById("writerTitle").innerHTML = User.WRITER_TITLE;
        // Title H2
        document.getElementById("writerTitleHeader").innerHTML =
            User.WRITER_TITLE;
        // Init buttons
        document.getElementById("addButton").innerHTML = User.ADD_BUTTON;
    },
};
