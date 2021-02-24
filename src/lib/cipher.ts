import { repeatingXOR } from './logic';

const CHARACTER_BUFFERS =  new Array(256).fill(null).map((_, index) => {
    const newBuf = Buffer.alloc(1);
    newBuf.writeUInt8(index);
    return newBuf
});

const hasValidWhitespace = (decodedString: string): boolean => {
    const separatedWhiteSpace = decodedString.split(' ');
    if (separatedWhiteSpace.length > decodedString.length / 2) {
        return false;
    } if (separatedWhiteSpace.length === 1) {
        return false;
    }

    return true;
}

const VALID_CHARACTERS = new Set('abcdefghijklmnopqrstuvwxyz 0123456789'.split(''))
const hasValidCharacters = (decodedString: string): boolean => {
    console.log(decodedString)
    return decodedString.split('').every(character => VALID_CHARACTERS.has(character));
}

const passesHeuristics = (decodedString: string): boolean => {
    return hasValidCharacters(decodedString) && hasValidWhitespace(decodedString)
}

export const findCharacterCipher = (encodedStr: string): string => {
    const encodedBuf = Buffer.from(encodedStr, 'utf8')
    for (const charBuf of CHARACTER_BUFFERS) {
        const decoded = repeatingXOR(encodedBuf, charBuf).toString('utf8')
        if (passesHeuristics(decoded)) {
            console.log(decoded)
        }
    }

    return ''
}

findCharacterCipher('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736')
