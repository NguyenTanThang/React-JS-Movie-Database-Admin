import React, { Component } from 'react';
import {Container} from "reactstrap";
import {
    getAllGenres,
    addGenre,
} from "../actions/genreActions";
import {connect} from "react-redux";
import GenreList from "../components/genres/GenreList";
import AddGenre from "../components/genres/AddGenre";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";

class GenrePage extends Component {
    
    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        const {addGenre} = this.props;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Genres"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <AddGenre addGenre={addGenre}/>
                    </div>
                    <div className="table-container">
                        <GenreList genres={this.props.genres}/>
                    </div>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(getAllGenres())
        },
        addGenre: (name) => {
            dispatch(addGenre(name))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genreReducer.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenrePage);
