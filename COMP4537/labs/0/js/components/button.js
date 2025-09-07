// .ts/components/button.ts
import { Constants } from "../constants.js";
import { DOMUtils } from "../helpers/domutils.js";
/**
 * Button base that all buttons inherit
 */
class ButtonBase {
    constructor() {
        this.btn = document.createElement("button");
        this.height = Constants.BUTTON_HEIGHT;
        this.width = Constants.BUTTON_WIDTH;
        this.positionX = 0;
        this.positionY = 0;
        // Apply styles and add to DOM
        DOMUtils.Button.createButton(this.btn, this.positionX, this.positionY);
    }
}
/**
 * Coloured button has all the button base elements,
 * while also has label and colour
 */
export class ColouredButton extends ButtonBase {
    constructor(label, colour) {
        super();
        this.label = label;
        this.colour = colour;
        // Update button details
        DOMUtils.Button.updateDetails(this.btn, this.label, this.colour);
    }
    // Update location
    setLocation(newX, newY) {
        this.positionX = newX;
        this.positionY = newY;
        DOMUtils.Button.setLocation(this.btn, newX, newY);
    }
    // Function to convert em to pixels
    static emToPixels(em) {
        return (parseFloat(em) *
            parseFloat(getComputedStyle(document.documentElement).fontSize));
    }
}
