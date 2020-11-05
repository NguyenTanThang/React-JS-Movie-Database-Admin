import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

class SeriesDetails extends Component {

    renderEpisodeTabs = () => {
        const {episodesList} = this.props;
        let tabPanes = []

        for (let index = 0; index < episodesList.length; index++) {
            const episodeItem = episodesList[index];
            tabPanes.push(
                <TabPane tab={`Ep ${index+1}`} key={`Ep ${index+1}`}>
                    <video width="300" height="200" controls>
                        <source src={episodeItem["episodeURL"]} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </TabPane>
            )       
        }

        return (
            <Tabs defaultActiveKey="1">
                {tabPanes}
            </Tabs>
        )
    }

    renderSeriesDescriptionItems = () => {
        const {seriesItem} = this.props;
        const {imdbSeries} = seriesItem;
        let descriptionItems = [];
        let key = `cd`

        const seriesKeys = ["name", "genres", "rating", "IMDB_ID", "trailerURL", "posterURL", "description"]
        const specialSeriesKeys = ["name", "trailerURL", "posterURL", "description"];
        seriesKeys.map(seriesKey => {
            let privateKey = `${key}-${seriesKey}`;
            let privateLabel = convertKeyToText(seriesKey);
            if (checkIfIn(seriesKey, specialSeriesKeys)) {
                if (seriesKey === "posterURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={2} label={privateLabel} className="text-center">
                            <img className="img-fluid" style={{width: "200px"}} src={seriesItem[seriesKey]} alt={seriesItem.name}/>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "trailerURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel} className="text-center">
                            <video width="300" height="200" controls>
                                <source src={seriesItem[seriesKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "description") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                            {parse(seriesItem[seriesKey])}
                        </Descriptions.Item>
                    )
                }
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{seriesItem[seriesKey]}</Descriptions.Item>
                )
            }
            if (seriesKey === "genres") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {seriesItem[seriesKey].join(", ")}
                    </Descriptions.Item>
                )
            }
            if (seriesKey === "rating") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {seriesItem[seriesKey]}/10
                    </Descriptions.Item>
                )
            }
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{seriesItem[seriesKey]}</Descriptions.Item>
            )
        })

        const imdbMovieKeys = ["Year", "Rated", "Released", "Runtime", "Actors", "Director"]
        imdbMovieKeys.map(imdbMovieKey => {
            let privateKey = `${key}-${imdbMovieKey}`;
            let privateLabel = imdbMovieKey;
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{imdbSeries[imdbMovieKey]}</Descriptions.Item>
            )
        })

        descriptionItems.push(
            <Descriptions.Item key={`${key}episodes`} span={3} label={"Episodes"} className="text-center">
                {this.renderEpisodeTabs()}
            </Descriptions.Item>
        )

        return descriptionItems;
    }

    render() {
        const {renderSeriesDescriptionItems} = this;

        return (
            <Descriptions title="Series Details" layout="vertical" bordered>
                {renderSeriesDescriptionItems()}
            </Descriptions>
        )
    }
}

export default SeriesDetails;
