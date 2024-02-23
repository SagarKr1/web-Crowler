const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const url = "https://www.imdb.com/chart/top/";

const movieData = {};

async function getHtml(){
    const {data:html} = await axios.get(url,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    });
    // console.log(html);
    return html;
}
// getHtml();

getHtml().then((res)=>{
    const $ = cheerio.load(res);
    $('.compact-list-view>li').each((i,movie)=>{
        const title = $(movie).find('.ipc-title__text').text();
        const rating = $(movie).find('.db-rating #text').text();
        movieData[title] = rating;
    })
    fs.writeFile('moviesList.json',JSON.stringify(movieData),(err)=>{
        fs.writeFile('moviesList.json', JSON.stringify(movieData), (err) => {
            if (err) throw err; // This should be within the if statement's block
            console.log("File saved");
        });
        
    })
})