const base62 = require('base62');
const crypto = require('crypto');

class UrlShortenerHelper {
  static generateShaHash(str) {
    const generator = crypto.createHash('sha1');
    generator.update(str);
    return generator.digest('hex');
  }

  static xor(hex1, hex2) {
    const buf1 = Buffer.from(hex1, 'hex');
    const buf2 = Buffer.from(hex2, 'hex');
    const bufResult = buf1.map((b, i) => b ^ buf2[i]);
    return bufResult.toString('hex');
  }

  static shortenUrlHelper(originalUrl, randomness = false) {
    // SHA implementation
    const sha = UrlShortenerHelper.generateShaHash(originalUrl);
    const shaTrimmed1 = sha.slice(0, 8);
    const shaTrimmed2 = sha.slice(8, 16);
    const shaTrimmed3 = sha.slice(16, 24);
    const shaTrimmed4 = sha.slice(24, 32);
    const shaTrimmed5 = sha.slice(32, 40);
    const xorOne = UrlShortenerHelper.xor(shaTrimmed1, shaTrimmed2);
    const xorTwo = UrlShortenerHelper.xor(xorOne, shaTrimmed3);
    const xorThree = UrlShortenerHelper.xor(xorTwo, shaTrimmed4);
    const xorFinal = UrlShortenerHelper.xor(xorThree, shaTrimmed5);
    let decimalCounterPart = parseInt(xorFinal, 16);
    if (randomness === true) {
      decimalCounterPart = Math.ceil(decimalCounterPart * Math.random());
    }
    const shortenedUrlEndPoint = base62.encode(decimalCounterPart);
    return shortenedUrlEndPoint;
  }
}

module.exports = UrlShortenerHelper;
