import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const getMovieByID = async (movieID) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/${movieID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}