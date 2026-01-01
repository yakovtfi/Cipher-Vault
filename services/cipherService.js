const toReverse = (text) => text.split('').reverse().join('');

// bonus 1
// פה הוא יעבוד גם על אותיות קטנות וגדולות
const atbashCipher = (text) => {
    return text.split('').map(char => {
        if (/[a-z]/.test(char)) {
            return String.fromCharCode(219 - char.charCodeAt(0));
        } else if (/[A-Z]/.test(char)) {
            return String.fromCharCode(155- char.charCodeAt(0));
        }
        return char;
    }).join('');
};

// bonus 2
const randomShuffle = (text) => {
    return text.split('').sort(() => Math.random() - 0.5).join('');
};

export const encryptWithCipher = (cipherType, text) => {
    if (!cipherType || !text) return null;
    
    const cipher = cipherType.toLowerCase();
    
    if (cipher === 'reverse') {
        return toReverse(text).toUpperCase();
    } else if (cipher === 'atbash') {
        return atbashCipher(text).toUpperCase();
    } else if (cipher === 'random_shuffle') {
        return randomShuffle(text).toUpperCase();
    }
    
    return null;
};

export const decryptWithCipher = (cipherType, text) => {
    if (!cipherType || !text) return null;
    
    const cipher = cipherType.toLowerCase();
    
    if (cipher === 'reverse') {
        return toReverse(text).toLowerCase();
    } else if (cipher === 'atbash') {

        return atbashCipher(text).toLowerCase();
    } else if (cipher === 'random_shuffle') {
        
        return null;
    }
    
    return null;
};
