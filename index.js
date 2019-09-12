const express = require('express');
const path = require('path');
const RSS = require('rss');
const request = require('request');
const $ = require('cheerio');
const bookParser = require('./modules/bookParser');

const app = express();
const port = process.env.PORT || 5000;

const url =
  'https://www.audible.it/search?sort=pubdate-desc-rank&pageSize=20&ipRedirectOverride=true&overrideBaseCountry=true';

const feed = new RSS({
  title: 'Audible.it',
  description: 'audible new releases',
  url: 'https://audiblerss.sirlisko.com',
});

const itemMapper = book => ({
  title: book.title,
  description: `<div>
    <img src="${book.image}" />
    <p>${book.description}</p>
    <p><b>Durata: </b>${book.runtime}</p>
    <p><b><a href="${book.url}">Link</a><b></p>
  </div>`,
  author: book.author,
  date: book.releaseDate,
  url: book.url,
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('/it', (req, res) => {
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
