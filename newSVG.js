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
 * @param {{ [x: string]: any; }} Attributes - Set attribute or function on the element.
 * @param {...any?} Node
 * @returns {Element}
 */


export default (tagName, Attributes, ...Node) => {
    tagName = tagName.toLowerCase();
    if (!isString(tagName) || !tagName) {
        return;
    }
    const CreateNodeElement = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    for (const name in Attributes) {
        if (Object.hasOwnProperty.call(Attributes, name)) {
            CreateNodeElement.setAttributeNS(null, name, Attributes[name]);
        }
    };
    if (Node) {
        if (isFunction(Node)) {
            return Node;
        }
        CreateNodeElement.append(...Node);
    }
    return CreateNodeElement;
}