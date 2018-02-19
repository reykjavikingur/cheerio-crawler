const request = require('request');
const Promise = require('promise');
const cheerio = require('cheerio');
const Queue = require('./lib/queue');
const links = require('./lib/links');
const origin = require('./lib/origin');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}
var allowedOrigin = origin(url);

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
                    if (origin(url) === allowedOrigin) {
                        queue.add(url);
                    }
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
            return links(url, $);
        });
}

function getPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            // TODO determine whether content type is html
            resolve(body);
        });
    });
}
