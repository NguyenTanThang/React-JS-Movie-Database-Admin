import genreReducer from "./genreReducer";
import managerReducer from "./managerReducer";
import customerReducer from "./customerReducer";
import movieReducer from "./movieReducer";
import seriesReducer from "./seriesReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    genreReducer,
    managerReducer,
    customerReducer,
    movieReducer,
    seriesReducer
})

export default rootReducer;