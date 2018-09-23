const express = require('express');
const RSS = require('rss');
const request = require('request');
const $ = require('cheerio');
const bookParser = require('./modules/bookParser');

const app = express();
const port = process.env.PORT || 3000;

const url =
  'https://www.audible.it/search?sort=pubdate-desc-rank&pageSize=20&ipRedirectOverride=true&overrideBaseCountry=true';

var feed = new RSS({
  title: 'audible it',
  description: 'audible new releases',
  url: 'https://audiblerss.sirlisko.com',
});

app.get('/', (req, res) => {
  request(url, (err, resp, html) => {
    if (err) {
      Error('origin url problem');
    }

    const books = [];
    var parsedHTML = $.load(html);
    parsedHTML('.productListItem').map((i, bookDOM) => {
      const book = bookParser.parser(bookDOM);
      books.push(book);
      feed.item({
        title: book.title,
        description: book.description,
        author: book.author,
        date: book.releaseDate,
      });
    });

    res.set('Content-Type', 'text/xml');
    res.send(feed.xml());
  });
});

app.listen(port, () => console.log(`Audible-rss listening on port ${port}!`));
