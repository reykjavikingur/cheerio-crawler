const request = require('request');
const Promise = require('promise');
const cheerio = require('cheerio');
const Queue = require('./lib/queue');
const links = require('./lib/links');
const origin = require('./lib/origin');

function Crawler(handle) {

    var crawler = {
        start(url, cb) {

        }
    };
    return crawler;
}

function getPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            // TODO determine whether content type is html
            resolve(body);
        });
    });
}

module.exports = Crawler;