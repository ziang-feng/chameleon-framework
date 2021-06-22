import React from 'react';
import $ from 'jquery';

export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <nav className="d-flex flex-row w-100">
                <button className="nav-logo">
                    <img src="./img/clueFull.svg"/>
                </button>
                <div className="nav-links h-100 d-flex">
                    <button className=""> </button>
                </div>
                
            </nav>
        )
    }
}
export class BreadCrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (<div></div>)
    }
}
export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
            <footer className=""></footer>
        );
    }
}

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};