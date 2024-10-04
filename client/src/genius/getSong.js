import searchSong from './searchSong.js';
import extractLyrics from '../utils/extractLyrics.js';
import { checkOptions } from '../utils/index.js';

export default async function (options) {
	try {
		checkOptions(options);
		let results = await searchSong(options);
		if (!results) return null;
		let lyrics = await extractLyrics(results[0].url);
		return {
			id: results[0].id,
			title: results[0].title,
			url: results[0].url,
			lyrics
		};
	} catch (e) {
		throw e;
	}
};