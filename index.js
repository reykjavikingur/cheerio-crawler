const Crawler = require('./lib/crawler');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}

var urls = [];
const crawl = Crawler((url, $) => {
    urls.push(url);
});
crawl(url, () => {
    console.log(urls);
});
