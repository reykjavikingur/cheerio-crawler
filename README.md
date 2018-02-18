# Scraper

## Recursive scraping

* take next unvisited url from queue
* get html from url
* mark url as visited in queue
* get all hrefs from html
* for each href
    * calculate url
    * if url is valid and url is not in queue
        * add it to queue as unvisited
        * recurse

### restrictions

* do not leave the origin server
* stop after a certain max number of page loads
* stop after queue reaches certain max number of urls
