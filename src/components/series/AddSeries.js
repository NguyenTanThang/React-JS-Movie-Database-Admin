import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addSeries
} from "../../actions/seriesActions";
import {
    isEpisodeNumOccurred
} from "../../utils/utils";
import { Button, Select, Tabs } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";

const { TabPane } = Tabs;
const { Option } = Select;

class AddSeries extends Component {

    state = {
        name: "",
        genres: [],
        description: "",
        IMDB_ID: "",
        posterFile: {},
        trailerFile: {},
        total_episodes: 2,
        episodes: []
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
        const {total_episodes, episodes} = this.state;
        const {handleEpisodeFileChange} = this;
        let tabPanes = []

        for (let index = 0; index < total_episodes; index++) {
            const currentEpisode = episodes.filter(episode => {
                return episode.episodeNum == index+1;
            })[0];
            tabPanes.push(
                <TabPane tab={`Ep ${index+1}`} key={`Ep ${index+1}`}>
                    <FileUploader labelTitle={`Ep ${index+1}`}inputName={`${index+1}`} currentFile={!currentEpisode ? {} : currentEpisode.episodeFile} handleFileChange={handleEpisodeFileChange}/>
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
        const {addSeries} = this.props;
        const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = this.state;

        addSeries({name, genres, description, IMDB_ID, posterFile, trailerFile, total_episodes, episodes});
    }

    render() {
        const {handleChange, handleSubmit, renderGenreOptions, handleGenreChange, handleEditorChange, handleFileChange, onClear, renderEpisodeTabs} = this;
        const {name, IMDB_ID, description, genres, posterFile, trailerFile, episodes, total_episodes} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Name</Label>
                                <TextField id="name" name="name" label="Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>IMDB ID</Label>
                                <TextField id="IMDB_ID" name="IMDB_ID" label="IMDB ID" variant="outlined" className="material-input" required onChange={handleChange} value={IMDB_ID}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Genres</Label>
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Genres" onChange={handleGenreChange} value={genres}>
                                    {renderGenreOptions()}
                                </Select>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Poster</Label>
                            <FileUploader labelTitle="Poster" inputName="posterFile" currentFile={posterFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Trailer</Label>
                            <FileUploader labelTitle="Trailer" inputName="trailerFile" currentFile={trailerFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Total Episodes</Label>
                                <TextField id="total_episodes" name="total_episodes"
                                inputProps={{ type: "number" }}
                                label="Total Episodes" variant="outlined" className="material-input" required onChange={handleChange} value={total_episodes}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Episodes</Label>
                                {renderEpisodeTabs()}
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Description</Label>
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
                                        Create
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
        addSeries: (newSeries) => {
            dispatch(addSeries(newSeries))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(AddSeries);
