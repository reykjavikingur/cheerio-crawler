const assert = require('assert');

const URL = require('url');

function links(url, $) {
    assert(String(url) === url, 'url must be a string');
    assert(Boolean(url), 'url must be defined');
    var urls = [];
    $('a').each((i, el) => {
        var href = $(el).attr('href');
        if (typeof href !== 'undefined') {
            var hrefUrl = URL.resolve(url, href);
            urls.push(hrefUrl);
        }
    });
    return urls;
}

module.exports = links;
