import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Nav, Footer, BreadCrumb} from "../components/basic.js";

class Chameleon extends React.Component {
    constructor(props) {
        // site metadata is passed in as the siteMeta prop
        super(props);
        this.state = {
            navExpand: false
        };
    }
    componentDidMount() {
        this.responsiveUpdate();
        window.addEventListener('resize', this.responsiveUpdate);
        window.addEventListener('popstate', this.URLUpdateHandler);
    }
    componentDidUpdate() {

    }
    responsiveUpdate() {
        let remSize = window.getComputedStyle(document.getElementById('fontRef')).fontSize;
        remSize = parseInt(remSize.slice(0, -2));
        let windowSizeRem = $(window).width() / remSize;
    }
    navigateHandler() {
        // always use this function to handle navigating to another page

    }
    URLUpdateHandler() {
        // update states and change rendered contents after URL changed 
        let pathname = window.location.pathname;
    }
    parseHeader() {
        return (
            <header>
                <Nav siteMeta={this.props.siteMeta} />
                <BreadCrumb />
            </header>
        );
    }
    parsePageContent() {

    }
    parsePageFooter() {

    }

    render() {
        let header = this.parseHeader();
        let page = this.parsePageContent();
        let footer = this.parsePageFooter();

        return (
            <div className="">
                {header}
                {page}
                {footer}
            </div>
        );
    }
}

function loadCSS(path, version) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = `${path}?v=${version}`;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink);
}

async function loadPage() {
    let result = await fetch(`./site/meta.json`, {
        method: 'GET',
        cache: 'no-store'
    });
    let data = await result.json();
    let version = data.version;

    loadCSS("./css/style.css", version);
    // make sure new css is fetched for every new version

    ReactDOM.render(<Chameleon siteMeta={data} />, document.getElementById('app'));
}
$(function () {
    loadPage();
});
