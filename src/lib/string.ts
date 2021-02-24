export const convertHexTo64 = (hexString: string): string => {
   const buf = Buffer.from(hexString, "hex");
   return  buf.toString('base64');
}

console.log(convertHexTo64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'))
