import React from 'react';

export default class VideoList extends React.Component {

    render() {
        return (
            <div>
                {this.props.videoItemsAvailable &&
                <h3>Other videos you may enjoy:</h3>
                }
                {this.props.children}
            </div>    
        )
    }
}