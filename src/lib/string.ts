export const convertHexTo64 = (hexString: string): string => {
   const buf = Buffer.from(hexString, "hex");
   return  buf.toString('base64');
}
