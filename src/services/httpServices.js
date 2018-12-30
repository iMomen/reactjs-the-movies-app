import axios from "axios";
import config from "../config/config.json";

export function getWishedMovies(title) {
	return axios.get(
		`${config.apiEndPoint}?s=${title}&apikey=${config.apiApiKey}`
	);
}

export function getWatchedMovies(title) {
	return axios.get(
		`${config.apiEndPoint}?s=${title}&apikey=${config.apiApiKey}`
	);
}

export function getMovieByName(movieName) {
	return axios.get(
		`${config.apiEndPoint}?t=${movieName}&apikey=${config.apiApiKey}`
	);
}
