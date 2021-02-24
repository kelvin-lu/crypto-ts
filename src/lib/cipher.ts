import { repeatingXOR } from './logic';

const CHARACTER_BUFFERS =  new Array(256).fill(null).map((_, index) => {
    const newBuf = Buffer.alloc(1);
    newBuf.writeUInt8(index);
    return newBuf;
});

const hasValidWhitespace = (decodedBuf: Buffer): boolean => {
    const decodedString = decodedBuf.toString('utf8');
    const separatedWhiteSpace = decodedString.split(' ');
    if (separatedWhiteSpace.length > decodedString.length / 2) {
        return false;
    } if (separatedWhiteSpace.length === 1) {
        return false;
    }

    return true;
}

const hasValidCharacters =  (decodedBuf: Buffer): boolean => {
    for (const byte of decodedBuf) {
        if (byte < 0x20) {
            return false;
        }
    }

    return true;
}

const passesHeuristics = (decodedBuf: Buffer): boolean => {
    return hasValidCharacters(decodedBuf) && hasValidWhitespace(decodedBuf)
}

export const decodeVariableCharacterCipher = (buffer: Buffer): string => {
    const potentialDecodes: string[] = [];
    for (const charBuf of CHARACTER_BUFFERS) {
        const decoded = repeatingXOR(buffer, charBuf)
        if (passesHeuristics(decoded)) {
            potentialDecodes.push(decoded.toString('utf8'));
        }
    }

    if (potentialDecodes.length > 1) {
        console.warn('failed to find just one decode. consider tightening the heuristic');
        return potentialDecodes[0];
    } else if (potentialDecodes.length  === 0) {
        console.warn('found no decodes. potential issue with heuristics');
        return '';
    } else {
        return potentialDecodes[0];
    }
}
