import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://172.20.10.2:8080/cadvis');

export default class WebSocketClient extends Component {

    constructor() {
        super();
        this.state = {
            lt: 0,
            ll: 0,
            rt: 0,
            rl: 0
        }
    }
    render() {

        return (
            <div className='msg-box'>
                <div className='left' style={{ top: this.state.lt, left: this.state.ll }}></div>
                <div className='right' style={{ top: this.state.rt, left: this.state.rl }}></div>
            </div >
        )
    }

    componentDidMount = () => {
        client.onopen = () => {
            console.log('client connect server success !')
        }

        client.onmessage = (msg) => {
            console.log(msg.data);
            let pos = msg.data.split(',')
            pos[0] = parseInt(pos[0]);
            pos[1] = parseInt(pos[1]);
            this.setState({
                ll: pos[0],
                lt: pos[1],
                rl: 1200 - pos[0],
                rt: 800 - pos[1]
            })
        }
    }
}