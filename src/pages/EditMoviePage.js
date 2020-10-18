import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditMovie from "../components/movies/EditMovie";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";

class EditMoviePage extends Component {
    
    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        const { match: { params }, genres } = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Edit Movie"/>
                <Container className="section-padding">
                    <EditMovie movieID={params.movieID} genres={genres}/>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(getAllGenres())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genreReducer.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMoviePage);
