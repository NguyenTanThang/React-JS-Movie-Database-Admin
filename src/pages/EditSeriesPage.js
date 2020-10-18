import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSeries from "../components/series/EditSeries";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";

class EditSeriesPage extends Component {
    
    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        const { match: { params }, genres } = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Edit Series"/>
                <Container className="section-padding">
                    <EditSeries seriesID={params.seriesID} genres={genres}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSeriesPage);
