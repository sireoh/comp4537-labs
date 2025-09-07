/**
 * Util class contains useful utilities that work general purpose.
 */
export class Utils {
    static getBrowserSize() {
        let getBrowserSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        return getBrowserSize;
    }
}
/**
 * Util Manager helps construct the Global Util Manager which stores all
 * the useful utility functions and state such as time.
 */
export class UtilManager {
    constructor() {
        this.timeouts = [];
    }
    /**
     * Clears all the timeouts
     */
    clearAllTimeouts() {
        this.timeouts.forEach((id) => clearTimeout(id));
        this.timeouts = [];
    }
}
