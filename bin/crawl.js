const Crawler = require('../');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}

const crawl = Crawler((url, $) => {
    var title = $('title').text();
    console.log(title, '---', url);
});

crawl(url, (err) => {
    if (err) {
        console.error('unable to finish crawl:', err.message);
    }
    else {
        console.log('FINISHED');
    }
});
