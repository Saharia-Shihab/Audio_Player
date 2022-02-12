"use strict";

/**
 * @param {any} a
 * @returns {Boolean}
 */
function isFunction(a) {
    return a && "[object Function]" === {}.toString.call(a);
};

/**
 * @param {any} a
 * @returns {Boolean}
 */
function isString(a) {
    return "string" === typeof a;
};

/**
 * @param {any} a
 * @returns {Boolean}
 */

function isObject(a) {
    return "object" === typeof a && null !== a;
};

/**
 * @param {String} tagName - The name of an element.
 * @param {{ [x: string]: any; }} Attributes - Set attributes on the element and function.
 * @param {...any?} Node
 * @returns {HTMLElement}
 */

export default (tagName, Attributes, ...Node) => {
    tagName = tagName.toLowerCase();
    if (!isString(tagName) || !tagName) {
        return;
    }
    const __Node = document.createElement(tagName);
    for (const name in Attributes) {
        if (Object.hasOwnProperty.call(Attributes, name)) {
            if (isString(name) && isString(Attributes[name])) {
                __Node.setAttribute(name, Attributes[name])
            } else {
                if (isObject(Attributes[name])) {
                    for (const key in Attributes[name]) {
                        if (Object.hasOwnProperty.call(Attributes[name], key)) {
                            __Node[name][key] = Attributes[name][key] === null ? '' : Attributes[name][key];
                        }
                    }
                } else {
                    __Node[name] = Attributes[name]
                }
            };
        }
    }
    if (isFunction(Node)) {
        return Node;
    }
    __Node.append(...Node);
    return __Node;
}