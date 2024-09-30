import config from "../config.json";
import httpService from "./httpService";

export function getGenres() {
    return httpService.get(`${config.apiEndpoint}/genres`);
}