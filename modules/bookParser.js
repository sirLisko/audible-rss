const $ = require('cheerio');

function parser(bookDOM) {
  const $book = $(bookDOM);
  const book = {};

  book.title = $book
    .find('h2')
    .text()
    .trim();

  book.subtitle = $book
    .find('.subtitle')
    .text()
    .trim();

  book.author = $book
    .find('.authorLabel')
    .text()
    .replace('Di:', '')
    .trim();

  book.narrator = $book
    .find('.narratorLabel')
    .text()
    .replace('Letto da:', '')
    .trim();

  book.runtime = $book
    .find('.runtimeLabel')
    .text()
    .replace('Durata:', '')
    .trim();

  book.releaseDate = $book
    .find('.releaseDateLabel')
    .text()
    .replace('Data di pubblicazione:', '')
    .trim();

  book.image = $book.find('img').attr('data-lazyload');

  book.url =
    'https://www.audible.it' +
    $book
      .find('a')
      .attr('href')
      .split('?')[0];

  book.description = $book
    .find('[data-bodylevel] p')
    .text()
    .trim();

  return book;
}

exports.parser = parser;
