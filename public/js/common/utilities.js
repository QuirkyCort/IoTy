function escapeSingleQuotes(inString) {
  let outString = '';

  for (let c of inString) {
    if (c == '\'') {
      outString += '\\\'';
    } else if (c == '\\') {
      outString += '\\\\';
    } else {
      outString += c;
    }
  }

  return outString;
}

function base64DecToArr(sBase64, nBlocksSize) {
  function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91
      ? nChr - 65
      : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
      ? nChr + 4
      : nChr === 43
      ? 62
      : nChr === 47
      ? 63
      : 0;
  }

  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, ""); // Remove any non-base64 characters, such as trailing "=", whitespace, and more.
  const nInLen = sB64Enc.length;
  const nOutLen = nBlocksSize
    ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
    : (nInLen * 3 + 1) >> 2;
  const taBytes = new Uint8Array(nOutLen);

  let nMod3;
  let nMod4;
  let nUint24 = 0;
  let nOutIdx = 0;
  for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4));
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      nMod3 = 0;
      while (nMod3 < 3 && nOutIdx < nOutLen) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
        nMod3++;
        nOutIdx++;
      }
      nUint24 = 0;
    }
  }

  return taBytes;
};

function base64EncArr(aBytes) {
  function uint6ToB64(nUint6) {
    return nUint6 < 26
      ? nUint6 + 65
      : nUint6 < 52
      ? nUint6 + 71
      : nUint6 < 62
      ? nUint6 - 4
      : nUint6 === 62
      ? 43
      : nUint6 === 63
      ? 47
      : 65;
  }

  let nMod3 = 2;
  let sB64Enc = "";

  const nLen = aBytes.length;
  let nUint24 = 0;
  for (let nIdx = 0; nIdx < nLen; nIdx++) {
    nMod3 = nIdx % 3;
    // To break your base64 into several 80-character lines, add:
    //   if (nIdx > 0 && ((nIdx * 4) / 3) % 76 === 0) {
    //      sB64Enc += "\r\n";
    //    }

    nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
    if (nMod3 === 2 || aBytes.length - nIdx === 1) {
      sB64Enc += String.fromCodePoint(
        uint6ToB64((nUint24 >>> 18) & 63),
        uint6ToB64((nUint24 >>> 12) & 63),
        uint6ToB64((nUint24 >>> 6) & 63),
        uint6ToB64(nUint24 & 63)
      );
      nUint24 = 0;
    }
  }
  return (
    sB64Enc.substring(0, sB64Enc.length - 2 + nMod3) +
    (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==")
  );
};