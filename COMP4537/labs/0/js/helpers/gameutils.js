import { ColouredButton } from "../components/button.js";
import { Constants } from "../constants.js";
import { Globals } from "../globals.js";
import { Utils } from "./utils.js";
export class GameUtils {
    /**
     * Scramble buttons function scrambles the buttons.
     * @param buttons as the array to scramble
     * @param timesToScramble as the amount of times to scramble
     */
    static async scrambleButtons(buttons, timesToScramble) {
        for (let i = 0; i < timesToScramble; i++) {
            const scrambleTimer = setTimeout(() => {
                buttons.forEach((button) => {
                    GameUtils.scrambleButtonsHelper(button);
                    // Hide the labels on the last scramble
                    if (i == timesToScramble - 1) {
                        const hideTimer = setTimeout(() => {
                            GameUtils.hideButtonLabels(buttons);
                        }, Constants.TWO_SECONDS);
                        Globals.UtilManager.timeouts.push(hideTimer);
                    }
                });
            }, i * Constants.TWO_SECONDS); // every 2 seconds
            Globals.UtilManager.timeouts.push(scrambleTimer);
        }
    }
    /**
     * Organizes the buttons using a helper function
     * @param buttons as the array to organize.
     */
    static organizeButtons(buttons) {
        for (let i = 0; i < buttons.length; i++) {
            GameUtils.organizeButtonsHelper(buttons, i);
        }
    }
    /**
     * This function organizes buttons into rows based on the browser width.
     * @param buttons The array of buttons to organize.
     * @param index The index of the button to organize.
     */
    static organizeButtonsHelper(buttons, index) {
        const browserWidth = Utils.getBrowserSize().width;
        const buttonWidth = ColouredButton.emToPixels(Constants.BUTTON_WIDTH);
        const buttonHeight = ColouredButton.emToPixels(Constants.BUTTON_HEIGHT);
        // Determine the amount of buttons per row
        const buttonsPerRow = Math.floor((browserWidth - Constants.HORIZONTAL_START) / buttonWidth);
        // Fill the buttons left to right
        let col = index;
        let row = 0;
        // This doesn't run until it exceeds the amount per row
        // eg. if index == 0, it wont run
        // but if its 5 >= 5, it'll begin to add a new row
        while (col >= buttonsPerRow) {
            // 5 -= 5 makes it reset the column count for the new row
            col -= buttonsPerRow;
            // 0 += 1, goes to the next row
            row++;
        }
        const x = Constants.HORIZONTAL_START + col * buttonWidth;
        const y = Constants.VERTICAL_START + row * buttonHeight;
        buttons[index].setLocation(x, y);
    }
    /**
     * Helper function to help scramble the buttons
     * @param button as the button to scramble
     */
    static scrambleButtonsHelper(button) {
        // Browser dimensions
        const { width: browserWidth, height: browserHeight } = Utils.getBrowserSize();
        // Button dimensions (converted from em to px)
        const buttonWidth = ColouredButton.emToPixels(Constants.BUTTON_WIDTH);
        const buttonHeight = ColouredButton.emToPixels(Constants.BUTTON_HEIGHT);
        // Random positions, ensuring the button stays inside the screen
        const x = Math.floor(Math.random() * (browserWidth - buttonWidth));
        const y = Math.floor(Math.random() * (browserHeight - buttonHeight));
        button.setLocation(x, y);
    }
    /**
     * Hides all the button labels for the passed in array
     * @param buttons as the buttons to hide labels
     */
    static hideButtonLabels(buttons) {
        buttons.forEach((button) => {
            button.btn.textContent = "";
            button.btn.disabled = false;
        });
    }
    /**
     * Gets a random colour as rgb string.
     * @returns a random colour in rgb format as a string
     */
    static getRandomColour() {
        let r = Math.floor(Math.random() * Constants.RGB_COLOURS_AMT);
        let g = Math.floor(Math.random() * Constants.RGB_COLOURS_AMT);
        let b = Math.floor(Math.random() * Constants.RGB_COLOURS_AMT);
        return `rgb(${r}, ${g}, ${b})`;
    }
}
