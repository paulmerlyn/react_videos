import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import Config from './config.js';

class App extends React.Component {
    state = {videos: [], videoItemsAvailable: false, loading: false};

    handleVideoItemClick = (event) => {
        /* I think we just need to know the index of the clicked item, which we can them relate to the videos array in state */
        console.log('playSelectedVideo called in App component');
        console.log(event.target.src); 
        const clickedItemIndex = parseInt(event.target.dataset.key, 10); // The index of the first item in the list is 0
        console.log(typeof clickedItemIndex);
        console.log(clickedItemIndex);
        console.log('Here is contents of this.state:');
        console.log(this.state);
        let itemsTemp = this.state.videos;
        // Switch the order of the first element and the clicked item
        const clickedItem = itemsTemp[clickedItemIndex]; 
        const tempFeaturedVideo = itemsTemp[0];
        itemsTemp[clickedItemIndex] = tempFeaturedVideo;
        const featuredVideo = clickedItem;
        itemsTemp[0] = featuredVideo;
        this.setState({videos: itemsTemp});
        //itemsTemp[clickedItemIndex] = clickedItem;
        //itemsTemp[clickedItemIndex] = tempInitialItem;
        //const items = itemsTemp;
        //this.setState({videos: items});
        console.log('After swapping, here is the new this.state:')
        console.log(this.state);
    }

    retrieveVideos = (value) => {
        this.setState({loading: true});
        console.log('retrieveVideos called in App component with value: ', value);

        // Build Youtube query and call
        axios({
            method: 'get',
            url: `${Config.youtube.baseURL}${Config.youtube.searchPath}`,
            params: {
                part: `${Config.youtube.part}`,
                type: `${Config.youtube.type}`,
                videoCaption: `${Config.youtube.videoCaption}`,
                key: `${Config.youtube.API_key}`,
                q: value,
              },
            responseType:'json',
          }).then((response) => {
                console.log(response);

                // Build array of video objects comprising URL, description,
                const items = response.data.items.map(item => {
                    return { urlId: item.id.videoId, title: item.snippet.title, description: item.snippet.description, thumbnails: item.snippet.thumbnails };
                });
                console.log('items array retrieved from call to retrieveVideos is:')
                console.log(items);
                const featuredVideo = items[0];

                this.setState({videos: items, videoItemsAvailable: true, loading: false});
                return;
          }).catch(err => {
              console.log('The error is: ', err.message);
              this.setState({videoItemsAvailable: false, loading: false});
          })
    }

    render() {
        const rawVideoItems = this.state.videos.slice(); // technique for copying an array by value
        const featuredVideo = rawVideoItems[0];

        const videoItems = rawVideoItems.map((video, key) => {
            if (key == 0) { // exclude the first item from the array videoItems that we're building to embed within <VideoList>
                return 
            } else return (
                <div key={key}>
                    <Image className="menuLinks" data-key={key} onClick={this.handleVideoItemClick} src={video.thumbnails.default.url} alt="alt text here" thumbnail />
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                </div>
            );
        });
        console.log('videoItems array of elements obtained from state.videos for use in the App render():');
        console.log(videoItems);

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <SearchBar onSubmit={this.retrieveVideos} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={8}>
                        <VideoDetail video={featuredVideo} loading={this.state.loading}/>
                    </Col> 
                    <Col xs={12} md={4}>
                        <VideoList videoItemsAvailable={this.state.videoItemsAvailable}>
                            {videoItems}
                        </VideoList>
                    </Col>
                </Row>    
            </Grid>
        )
    }

}

ReactDOM.render(<App />, document.querySelector('#root'));