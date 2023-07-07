# manga-crawl-lib

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

manga-crawl-lib is a library that allows you to easily scrape manga content from various websites.

## Features

- Scrapes manga chapters, titles, images, and other metadata.
- Supports multiple popular manga websites (updating).
- Provides a simple and intuitive API for easy integration.

## Installation

Install the library using npm:

```

npm i manga-crawl-lib

```

## Usage

Here's an example of how to use manga-crawl-lib in your code:

```javascript
const { Manga, MangaType } = require('manga-crawl-lib');

// Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
const manga = new Manga().build(MangaType.TOONILY);
// Create a new instance with custom url
const manga = new Manga().build(MangaType.TOONILY, {
  baseUrl: 'https://domain.com/',
});

// Get list latest manga
const latest = await manga.getListLatestUpdate();
const latest_page_2 = await manga.getListLatestUpdate(2);

// Retrieve the manga details
const detail_manga = await manga.getDetailManga(
  'https://toonily.com/webtoon/nano-machine/'
);

// Get data chapter
const data_chapter = await manga.getDataChapter(
  'https://toonily.com/webtoon/nano-machine/chapter-159/'
);

// Search manga
const search_manga = await manga.search('one piece');
```

## Supported Websites

The manga-crawl-lib currently supports the following manga websites (updating):

- nettruyen

- toonily

- blogtruyen

- asurascans

## Contributing

Contributions are welcome! If you find any issues or would like to suggest enhancements, please submit a pull request or open an issue in the GitHub repository.
