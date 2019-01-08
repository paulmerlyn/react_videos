import React from 'react';
import './css/custom.css';

export default class extends React.Component {
    state = { videoUrl: '' };

    constructor(props) {
        super(props);
    }

    render() {
        const videoUrl = (this.props.video ? `https://www.youtube.com/embed/${this.props.video.urlId}` : '');
        const videoTitle = (this.props.video ? this.props.video.title : '');
        const videoDescription = (this.props.video ? this.props.video.description : '');
        console.log(this.props.video);
        return (
            <div>
                <div className="videoContainer"
                    ><iframe className="frame" width="100%" height="100%" src={videoUrl}></iframe>
                </div>
                <h2>{videoTitle}</h2>
                <p>{videoDescription}</p>
            </div>
        )
    }
}