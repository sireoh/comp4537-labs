import { Globals } from "../globals.js";
/**
 * DOMUtils contains all useful functions that
 * help modify the dom.
 */
export class DOMUtils {
}
DOMUtils.Button = {
    /**
     * Creates a button
     * @param btn as the button to modify
     * @param positionX as the x location to move the button
     * @param positionY as the y location to move the button
     */
    createButton(btn, positionX, positionY) {
        // Place at initial location
        DOMUtils.Button.setLocation(btn, positionX, positionY);
        // Attack .buttonBase class to each button
        btn.className = "buttonBase";
        // Disables the button to be clickable on creation
        btn.disabled = true;
        // Add to page
        document.body.appendChild(btn);
    },
    /**
     * Updates the button details
     * @param btn as the button to update
     * @param label as the new label to give the button
     * @param colour as the new colour to set
     */
    updateDetails(btn, label, colour) {
        btn.textContent = label;
        btn.style.backgroundColor = colour;
        btn.onclick = () => {
            Globals.GameManager.setButton(colour);
        };
    },
    /**
     * Sets the location of the btn
     * @param btn as the button to modify
     * @param newX as the new x position to move
     * @param newY as the new y position to move
     */
    setLocation(btn, newX, newY) {
        btn.style.left = `${newX}px`;
        btn.style.top = `${newY}px`;
    },
};
