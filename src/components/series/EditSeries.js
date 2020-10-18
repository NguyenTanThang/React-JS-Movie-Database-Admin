import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editSeries
} from "../../actions/seriesActions";
import {
    isEpisodeNumOccurred
} from "../../utils/utils";
import {
    getSeriesByID
} from "../../requests/seriesRequests";
import {
    getEpisodesBySeriesID
} from "../../requests/episodeRequests";
import { Button, Select, Tabs } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import UpdateFileModal from "../partials/UpdateFileModal";
import {
    filterEpisodes
} from "../../utils/utils"

const { TabPane } = Tabs;
const { Option } = Select;

class EditSeries extends Component {

    state = {
        name: "",
        genres: [],
        description: "",
        IMDB_ID: "",
        posterFile: {},
        trailerFile: {},
        posterURL: "",
        trailerURL: "",
        total_episodes: 2,
        episodes: [],
        episodesURLList: []
    }

    async componentDidMount() {
        const {seriesID} = this.props;
        const seriesItem = await getSeriesByID(seriesID);
        const episodesURLList = await getEpisodesBySeriesID(seriesID);
        console.log("seriesItem");
        console.log(seriesItem);
        console.log("episodesURLList");
        console.log(episodesURLList);
        const {
                name,
                genres,
                description,
                IMDB_ID,
                posterURL,
                trailerURL,
                total_episodes,
            } = seriesItem;

        this.setState({
            name,
            genres,
            description,
            IMDB_ID,
            posterURL,
            trailerURL,
            total_episodes,
            episodesURLList
        })
    }

    onClear = (e) => {
        e.preventDefault()
        this.setState({
            name: "",
            genres: [],
            description: "",
            IMDB_ID: ""
        }, () => {
            console.log(this.state);
        })
    }

    handleEpisodeFileChange = (e) => {
        const file = e.target.files[0];
        const episodeNum = e.target.name;
        const currentEpisode = {
            episodeNum,
            episodeFile: file
        }
        const {episodes} = this.state;

        if (isEpisodeNumOccurred(episodes, episodeNum)) {
            let currentEpisodes = episodes.map(episode => {
                if (episode.episodeNum == episodeNum) {
                    episode.episodeFile = file;
                }
                return episode;
            })

            this.setState({
                episodes: [...currentEpisodes]
            }, () => {
                console.log(this.state);
            })
        } else {
            this.setState({
                episodes: [...episodes, currentEpisode]
            }, () => {
                console.log(this.state);
            })
        }
        
    }

    renderEpisodeTabs = () => {
        const {total_episodes, episodes, episodesURLList, name} = this.state;
        const {handleEpisodeFileChange} = this;
        let tabPanes = []

        for (let index = 0; index < total_episodes; index++) {
            const currentEpisode = episodes.filter(episode => {
                return episode.episodeNum == index+1;
            })[0];
            const currentEpisodeItem = episodesURLList.filter(episode => {
                return episode.episodeNum == index+1;
            })[0];
            tabPanes.push(
                <TabPane tab={`Ep. ${index+1}`} key={`Ep ${index+1}`}>
                    <UpdateFileModal 
                        labelTitle={`Pick a file to replace the file in Ep. ${index+1}`} inputName={`${index+1}`} currentFile={!currentEpisode ? {} : currentEpisode.episodeFile} handleFileChange={handleEpisodeFileChange} fileURL={
                            !currentEpisodeItem ? "" : currentEpisodeItem.episodeURL} movieName={name} 
                        buttonTitle={`Update Ep. ${index+1}`}
                    />
                </TabPane>
            )       
        }

        return (
            <Tabs defaultActiveKey="1">
                {tabPanes}
            </Tabs>
        )
    }

    renderGenreOptions = () => {
        const {genres} = this.props;

        return genres.map(genre => {
            return(
                <Option key={genre.name}>{genre.name}</Option>
            )
        })
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        this.setState({
            [e.target.name]: file
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleGenreChange = (value) => {
        if (value.length === 0) {
            return this.setState({
                genres: value
            })
        }
        const newValue = value[value.length - 1];
        const {genres} = this.props;
        let isOccurred = false;

        genres.forEach(genre => {
            if (newValue === genre.name) {
                isOccurred = true;
            }
        })

        if (isOccurred) {
            this.setState({
                genres: value
            })
        }
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            description: content
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {editSeries, seriesID} = this.props;
        const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = this.state;
        const filteredEpisodes = filterEpisodes(episodes, total_episodes);

        console.log(filteredEpisodes);

        editSeries(seriesID, {name, genres, description, IMDB_ID, posterFile, trailerFile, total_episodes, episodes: filteredEpisodes});
    }

    render() {
        const {handleChange, handleSubmit, renderGenreOptions, handleGenreChange, handleEditorChange, handleFileChange, onClear, renderEpisodeTabs} = this;
        const {name, IMDB_ID, description, genres, posterFile, trailerFile, episodes, total_episodes, posterURL, trailerURL} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <TextField id="name" name="name" label="Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <TextField id="IMDB_ID" name="IMDB_ID" label="IMDB ID" variant="outlined" className="material-input" required onChange={handleChange} value={IMDB_ID}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Genres" onChange={handleGenreChange} value={genres}>
                                    {renderGenreOptions()}
                                </Select>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Poster</Label>
                                <UpdateFileModal 
                                    labelTitle="Pick a file to replace the current one" inputName="posterFile" currentFile={posterFile} handleFileChange={handleFileChange} fileURL={posterURL} movieName={name} buttonTitle={"Update Poster"}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Trailer</Label>
                                <UpdateFileModal          
                                    labelTitle="Pick a file to replace the current one"  inputName="trailerFile" currentFile={trailerFile} handleFileChange={handleFileChange} fileURL={trailerURL} movieName={name} buttonTitle={"Update Trailer"}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <TextField id="total_episodes" name="total_episodes"
                                inputProps={{ type: "number" }}
                                label="Total Episodes" variant="outlined" className="material-input" required onChange={handleChange} value={total_episodes}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                {renderEpisodeTabs()}
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <TinyEditor description={description} handleEditorChange={handleEditorChange} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                    <Button htmlType="reset" block onClick={onClear}>
                                        Clear
                                    </Button>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                    <Button type="primary" htmlType="submit" block>
                                        Save
                                    </Button>
                            </FormGroup>
                        </div>
                    </Row>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        editSeries: (seriesID, updatedSeries) => {
            dispatch(editSeries(seriesID, updatedSeries))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(EditSeries);
