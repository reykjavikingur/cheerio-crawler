const request = require('request');
const Promise = require('promise');
const cheerio = require('cheerio');
const URL = require('url');
const Queue = require('./lib/queue');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}

var queue = new Queue();
queue.add(url);
iterate();

function iterate() {
    var url = queue.next();
    if (url) {
        getLinks(url)
            .then(urls => {
                debugger;
                for (let url of urls) {
                    queue.add(url);
                }
                iterate();
            }, e => {
                console.error('failed to get links from url', url, e.message);
            })
    }
    else {
        console.log(queue.visited);
    }
}

function getLinks(url) {
    return getPage(url)
        .then(html => {
            const $ = cheerio.load(html);
            var hrefUrls = [];
            $('a').each((i, el) => {
                var href = $(el).attr('href');
                var hrefUrl = URL.resolve(url, href);
                hrefUrls.push(hrefUrl);
            });
            return hrefUrls;
        })
}

function getPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            // TODO determine whether content type is html
            resolve(body);
        });
    });
}
