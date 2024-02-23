const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const url = "https://www.bhaskar.com/local/jharkhand/";
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
    $('.e96634e0>div').each((i, news) => {
        const title = $(news).find('li>a>div>h3').text();
        const place = $(news).find('li>div>div>span>a').text();
        const link = $(news).find('li>a').attr('href');
        // const description =$(news).find('.ad3ccf1a>h3').text();
        newsData[i] = {
            title: title,
            place:place,
            link:link
            // description:description
        };

    })
    fs.writeFile('newsList.json', JSON.stringify(newsData), (err) => {
        fs.writeFile('moviesList.json', JSON.stringify(newsData), (err) => {
            if (err) throw err; // This should be within the if statement's block
            console.log("File saved");
        });
    })
})
