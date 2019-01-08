import React from 'react';

export default class VideoList extends React.Component {

    render() {
        const videos = (this.props.videos);
        if (videos == undefined) return;
        else {
            const videoItems = videos.map((video, key) => {
                return (
                    <div>
                        <img src={video.thumbnails.default.url} alt="" />
                    </div>
                );
            })
            return (
                <div>{videoItems}</div>
            );
        }
    }
}