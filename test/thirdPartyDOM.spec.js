/* eslint handle-callback-err: 0 */

const test = require('tape');
const request = require('request');
const $ = require('cheerio');

const bookParser = require('../modules/bookParser');

const url =
  'https://www.audible.it/search?sort=pubdate-desc-rank&pageSize=20&ipRedirectOverride=true&overrideBaseCountry=true';

test('The bookParser is returning a list of books', function(t) {
  request(url, (err, resp, html) => {
    var parsedHTML = $.load(html);
    parsedHTML('.productListItem')
      .first()
      .map((i, bookDOM) => {
        const book = bookParser.parser(bookDOM);
        t.equal(typeof book, 'object', 'bookParser is returning a book object');
        t.ok(book.title, 'book has a title');
        t.ok(book.author, 'book has an author');
        t.ok(book.image, 'book has an image');
        t.ok(book.url, 'book has a url');
        t.end();
      });
  });
});
