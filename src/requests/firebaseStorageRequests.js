import {firebaseStorage} from "../config/base";
import {
    exchangeURLToFileDirectory
} from "../utils/utils";

const storage = firebaseStorage;
var storageRef = storage.ref();

export const deleteFileFirebase = async (urlString) => {
    const directoryString = exchangeURLToFileDirectory(urlString)
    var fileRef = storageRef.child(directoryString);
    await fileRef.delete()
}

export const uploadEpisodeFirebase = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`episodes/${file.name}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadPosterFirebase = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`posters/${file.name}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadTrailerFirebase = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`trailers/${file.name}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadMovieFirebase = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`movies/${file.name}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}
