import { User } from "../lang/messages/en/user.js";
import { Globals } from "./globals.js";
import { Constants } from "./constants.js";
/**
 * Game Manager is responsible for managing the data
 * on the backend.
 */
export class GameManager {
    constructor() {
        this.btnAmount = 0;
        this.validOrder = [];
        this.selectedButtonOrder = [];
        this.currentIndex = 0;
    }
    /**
     * Stores the button into selected button order array,
     * using the colour as the button id.
     * @param colour as the id to be used to track the selected button order
     */
    setButton(colour) {
        this.selectedButtonOrder[this.currentIndex] = colour;
        // Checks if the button is valid.
        this.checkValid();
        // Goes to next index
        if (this.currentIndex < this.btnAmount) {
            this.currentIndex++;
        }
    }
    /**
     * Sets the amount of buttons for the game.
     * @param amount as the amount of the buttons in the current game
     */
    setBtnAmount(amount) {
        this.btnAmount = amount;
    }
    /**
     * Checks if the button is valid in the current order.
     * If valid, it reveals the button label.
     */
    checkValid() {
        if (this.validOrder[this.currentIndex].colour ==
            this.selectedButtonOrder[this.currentIndex]) {
            // Reveals the button number if valid
            this.validOrder[this.currentIndex].btn.textContent =
                this.currentIndex + Constants.OFFSET + "";
            // End the game if everything is correct
            if (this.currentIndex == this.btnAmount - Constants.OFFSET) {
                alert(User.WIN_MESSAGE);
                this.endGame();
            }
        }
        else {
            alert(User.LOSE_MESSAGE);
            this.revealAllButtons();
            this.endGame();
        }
    }
    /**
     * Resets the game state and resets the DOM.
     */
    reset() {
        // Clear all buttons from the DOM
        this.removeButtonsFromDOM();
        // Clear the memory
        this.btnAmount = 0;
        this.validOrder = [];
        this.selectedButtonOrder = [];
        this.currentIndex = 0;
    }
    /**
     * Removes the buttons from the DOM.
     */
    removeButtonsFromDOM() {
        this.validOrder.forEach((item) => {
            item.btn.remove();
        });
    }
    /**
     * Reveals all the buttons
     */
    revealAllButtons() {
        this.validOrder.forEach((item, index) => {
            item.btn.textContent = index + Constants.OFFSET + "";
        });
    }
    /**
     * Ends the game by revealing all the correct labels and printing out
     * the losing message.
     */
    endGame() {
        // cancel any previous pending resets
        Globals.UtilManager.clearAllTimeouts();
        // schedule reset after 2s
        const timeoutId = setTimeout(() => {
            this.reset();
            Globals.PlayManager.reset();
        }, Constants.TWO_SECONDS);
        Globals.UtilManager.timeouts.push(timeoutId);
    }
}
