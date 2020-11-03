import React, { Component } from 'react';
import {Container} from "reactstrap";
import MovieDetails from "../components/movies/MovieDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getMovieByID} from "../requests/movieRequests";

class MovieDetailsPage extends Component {

    state = {
        movieItem: ""
    }

    async componentDidMount() {
        const {movieID} = this.props.match.params;
        const movieItem = await getMovieByID(movieID);
        this.setState({
            movieItem
        })
    }

    render() {
        const {movieItem} = this.state;

        if (!movieItem) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Movie Details"/>
                <Container className="section-padding">
                    <MovieDetails movieItem={movieItem}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default MovieDetailsPage;
