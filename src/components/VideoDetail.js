import React from 'react';
import css from '@emotion/css/macro';
import { HashLoader } from 'react-spinners';
import './css/custom.css';

const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 60px;
    border-color: green;
`;

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
        if (this.props.loading) {
            return (
                <div className='sweet-loading'>
                <HashLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={'#DC143C'}
                  loading={this.props.loading}
                />
              </div>         
            )
        } else {
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

    /*render() {
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
    }*/
}