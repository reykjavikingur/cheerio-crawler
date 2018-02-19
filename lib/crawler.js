const request = require('request');
const cheerio = require('cheerio');
const Queue = require('./queue');
const links = require('./links');
const origin = require('./origin');

function Crawler(handle) {

    var crawl = function (url, done) {
        var allowedOrigin = origin(url);
        var queue = new Queue();
        // add initial url to the queue
        queue.add(url);
        // begin iterating
        iterate();

        function iterate() {
            var url = queue.next();
            if (!url) {
                // no more urls in the queue
                done();
            }
            else {
                request(url, (err, res, body) => {
                    if (isHTML(res)) {

                        var $ = cheerio.load(body);
                        handle(url, $);
                        var urls = links(url, $);

                        for (let url of urls) {
                            if (origin(url) === allowedOrigin) {
                                queue.add(url);
                            }
                        }
                    }

                    iterate();
                })
            }
        }
    };

    return crawl;

}

function isHTML(response) {
    var contentType = response.headers['content-type'];
    var parts = contentType.split(';');
    var part = parts[0];
    return part === 'text/html';
}

module.exports = Crawler;