/**
* @param {HTMLElement} Node - `target` HTMLElement 😁
* @param {string} Property - `CSS` property 😁
* @returns {string} `CSS` value 😁
*/
function letCSS(Node, Property) {
    return `${window.getComputedStyle(Node).getPropertyValue(Property)}`;
};

/**
 * @param {number} Time
 * @returns {string} - `HH:MM:SS` ⏳⌛
 */
function reconvert(Time) {
    let hours = `${Math.floor(Time / 3600)}`;
    let minutes = `${Math.floor((Time % 3600) / 60)}`;
    let seconds = `${Math.floor(Time % 60)}`;
    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(1);
    hours = String(hours).padStart(1);
    if (Number(Time) < 3600) {
        return (minutes + ":" + seconds);
    } else {
        return (hours + ":" + minutes + ":" + seconds);
    }
}

/**
 * @param {Function} callback
 * @param {Array} Arrays
 */

function useLoop(callback, Arrays) {
    Array.from(Arrays).forEach(item => callback(item));
};

export { letCSS, reconvert, useLoop }