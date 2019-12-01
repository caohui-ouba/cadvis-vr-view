import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import * as MouseEventType from '../constant/MouseEventType';
const client = new W3CWebSocket('ws://172.20.10.2:8080/cadvis');
let panelX = 0, panelY = 0;
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
                <button className='btn-test' onClick={this.clickBtn}>Click1</button>
                <button className='btn-test' onClick={this.clickBtn}>Click2</button>
                <button className='btn-test' onClick={this.clickBtn}>Click3</button>
                <button className='btn-test' onClick={this.clickBtn}>Click4</button>
            </div >
        )
    }

    clickBtn = (evt) => {
        let ran1 = parseInt(Math.random() * 255)
        let ran2 = parseInt(Math.random() * 255)
        let ran3 = parseInt(Math.random() * 255)
        evt.target.style.backgroundColor = `rgb(${ran1},${ran2},${ran3})`
    }


    componentDidMount = () => {
        //  获取panel的左距离Y和上距离Y
        let panel = document.getElementsByClassName('msg-box')[0];
        panelX = panel.offsetLeft;
        panelY = panel.offsetTop;
        client.onopen = () => {
            console.log('client connect server success !')
        }

        client.onmessage = (msg) => {
            //格式 type,x,y
            let pos = msg.data.split(',')
            this.doEvent(parseInt(pos[0]), parseInt(pos[1]), parseInt(pos[2]))
        }
    }

    doEvent = (type, x, y) => {
        switch (type) {
            case MouseEventType.MOUSE_MOVE:
                this.mouseMove(x, y);
                break;
            case MouseEventType.MOUSE_CLICK:
                this.mouseClick(x, y);
                break;
            default:
                break;
        }
    }

    mouseMove = (x, y) => {
        this.setState({
            ll: x,
            lt: y,
            rl: 1200 - x,
            rt: 800 - y
        })
    }

    mouseClick = (x, y) => {
        let ele = document.elementsFromPoint(panelX + x, panelY + y)[1];
        ele.click();
    }
}