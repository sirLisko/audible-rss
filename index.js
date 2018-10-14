const express = require('express');
const RSS = require('rss');
const request = require('request');
const $ = require('cheerio');
const bookParser = require('./modules/bookParser');

const app = express();
const port = process.env.PORT || 3000;

const url =
  'https://www.audible.it/search?sort=pubdate-desc-rank&pageSize=20&ipRedirectOverride=true&overrideBaseCountry=true';

const feed = new RSS({
  title: 'audible it',
  description: 'audible new releases',
  url: 'https://audiblerss.sirlisko.com',
});

const itemMapper = book => ({
  title: book.title,
  description: `<div><img src="${book.image}" /><p>${
    book.description
  }</p></div>`,
  author: book.author,
  date: book.releaseDate,
  url: book.url,
});

app.get('/', (req, res) => {
  request(url, (err, resp, html) => {
    if (err) {
      Error('origin url problem');
    }

    var parsedHTML = $.load(html);
    parsedHTML('.productListItem').map((i, bookDOM) => {
      const book = bookParser.parser(bookDOM);
      feed.item(itemMapper(book));
    });

    res.set('Content-Type', 'text/xml');
    res.send(feed.xml());
  });
});

app.listen(port, () => console.log(`Audible-rss listening on port ${port}!`));
