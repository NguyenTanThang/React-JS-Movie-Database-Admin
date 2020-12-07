import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_SERIES,
    DELETE_SERIES,
    EDIT_SERIES,
    GET_ALL_SERIES
} from "./types";   
import {
    uploadPosterFirebase,
    uploadTrailerFirebase
} from "../requests/firebaseStorageRequests";
import {
    addMultipleEpisodes,
    editMultipleEpisodes,
    deleteExceededEpisode,
    checkForURLUsageEpisodes
} from "../requests/episodeRequests";
import {
    checkForURLUsageSeries
} from "../requests/seriesRequests";
import {
    isObjectEmpty
} from "../utils/validator";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const deleteSeries = (seriesID) => {
    return async (dispatch) => {
        try {
            let res = await checkForURLUsageEpisodes(seriesID);
            res = await checkForURLUsageSeries(seriesID);
            res = await axios.delete(`${SERIES_URL}/delete/${seriesID}`);
            
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const series = res.data.data;

            return dispatch({
                type: DELETE_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editSeries = (seriesID, updatedSeries) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = updatedSeries;
            let updateSeriesObject = {name, genres, description, IMDB_ID, total_episodes};

            if (!isObjectEmpty(posterFile)) {
                const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
                const posterURL = posterFileFirebaseURL;
                updateSeriesObject.posterURL = posterURL;
            }

            if (!isObjectEmpty(trailerFile)) {
                const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
                const trailerURL = trailerFileFirebaseURL;
                updateSeriesObject.trailerURL = trailerURL;
            }

            const res = await axios.put(`${SERIES_URL}/edit/${seriesID}`, updateSeriesObject);
    
            if (res.data.success) {
                const series = res.data.data;
                console.log("total_episodes");
                console.log(total_episodes);
                await editMultipleEpisodes(series._id, episodes);
                await deleteExceededEpisode(series._id, total_episodes);
                message.destroy()
                message.success(res.data.message, 5);
            } else {
                message.destroy()
                return message.warning(res.data.message, 5);
            }

            const series = res.data.data;

            return dispatch({
                type: EDIT_SERIES,
                payload: {
                    seriesID, series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addSeries = (newSeries) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
            const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = newSeries;

            const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
            const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);

            const posterURL = posterFileFirebaseURL;
            const trailerURL = trailerFileFirebaseURL;

            const res = await axios.post(`${SERIES_URL}/add`, {name, genres, description, IMDB_ID, posterURL, trailerURL, total_episodes});
    
            if (res.data.success) {
                const series = res.data.data;
                await addMultipleEpisodes(series._id, episodes);
                message.destroy()
                message.success(res.data.message, 5);
            } else {
                message.destroy()
                return message.warning(res.data.message, 5);
            }

            const series = res.data.data;
            
            return dispatch({
                type: ADD_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSeries = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(SERIES_URL);
    
            const series = res.data.data;
    
            return dispatch({
                type: GET_ALL_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}