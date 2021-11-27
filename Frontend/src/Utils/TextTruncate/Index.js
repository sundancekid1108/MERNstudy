const textTruncate = (text, textlength, textend) => {
    if (textlength == null) {
        textlength = 100;
    }
    if (textend == null) {
        textend = '...';
    }
    if (text.length > textlength) {
        return text.substring(0, textlength - textend.length) + textend;
    } else {
        return text;
    }
};

export default textTruncate;