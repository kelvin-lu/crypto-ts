export const equalLengthXOR = (bufOne: Buffer, bufTwo: Buffer): Buffer => {
    if (bufOne.length !== bufTwo.length) {
        console.warn('equalLengthXOR detected different lengths. ignoring');
        return Buffer.alloc(0);
    }

    const newBuf = Buffer.alloc(bufOne.length, 0, 'utf-8');

    for (let index = 0; index < newBuf.length; index++) {
        const newPiece = bufOne[index] ^ bufTwo[index];
        newBuf.writeInt8(newPiece, index);
    }

    return newBuf;
}

export const repeatingXOR = (longBuf: Buffer, repeatedBuf: Buffer): Buffer => {

    const newBuf = Buffer.alloc(longBuf.length, 0, 'utf8');

    for (let index = 0; index < newBuf.length; index++) {
        const newPiece = longBuf[index] ^ repeatedBuf[index % repeatedBuf.length];
        newBuf.writeUInt8(newPiece, index);
    }

    return newBuf;
}

// Returns the number of one bits in an unsigned number
export const numOneBits = (num: number): number => {
    if (num < 0) {
        console.warn('numOneBits did not expect a negative number. skipping');
        return -1;
    }

    let numBits = 0;
    let numSubstr = num;

    while (numSubstr > 0) {
        numBits += numSubstr % 2;
        numSubstr >>= 1;
    }

    return numBits;
}

export const hammingDist = (bufOne: Buffer, bufTwo: Buffer): number => {
    if (bufOne.length !== bufTwo.length) {
        console.warn('hammingDist detected different lengths. ignoring');
        return -1;
    }

    let distCounter = 0;

    for (let index = 0; index < bufOne.length; index++) {
        const distBits = bufOne[index] ^ bufTwo[index];
        distCounter += numOneBits(distBits)
    }

    return distCounter;
}
