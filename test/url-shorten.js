const { v4: uuid } = require('uuid');
const UrlShortenerHelper = require('@swapnil-pando/url-shortening');

// My long url will be of the below format
// https://localhost:5050/track-link/A-23-Depot-Z-M-01?id=${uuid}"

const baseUrl = 'https://localhost:5050/track-link/';

const randomness = false;

function shortenUrlTest(runs) {
  const set = new Set();
  for (let i = 0; i < runs; i += 1) {
    const randomAlphaNumeric = Math.random().toString(36);
    const longUrl = `${`${baseUrl + randomAlphaNumeric.slice(2, 7)}-depot-${randomAlphaNumeric.slice(7)}`}?id=${uuid()}`;
    const shortenedUrl = UrlShortenerHelper.shortenUrlHelper(longUrl, randomness);
    set.add(shortenedUrl);
  }

  const sizeOfSet = set.size;
  const repeats = runs - sizeOfSet;
  const repeatPercentage = (repeats / runs) * 100;
  console.log(`Repeats in a run of ${runs} are ${repeats} with repeat percentage of ${repeatPercentage}`);
}


const runs1 = 1000000;
const runs2 = 8500000;
const runs3 = 10000000;
shortenUrlTest(runs1);
shortenUrlTest(runs2);
shortenUrlTest(runs3);
