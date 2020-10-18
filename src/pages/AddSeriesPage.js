import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSeries from "../components/series/AddSeries";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";

class AddSeriesPage extends Component {

    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        const {genres} = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Add Series"/>
                <Container className="section-padding">
                    <AddSeries genres={genres}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSeriesPage);
