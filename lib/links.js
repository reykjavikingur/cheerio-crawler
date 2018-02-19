const URL = require('url');

function links(url, $) {
    var urls = [];
    $('a').each((i, el) => {
        var href = $(el).attr('href');
        var hrefUrl = URL.resolve(url, href);
        urls.push(hrefUrl);
    });
    return urls;
}

module.exports = links;
