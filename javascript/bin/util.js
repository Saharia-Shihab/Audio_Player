/**
* @param {HTMLElement} Node - `target` HTMLElement 😁
* @param {string} Property - `CSS` property 😁
* @returns {string} `CSS` value 😁
*/
export default function letCSS(Node, Property) {
    return `${window.getComputedStyle(Node).getPropertyValue(Property)}`;
};