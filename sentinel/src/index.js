import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class VideoWindow extends React.Component {

    componentDidMount() {
        const player = document.getElementById('player');
        const constraints = {
            video: true,
        };
          
          // Attach the video stream to the video element and autoplay.
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            player.srcObject = stream;
        });
    }

    render() {
        return (<video id="player" controls autoplay></video>
        );
    }
}

class CaptureButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player: null,
            canvas: null
        }
    }

    componentDidMount() {
        const elementPlayer = document.getElementById('player');
        const elementCanvas = document.getElementById('canvas');
        this.setState({
            player: elementPlayer,
            canvas: elementCanvas
        });
    }

    captureImage() {
        const player = this.state.player;
        const canvas = this.state.canvas;
        const context = canvas.getContext('2d');
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
    }
    
    render() {
        return (
            <button id="capture" onClick = {() => this.captureImage()} >Capture</button>
        );
    }
}

class Canvas extends React.Component {
    render() {
        return (
            <canvas id="canvas" width={320} height={240}></canvas>
        )
    }
}

class AutoJudgeTool extends React.Component {
    render() {
        return (
            <div >
                <VideoWindow/>   
                <CaptureButton/>
                <Canvas/>                
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <AutoJudgeTool />,
    document.getElementById('root')
);
