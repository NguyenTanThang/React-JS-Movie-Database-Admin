import React, { Component } from 'react';
import {Empty , Space} from "antd";
import DeleteMovie from "./DeleteMovie";
import {Link} from "react-router-dom";

class MovieGridItem extends Component {

    renderMoviePoster = () => {
        const {name, posterURL} = this.props.movieItem;

        if (posterURL) {
            return <img className="img-fluid" src={posterURL} alt={name}/>
        } else {
            return (
                <div className="spin-container">
                    <Empty description={"No Poster"}/>
                </div>
            )
        }
    }

    render() {
        const {name, _id} = this.props.movieItem;
        const {renderMoviePoster} = this;

        return (
            <div className="col-lg-3 col-md-6 col-sm-12 movie-item">
                <div className="movie-actions">
                    <Space>
                        <Link className="btn btn-warning" to={`/movies/edit/${_id}`}>
                            <i className="fas fa-pen"></i>
                        </Link>
                        <DeleteMovie movieItem={this.props.movieItem}/>
                    </Space>
                </div>
                <div className="movie-item-poster">
                    {renderMoviePoster()}
                </div>
                <div className="movie-item-desc">
                    <h4>{name}</h4>   
                </div>
            </div>
        )
    }
}

export default MovieGridItem;
