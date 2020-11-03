import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';

const restrictedKeys = [
    "__v",
    "_id",
    "posterURL",
    "movieURL",
    "trailerURL"
]

class MovieDetails extends Component {

    renderMovieDescriptionItems = () => {
        const {movieItem} = this.props;
        let descriptionItems = [];

        for (var property in movieItem) {
            const key = `cd-${property}`
            const label = convertKeyToText(property);
            const content = String(movieItem[property]);

            console.log(label);

            if (movieItem.hasOwnProperty(property)) {
                if (checkIfIn(property, restrictedKeys)) {
                    continue;
                }

                if (property === "name") {
                    descriptionItems.push(
                        <Descriptions.Item key={key} span={3} label={label}>{content}</Descriptions.Item>
                      )
                    continue;
                }

                if (property === "description") {
                    descriptionItems.push(
                        <Descriptions.Item span={3} key={key} label={label}>
                            <div>{parse(content)}</div>
                        </Descriptions.Item>
                      )
                    continue;
                }

              descriptionItems.push(
                <Descriptions.Item key={key} span={2} label={label}>{content}</Descriptions.Item>
              )
            }
        }

        return descriptionItems;
    }

    render() {
        const {renderMovieDescriptionItems} = this;

        return (
            <Descriptions title="Movie Details" layout="vertical" bordered>
                {renderMovieDescriptionItems()}
            </Descriptions>
        )
    }
}

export default MovieDetails;
