import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase} from "./firebaseStorageRequests";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const checkForURLUsageSeries = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/checkURLUsage/${seriesID}`);

        console.log(res);

        const {
            trailerURLUsage,
            posterURLUsage,
            series
        } = res.data.data;

        const {trailerURL, posterURL} = series;

        if (trailerURLUsage.length === 0) {
            await deleteFileFirebase(trailerURL)
        }

        if (posterURLUsage.length === 0) {
            await deleteFileFirebase(posterURL)
        }

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getSeriesByID = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}