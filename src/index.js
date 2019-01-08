import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import Config from './config.js';

class App extends React.Component {
    state = {videos: [], videoItemsAvailable: false};

    retrieveVideos = (value) => {
        console.log('retrieveVideos called in App component with value: ', value);
        const urlEncodedValue = encodeURI(value);

        // Build Youtube query and call
        axios({
            method: 'get',
            url: `${Config.youtube.baseURL}${Config.youtube.searchPath}`,
            params: {
                part: `${Config.youtube.part}`,
                type: `${Config.youtube.type}`,
                videoCaption: `${Config.youtube.videoCaption}`,
                key: `${Config.youtube.API_key}`,
                q: `${urlEncodedValue}`,
              },
            responseType:'json',
          }).then((response) => {
                console.log(response);

                // Build array of video objects comprising URL, description,
                const items = response.data.items.map(item => {
                    return { urlId: item.id.videoId, title: item.snippet.title, description: item.snippet.description, thumbnails: item.snippet.thumbnails };
                });
                console.log(items);
                this.setState({videos: items, videoItemsAvailable: true});
                return;
          }).catch(err => {
              console.log('The error is: ', err.message);
          })
    }

    render() {
        const videoItems = this.state.videos.map((video, key) => {
            return (
                <div key={key}>
                    <img src={video.thumbnails.default.url} alt="alt text here" />
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                </div>
            );
        });

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <SearchBar onSubmit={this.retrieveVideos} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={8}>
                        <VideoDetail video={this.state.videos.pop()} />
                    </Col> 
                    <Col xs={12} md={4}>
                        <VideoList videoItemsAvailable={this.state.videoItemsAvailable}>
                            {/* put a bunch of <VideoItem> components (i.e. JSX) here */}
                            {videoItems}
                        </VideoList>
                    </Col>
                </Row>    
            </Grid>
        )
    }

}

ReactDOM.render(<App />, document.querySelector('#root'));