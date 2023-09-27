## Introduction

    This is an implementation of a URL Shortener Implementation without use of any external API using SHA1 encryption.

    The long URL which will be given to us will be in the format of
    https://localhost:5050/track-link/A-23-Depot-Z-M-01?id=${uuid}"

    uuid is unique identifier of 36 characters

## Problem Statement
    The problem statement is to convert this long url into a shortened url. Whenever we click on this shortened url , it should redirect us to the long url and eventually to the webpage that the long url is directing to.

## Back of the Envelope Estimation
    We want our shortened url to be of length ≤ 7.
    Character set of our shortened url includes [A-Z], [a-z], [0–9] which is 26 + 26 + 10 = 62 characters.
    So with this we can have 62 ^ 7 = 35 billion unique urls. And this is the reason why we will be using base-62 encryption as well in our implementation.

## Implementation
    The original url is encrypted using SHA-1 to a 40 hex encrypted hash.

    We slice this 40 hex hash into 5 equal parts of 8 hex each, which is converted into decimal which again is base62 encoded.

    This splitting into 5 equal parts is done to make sure that our final base-62 encrypted string will have a length of ≤ 7, since the main target is to produce a shortened url.

    This shortened url is then stored in database along with the original long url as a kind of a mapper, which will be used while redirection of the shortened url to the original url.

    Now while storing the shortened url in database, we will first check if this shortened url exists or not. If it exists, then we will put some degree of randomness and will generate the shortened url again.

    This retry count has been limited to 10 in our implementation, so as to not affect latency of the system a lot. Also as per our functional requirement, the expiry of the shortened url in database is 3 months.

## Test Results
    One can run test/url-shorten.js file to see the working of shortener

    Repeats in a run of 1000000 are 99 with repeat percentage of 0.009899999999999999.

    Repeats in a run of 8500000 are 8416 with repeat percentage of 0.09901176470588235.

    Repeats in a run of 10000000 are 11725 with repeat percentage of 0.11725.

## Medium Link
    https://swapnilsatpathycse24.medium.com/url-shortener-b5b231068e0