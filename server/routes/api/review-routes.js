import express from "express";
import axios from "axios";
const router = express.Router();

const fetch_lyrics = async (title, artist) => {
console.log(title, artist);
// function extractLyricsFromHtml(htmlContent) {
//   //console.log(htmlContent);
//   // Example: Extracting lyrics using Cheerio or Regex from HTML
//   const regex = /<div class="lyrics">([^<]+)<\/div>/; // Regex to match lyrics in HTML
//   const matches = htmlContent.match(regex);
//   return matches ? matches[1] : null;
// }

  try {
    // Construct the Genius search API URL
    //const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
    const searchUrl = `https://api.genius.com/search?q=${title}`;

    // Make the request to the Genius API to search for the song
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer dp2QQdraYt2weVuB_cSakWOjc7lZkGRHkUuUascPhJxI_iEQZCuIvpaJ7yJR6_cw`,
      },
    });

    const hits = response.data.response.hits;
    console.log(hits[0].result.url);
    console.log(hits);

    if (hits && hits.length > 0) {
      return hits[0].result.url;
    } else {
      return null; // No hits found
    }
  } catch (error) {
    console.error("Error fetching lyrics from Genius:", error);
    return null;
  }
};

router.post('/lyrics', async (req, res) => {
    const { title, artist } = req.body;
    console.log(title, artist);
  const lyrics = await fetch_lyrics(title, artist);
  res.json({ lyrics });
});


export default router;