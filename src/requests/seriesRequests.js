import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const getSeriesByID = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}