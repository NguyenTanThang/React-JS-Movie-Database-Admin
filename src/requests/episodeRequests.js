import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    uploadEpisodeFirebase
} from "./firebaseStorageRequests";

const EPISODES_URL = `${MAIN_PROXY_URL}/episodes`;

export const deleteExceededEpisode = async (seriesID, totalEpisode) => {
    try {
        const episodes = await getEpisodesBySeriesID(seriesID);

        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            if (episode.episodeNum > totalEpisode) {
                console.log("episode");
                console.log(episode);
                await deleteEpisodeByID(episode._id);
            }
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteEpisodeByID = async (episodeID) => {
    try {
        const res = await axios.delete(`${EPISODES_URL}/delete/${episodeID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteEpisodeBySeriesIDAndEpNum = async (seriesID, episodeObject) => {
    try {
        const {episodeNum} = episodeObject;
        const res = await axios.delete(`${EPISODES_URL}/delete/seriesID/${seriesID}/epNum/${episodeNum}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getEpisodesBySeriesID = async (seriesID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seriesID/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const addEpisode = async (seriesID, newEpisode) => {
    try {
        const {episodeFile, episodeNum} = newEpisode;
        
        let episodeURL = await uploadEpisodeFirebase(episodeFile)
        const res = await axios.post(`${EPISODES_URL}/add/`, {
            seriesID, episodeURL, episodeNum
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const editEpisode = async (seriesID, updatedEpisode) => {
    try {
        //const {episodeFile, episodeNum} = updatedEpisode;
        
        /*
        let episodeURL = await uploadEpisodeFirebase(episodeFile);
        */
        await deleteEpisodeBySeriesIDAndEpNum(seriesID, updatedEpisode)
        /*
        const res = await axios.put(`${EPISODES_URL}/edit/seriesID/${seriesID}`, {
            episodeURL, episodeNum
        });
        */
        const createdEpisode = await addEpisode(seriesID, updatedEpisode);

        return createdEpisode;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const addMultipleEpisodes = async (seriesID, episodes) => {
    try {
        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            await addEpisode(seriesID, episode);
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const editMultipleEpisodes = async (seriesID, episodes) => {
    try {
        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            await editEpisode(seriesID, episode);
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}