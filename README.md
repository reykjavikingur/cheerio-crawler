# cheerio-crawler

Web site crawler that visits URL's recursively, starting from one initial URL
and following links in HTML responses, and invokes your callback function for each one.

## Example

```
var crawl = Crawler(function (url, $) {
    var title = $('title').text();
    console.log(title, '---', url);
});

// ...

crawl('http://www.resource.com/', function (err) {
    if (err) {
        console.error('unable to complete crawl:', err.message);
    }
    else {
        console.log('finished');
    }
});
```

### Functionality

* stays on the origin of the initial URL
* gets URL's from `a@href`
* makes one request at a time
