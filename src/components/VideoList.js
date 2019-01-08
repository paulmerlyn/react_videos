import React from 'react';

export default class VideoList extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>    
        )
    }
}