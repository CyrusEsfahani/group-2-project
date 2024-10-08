// import { useState, useEffect } from "react";

// extractLyricsFromApi.ts
/**
 * Extracts lyrics from the Genius API response.
 * This assumes the Genius API responds with a JSON object containing the lyrics.
 *
 * @param apiResponse - The response data from the Genius API containing lyrics.
 * @returns The extracted lyrics as a string, or null if no lyrics were found.
 */
// export default function extractLyricsFromApi(apiResponse: any): string | null {
  // Generates Spotify API Key when search page opens

  // client details for the genius api
//   const App_Website_URL = "https://github.com/CyrusEsfahani/group-2-project";
//   const GENIUS_CLIENT_ID =
//     "2y2rQpy8nGnZ5hiYhm8sSvKSpTv1bjovFjM4onJGZnn73J3Urh2BndOpprT0O8MT1";
//   const GENIUS_CLIENT_SECRET =
//     "mIdDtlwEI12zRduCVyTviCOXJWIau7hVnyi5AhrSBh4LAU605c5d_bywdh9XHZtAd1D2OqZKS5IoSHHL1-AhUvw";
//   const GENIUS_API_KEY =
//     "rj9bgsswjaJcmeOmg07zKXqzfrniMRkrQ_MlbxOGF4J063qQDHQ0iELQtxiT2G";


//   useEffect(() => {
//     const authParameters = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//       }).toString(),
//     };

//     fetch("https://accounts.spotify.com/api/token", authParameters)
//       .then((result) => result.json())
//       .then((data) => setAccessToken(data.access_token))
//       .catch((error) => console.error("Error fetching the token:", error));
//   }, []);

//   // Ensure the response contains lyrics and return them
//   if (apiResponse.lyrics && typeof apiResponse.lyrics === "string") {
//     return apiResponse.lyrics;
//   } else if (
//     apiResponse.response &&
//     apiResponse.response.song &&
//     apiResponse.response.song.lyrics
//   ) {
//     // Handle nested responses or different response structures based on API format
//     return apiResponse.response.song.lyrics;
//   } else {
//     return null;
//   }
// }

// extractLyrics.ts
import axios from 'axios';

/**
 * Extracts lyrics from the Genius API response by fetching the song.
 * @param apiKey - Genius API Key.
 * @param title - Song title.
 * @param artist - Artist name.
 * @returns The extracted lyrics as a string, or null if no lyrics were found.
 */
import { useEffect, useState } from 'react';

  // client details for the genius api
  // const App_Website_URL = "https://github.com/CyrusEsfahani/group-2-project";
  // const GENIUS_CLIENT_ID =
  //  "2y2rQpy8nGnZ5hiYhm8sSvKSpTv1bjovFjM4onJGZnn73J3Urh2BndOpprT0O8MT1";
//  const GENIUS_CLIENT_SECRET =
//     "mIdDtlwEI12zRduCVyTviCOXJWIau7hVnyi5AhrSBh4LAU605c5d_bywdh9XHZtAd1D2OqZKS5IoSHHL1-AhUvw";
  // const GENIUS_API_KEY =
  //  "rj9bgsswjaJcmeOmg07zKXqzfrniMRkrQ_MlbxOGF4J063qQDHQ0iELQtxiT2G"
   const ACCESS_TOKEN =
     "dp2QQdraYt2weVuB_cSakWOjc7lZkGRHkUuUascPhJxI_iEQZCuIvpaJ7yJR6_cw";
interface lyricsProps{
  title: string,
  artist: string,
}
export default function extractLyrics({title, artist}:lyricsProps){
  const fetch_lyrics = async()=>{
     try {
       // Construct the Genius search API URL
       const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
         title + " " + artist
       )}`;

       // Make the request to the Genius API to search for the song
       const response = await axios.get(searchUrl, {
         headers: {
           Authorization: `Bearer ${ACCESS_TOKEN}`,
         },
       });

       const hits = response.data.response.hits;
       console.log(hits);

       if (hits && hits.length > 0) {
         // Assuming the first hit is the best match for the song
         const songPath = hits[0].result.path;
         const lyricsPageUrl = `https://genius.com${songPath}`;

         // Now, scrape the lyrics from the Genius page
         const lyricsResponse = await axios.get(lyricsPageUrl);

         const lyrics = extractLyricsFromHtml(lyricsResponse.data); // Helper function to parse the HTML
         console.log(lyrics);
         return lyrics || null;
       } else {
         return null; // No hits found
       }
     } catch (error) {
       console.error("Error fetching lyrics from Genius:", error);
       return null;
     }
  }
  useEffect(() => {
    fetch_lyrics()
  });
  return (
    <div>
    
    </div>
  )
}

/**
 * Extracts lyrics from the HTML content of the Genius page.
 * You might need a scraping tool like Cheerio if you're not using the official API for lyrics.
 */
function extractLyricsFromHtml(htmlContent: string): string | null {
  // Example: Extracting lyrics using Cheerio or Regex from HTML
  const regex = /<div class="lyrics">([^<]+)<\/div>/; // Regex to match lyrics in HTML
  const matches = htmlContent.match(regex);
  return matches ? matches[1] : null;
}