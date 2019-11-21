import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://172.20.10.2:8080/cadvis');

export default class WebSocketClient extends Component {

    constructor() {
        super();
        this.state = {
            message: '',
            content: []
        }
    }
    render() {

        return (
            <div className='msg-box'>
                <textarea readOnly={true} value={this.state.content.join('\n')}></textarea><br />
                <input value={this.state.message} onChange={this.messageChange} />
                <button onClick={this.sendMsg}>send</button>
            </div>
        )
    }

    componentDidMount = () => {
        client.onopen = () => {
            console.log('client connect server success !')
        }

        client.onmessage = (msg) => {
            console.log(msg.data);
            let newList = JSON.parse(JSON.stringify(this.state.content));
            newList.push(msg.data);
            this.setState({
                content: newList
            })
        }
    }
    sendMsg = () => {
        client.send(this.state.message);
        this.setState({
            message: ''
        });
    }

    messageChange = (input) => {
        const msg = input;

        this.setState({
            message: msg.target.value
        });
    }
}