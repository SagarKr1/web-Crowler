const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const url = "https://www.bhaskar.com/local/jharkhand//local/jharkhand/news/cbi-investigation-ban-on-illegal-mining-in-lemon-pahad-lifted-132626383.html";
const newsData = {};


async function getHtml() {
    const { data: html } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    });
    return html;
}


getHtml().then((res) => {
    const $ = cheerio.load(res);
    $('.bf64dc76').each((i, news) => {
        const title = $(news).find('.a88a1c42>h1').text();
        const media = $(news).find('.f3e032cb>picture').html();
        const description1 = $(news).find('.c4fb714d').text();
        // const link = $(news).find('li>a').attr('href');
        const description2 =$(news).find('p').text();
        newsData[i] = {
            title: title,
            Media:media,
            description1: description1,
            description2: description2
            // description:description
        };

    })
    fs.writeFile('specificNewsList.json', JSON.stringify(newsData), (err) => {
        if (err) throw err; // This should be within the if statement's block
        console.log("File saved");
    });
})
