const toReverse = (text) => text.split('').reverse().join('');

export const encryptWithCipher = (cipherType, text) => {
    if (!cipherType || !text) return null;
    if (cipherType.toLowerCase() !== 'reverse') return null;

    return toReverse(text).toUpperCase();
};

export const decryptWithCipher = (cipherType, text) => {
    if (!cipherType || !text) return null;
    if (cipherType.toLowerCase() !== 'reverse') return null;

    return toReverse(text).toLowerCase()
};
