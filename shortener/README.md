## Introduction

This is an implementation of a URL Shortener Implementation without use of any external API using SHA1 encryption

Original URL => SHA(Original URL) => 40 bits encrypted hash

We slice this 40 digits hash into 5 equal parts of 8 bits each, which is converted into decimal which again is
base62 encoded.

Why base-62 encoding is needed ?

If we see the allowed characters in our shortened url i.e [A-Z], [a-z], [0-9], then it comes to 26 + 26 + 10 = 62 
characters

We want our shortened url to be less than or equal to 7 characters. So 62^7, which is coming upto  35 billion urls.

Hence we used base-62 encoding here.


In this implementation, it is made sure that the same long url will always generate the same shortened url, unless
until some randomness is wanted and is given as true in the parameter to the helper function.



## Additional Implementation Details

A long-url to short-url mapping is stored in database with an expiry of 3 months for a record for redirection. 
Also a retry mechanism is implemented to check if a shortened url already exists in db, before inserting a shortened url. The retry count is set-up to 10.

## Test Result
Repeats in a run of 1000000 are 99 with repeat percentage of 0.009899999999999999
Repeats in a run of 8500000 are 8416 with repeat percentage of 0.09901176470588235
Repeats in a run of 10000000 are 11725 with repeat percentage of 0.11725
