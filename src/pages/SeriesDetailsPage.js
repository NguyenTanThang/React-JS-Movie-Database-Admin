import React, { Component } from 'react';
import {Container} from "reactstrap";
import SeriesDetails from "../components/series/SeriesDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getSeriesByID} from "../requests/seriesRequests";
import {getEpisodesBySeriesID} from "../requests/episodeRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class SeriesDetailsPage extends Component {

    state = {
        seriesItem: "",
        episodesList: [],
        loggedIn: false
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        this.setState({
            loggedIn
        })
        if (!loggedIn) {
            message.error("You need to login first");
            return this.props.history.push("/login");
        }

        const {seriesID} = this.props.match.params;
        const seriesItem = await getSeriesByID(seriesID);
        const episodesList = await getEpisodesBySeriesID(seriesID);
        this.setState({
            seriesItem,
            episodesList
        })
    }

    render() {
        const {seriesItem, loggedIn, episodesList} = this.state;

        if (!seriesItem || !loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Series Details"/>
                <Container className="section-padding">
                    <SeriesDetails seriesItem={seriesItem} episodesList={episodesList}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default SeriesDetailsPage;
