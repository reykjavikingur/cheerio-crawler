const request = require('request');
const Promise = require('promise');
const cheerio = require('cheerio');
const URL = require('url');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}

request(url, (err, res, body) => {
    const $ = cheerio.load(body);
    var hrefUrls = [];
    $('a').each((i, el) => {
        var href = $(el).attr('href');
        var hrefUrl = URL.resolve(url, href);
        hrefUrls.push(hrefUrl);
    });
    console.log('hrefUrls', hrefUrls);
});
