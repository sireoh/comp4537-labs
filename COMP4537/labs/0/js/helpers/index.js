import { User } from "../../lang/messages/en/user.js";
export class Index {
    static init() {
        // Initialize the main label
        if (Index.mainLabel) {
            Index.mainLabel.innerHTML = User.STARTING_MESSAGE;
        }
        else {
            console.log("Missing mainLabel");
        }
        // Initialize the go label
        if (Index.goLabel) {
            Index.goLabel.innerHTML = User.GO_LABEL;
        }
        else {
            console.log("Missing goLabel");
        }
    }
}
Index.mainLabel = document.getElementById("mainLabel");
Index.goLabel = document.getElementById("goLabel");
