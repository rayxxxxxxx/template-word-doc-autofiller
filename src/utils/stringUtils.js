function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}

function toCamelCase(sentence) {
    let splitted = sentence.split(' ');
    splitted[0] = splitted[0].toLowerCase();
    for (let i = 1; i < splitted.length; i++) {
        splitted[i] = capitalize(splitted[i]);
    }
    return splitted.join('');
}

function toSnakeCase(sentence) {
    return sentence.split(' ').join('_');
}

function fromSnakeCase(s) {
    return s.split('_').join(' ');
}

function toIdAttrCase(sentence) {
    return sentence.split(' ').map(word => word.toLowerCase()).join('-');
}

function toClassAttrCase(sentence) {
    return sentence.split(' ').map(word => word.toLowerCase()).join('-');
}

function toNameAttrCase(sentence) {
    return toCamelCase(sentence);
}

module.exports = {
    capitalize,
    toSnakeCase,
    fromSnakeCase,
    toCamelCase,
    toIdAttrCase,
    toClassAttrCase,
    toNameAttrCase
}