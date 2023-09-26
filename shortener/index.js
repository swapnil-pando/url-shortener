const UrlShortenerHelper = require('./url-shortener-helper');

const longUrl = 'http://localhost:8080/hello/first';

// For additional randomness, one can send this value as true to
// add extra randomness into your shortener
const randomness = false;

const shortenedUrl = UrlShortenerHelper.shortenUrlHelper(longUrl, randomness);

console.log(shortenedUrl);
