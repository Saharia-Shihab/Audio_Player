"use strict";

/**
 * @param {any} functionToCheck
 */
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/**
 * @param {any} value
 * @returns {Boolean}
 */
function isString(value) {
    return typeof value === "string";
}

/**
 * @param {String | Function} tagName - The name of an element.
 * @param {{ [x: string]: any; }} Attributes -  - Set attributes on the element and function.
 * @param {...any?} Node
 * @returns {HTMLElement}
 */

export default (tagName, Attributes, ...Node) => {
    if (typeof (tagName) === 'function') {
        return tagName();
    }

    tagName = tagName.toLowerCase();
    if (!isString(tagName) || !tagName) {
        return;
    }
    const __Node = document.createElement(tagName);
    for (const name in Attributes) {
        if (Object.hasOwnProperty.call(Attributes, name)) {
            (
                isString(name) && (
                    isString(Attributes[name]) ||
                    Attributes[name] === true || false || null
                )
            ) ? __Node.setAttribute(name, Attributes[name]) : __Node[name] = Attributes[name];
        }
    }
    if (isFunction(Node)) {
        return Node;
    }
    __Node.append(...Node);
    return __Node;
}