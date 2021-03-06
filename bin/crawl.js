const Crawler = require('../');

const MAX_VISITS = 50;

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('no url given');
    process.exit(1);
}

var numVisits = 0;
const crawl = Crawler((url, $) => {
    numVisits++;
    var title = $('title').text();
    console.log(title, '---', url);
    if (numVisits >= MAX_VISITS) {
        crawl.cancel();
    }
});

crawl(url, (err) => {
    if (err) {
        console.error('unable to finish crawl:', err.message);
    }
    else {
        console.log('FINISHED');
    }
});
