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
    if (longBuf.length  % repeatedBuf.length !== 0) {
        console.warn('repeatingXOR detected mismatched lengths. ignoring');
        return Buffer.alloc(0);
    }

    const newBuf = Buffer.alloc(longBuf.length, 0, 'utf8');

    for (let index = 0; index < newBuf.length; index++) {
        const newPiece = longBuf[index] ^ repeatedBuf[index % repeatedBuf.length];
        newBuf.writeUInt8(newPiece, index);
    }

    return newBuf;
}
