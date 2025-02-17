const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const SITE_URL = 'https://benawise.com';
const SITE_TITLE = 'Ben A. Wise';
const SITE_DESCRIPTION = 'Writer turned AI enthusiast documenting the merge with artificial intelligence';

function getArticleFiles() {
    return fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => file !== 'index.html');
}

function parseArticle(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = document.querySelector('article h1').textContent;
    const dateElement = document.querySelector('article time');
    const date = new Date(dateElement.getAttribute('datetime'));
    
    // Get article content (all p elements within article)
    const contentElements = document.querySelectorAll('article p');
    const content = Array.from(contentElements)
        .map(p => p.outerHTML)
        .join('\n');

    return {
        title,
        date,
        content,
        url: `${SITE_URL}/${filePath}`
    };
}

function generateRSSFeed(articles) {
    const items = articles.map(article => `
        <item>
            <title>${article.title}</title>
            <link>${article.url}</link>
            <pubDate>${article.date.toUTCString()}</pubDate>
            <guid>${article.url}</guid>
            <description><![CDATA[${article.content}]]></description>
        </item>
    `).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${SITE_TITLE}</title>
        <link>${SITE_URL}</link>
        <description>${SITE_DESCRIPTION}</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
    </channel>
</rss>`;
}

// Main execution
try {
    const articleFiles = getArticleFiles();
    const articles = articleFiles
        .map(file => parseArticle(file))
        .sort((a, b) => b.date - a.date); // Sort by date, newest first

    const rssFeed = generateRSSFeed(articles);
    fs.writeFileSync('feed.xml', rssFeed);
    console.log('RSS feed generated successfully!');
} catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
}