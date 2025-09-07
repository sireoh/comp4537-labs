// src/js/script.ts
import { ColouredButton } from "./components/button.js";
import { GameUtils } from "./helpers/gameutils.js";
import { Globals } from "./globals.js";
import { Constants } from "./constants.js";
/**
 * Play function starts the main game loop
 * @param n as the numbers of buttons to generate
 */
async function play(n) {
    // Reset the game
    Globals.reset();
    // Set the max button amount for the game manager
    Globals.GameManager.setBtnAmount(n);
    // Create n buttons
    createNButtons(n);
    // Organizes buttons based on the browser width.
    GameUtils.organizeButtons(Globals.PlayManager.buttons);
    // Schedule scramble after n seconds
    Globals.UtilManager.timeouts.push(setTimeout(() => {
        GameUtils.scrambleButtons(Globals.PlayManager.buttons, n);
    }, n * Constants.SECOND));
}
/**
 * Creates buttons to the DOM, depending of the number n.
 * @param n number of buttons to create
 */
function createNButtons(n) {
    for (let i = 0; i < n; i++) {
        let chosenColour = GameUtils.getRandomColour();
        Globals.PlayManager.buttons[i] = new ColouredButton(i + 1 + "", chosenColour);
        Globals.GameManager.validOrder.push(Globals.PlayManager.buttons[i]);
    }
}
// Get "n" from the form
const form = document.getElementById("mainForm");
// Create event listener for the form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const n = form["buttonCount"].value;
    // Start a new game
    play(n);
});
